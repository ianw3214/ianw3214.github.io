---
layout: post
title: "Rust lifetimes and SDL textures"
date: 2022-10-09
comments: true
tags: post
---

I've been making a game in rust lately using `specs` and `SDL2` in order to try and learn the language a bit better. In the beginning, I was creating all my textures and related systems right in the main function since it's the easiest way to get something working; At some point, I wanted to try to refactor it out to a separate system to keep things more modular and readable. This is where my struggles with rust lifetimes and SDL textures began...

### Initial solution

At first, my thought process was very simple: take all the textures being created and store them in a container of some sort that I can access from other systems that might need it. It felt natural to just store the textures as part of an engine struct I already had, and move it into a separate system in the future if the need arises. As such, my first implementation looked quite simple:

```rust
pub struct Engine {
    pub canvas : WindowCanvas,
    pub event_pump : EventPump,
    pub texture_creator : TextureCreator<WindowContext>,
    pub textures : Vec<Texture>,
    pub last_update : SystemTime
}
```

I very quickly found out that this will not compile, because it turns out `textures` have a *lifetime* that needs to be accounted for. As a rust noob, my first reaction was to simply add a lifetime annotaion to the texture to make things compile; The engine then ends up looking something like this:

```rust
pub struct Engine<'a> {
    pub canvas : WindowCanvas,
    pub event_pump : EventPump,
    pub texture_creator : TextureCreator<WindowContext>,
    pub textures : Vec<Texture<'a>>,
    pub last_update : SystemTime
}
```

Seeing this code still result in errors was very puzzling as a new user of rust. As it turns out, the lifetime for `Texture` is tied to the texture creator, and although this fix does patch up the errors the compiler gives you at the declaration of `Engine`, it does still cause lifetime problems later when the texture is actually used later. I still don't quite fully understand what the problem is here, at some point I figured I was digging too deep for my own good and would have to revisit this once my rust knowledge is a bit more solid.

### Finding a solution

As it turns out, many other people have run into similar problems using SDL textures in rust. Here are just a few examples:

- https://github.com/Rust-SDL2/rust-sdl2/issues/351
- https://news.ycombinator.com/item?id=16413172
- https://devcry.heiho.net/html/2022/20220716-rust-and-sdl2-fighting-with-lifetimes-2.html

In the end, my solution seperates out the container storing textures into a separate struct from the engine. This change seperated the storage of the textures and the texture creator, while still relating the texture lifetimes to the texture manager lifetime. I called this struct the `TextureManager` and the code looks like this:

```rust
use sdl2::{render::{TextureCreator, Texture}, video::WindowContext, image::LoadTexture};

pub struct TextureManager<'creator> {
    pub creator : &'creator TextureCreator<WindowContext>,
    pub textures : Vec<Texture<'creator>>
}

impl<'creator> TextureManager<'creator> {
    pub fn new(creator : &'creator TextureCreator<WindowContext>) -> Self {
        TextureManager {
            creator : creator,
            textures : Vec::<Texture<'creator>>::new()
        }
    }

    pub fn load(&mut self, filename : &str) {
        self.textures.push(self.creator.load_texture(filename).unwrap());
    }
}
```

The engine and texture manager are then separately created in the main function, with the lifetime of the texture manager created based on the lifetime of the engine. An examlple use might look like this:

```rust
let mut engine = engine::engine::init_engine();
let mut textures = engine::resource::TextureManager::new(&engine.texture_creator);
textures.load("assets/villager.png");

// code and stuff ...

renderer::render(&mut engine.canvas, &textures.textures, &gs.ecs);
```

With this, we can still access the texture creator by reference through the texture manager, while having our textures be nicely managed and not all directly created in the main function. Just to re-iterate: I AM NOT A RUST EXPERT. I still don't fully understand what I'm doing here to make it work, but it's a roadblock I ran into while working with SDL textures and I wanted to share what worked for me in case someone else runs into this issue in the future. I may come back and edit what I wrote here once I actually understand what's going on, but for now I hope this is somewhat helpful - good luck out there fellas!