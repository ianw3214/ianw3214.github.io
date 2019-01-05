---
layout: post
title: "Null Injection Postmortem"
date: 2017-11-06
comments: true
tags: post
---

## Reading Week Game Jam

I participated in the *UTGDDC fall reading week game jame* this weekend (UTGDDC stands for University of Toronto Game Design and Development Club), and ended up making a 2D platformer beat'em up style game. I was working alone, and everything in the game excluding the fonts used to render words was made by me. Here's a list of tools I used:

- Graphics Framework: [SDL](https://www.libsdl.org/)
- Image Loading: [SDL image](https://www.libsdl.org/projects/SDL_image/)
- Text rendering: [SDL TTF](https://www.libsdl.org/projects/SDL_ttf/)
- Music library: [SDL mixer](https://www.libsdl.org/projects/SDL_mixer/)
- Sprite creation: [Asesprite](https://www.aseprite.org/)
- Music creation: [Bosca Ceoil](https://boscaceoil.net/)
- SFX creation: [Chiptone](https://sfbgames.com/chiptone/)
- Pixel Font: [MUNRO](https://tenbytwenty.com/?xxxx_posts=munro)

I decided this game jam was a good time to test out the game engine I've been writing, so I decided not to do something too crazy, which is why I went with a simple platformer. As this is the first game I've made using my custom engine, I had to go back and fix a lot of engine code a lot of the time which cost me quite a bit of time in the beginning. Overall, I'm pretty happy with the result of the game, which you can find on [itch](https://quichi.itch.io/null-injector) or [github](https://github.com/ianw3214/FusionBlitz) (It's called Fusion Blitz on Github because that's what I was GOING to name the game...)

## Art

I went with a simple pure white character because I didn't have time to come up with a design, which lent itself to a more clean and simple look. I almost pulled my hair out trying to piece together the animations, but I was able to make them look OK in the end. I would've liked them to be a little bit more fluid but given the time constraints I would say the result was accaptable. The maps are a bit more dissapointing than the players, I didn't have time to come up with a tile based solution (nor did I want to) so I went with hand made maps. This meant that I would have to draw the maps myselves, and as a result they look very bland. Just looking at the map images themselves, I definitely would have put some more work into it but for the art direction the game took, everything kind of was just able to fit together so I didn't bother putting too much effort into it.

## Gameplay

In terms of gameplay, I would say this is one of the best games I've ever made. Since the gameplay was kept pretty simple, I was able to focus on the responsiveness of the game so that gameplay feels a lot more fluid. One example is the screenshake when the player attacks, which makes the game feel more dynamic. Another is the recoil that enemies recieve when they get hit, which provides some basic gameplay feedback to the player. I also added a red colour modulation for when the player gets hit to really drive home the sense of danger when players start to lose health. There are a few more examples, but overall they give the game a fluid and cohesive gameplay flow. 

## Programming

This is where it starts to get a bit ugly. Being a game jam game, and rollin my own engine on top of that, the code got really ugly after the first few hours. I didn't have time to think my systems through so half of the code is probably copy pasted from each other, and on top of that most of my variables are hard coded into the game. I at least put all the values into macro definitions in corresponding header files, but it's still a mess trying to find the right variables when I need them. On top of that, some of my functions are abysmally long, like my enemy *update* function that spans 150 lines. If I were to go back and look at my code now I probably wouldn't be able to understand most of it anymore.

To make things worse, my code turned out to be extremely unoptimized. The biggest culprit is the background. Each 0 and 1 bit is it's own entity that stores its own texture, and every single one of these bits are updated and drawn every frame. In an ideal world, I'd combine these into groups and render/update groups together instead of individual bits, but I ran out of time trying to figure that out in the end... Also, the movement logic is extremely unoptimized as well, I'm not going to get into it too much but the code runs in O(n) time right now where n is the movement distance each frame. This is true for both the player and the enemies which means it really starts to add up once I add more enemies.

That being said, there are some parts of the code I'm quite fond of, like the *attack messaging* system I implemented. The problem I was having was that I needed the player to damage enemies in it's attack function and enemies to damage players in its attack function, but I didn't want to handle the other class taking damage within a separate class (I hope that made sense), so I created a new class to handle any attacks in the game. Now, entities just have to queue an attack message to the messaging system and the game will process the messages and handle different cases accordingly. This is nice because it's pretty extensible, I can create new classes and easily change the attack system in the game loop to handle the new case where as without the system I would have to change code in every single class that attacks things.

Other than that, there's really nothing else good about the code. All of the timers and textures are hard coded in, and classes like *ShootEnemy* are basically a clone of the *enemy* class with some tiny changes. The movement code for every entity checks every single collision box in the map, it's just bad code all in all. 

## Music / SFX

I ended up making 2 tracks for the game, both of which are Taylor Swift song knockoffs. The first one is the menu song, which is cloned from *Look what you made me do*, and the second is taken from *Ready for it*. Of course, they aren't exaclty copied but I took heavy inspiration from them when I was making the music. They ended up fitting the game quite well so I'm not feeling too bad about it, but maybe something a bit more different would be nice. Also, the sound effects aren't very good because they sound a bit pixelly. There's a sort of low quality feel to them that doesn't fit the game quite well, so I'm starting to look for better alternatives in terms of SFX tools to use for my next game.

## Closing Words

Overall, I'm pretty happy with how the game turned out, even if it was a whole jumble of sphagetti code. It's given me a lot of insight about some systems I should add into my engine, and taught me a lot about different coding tricks I can use to achieve certain effects in my game as well. It was definitely a fun experience using my own engine and made the end result that much more satisfying!