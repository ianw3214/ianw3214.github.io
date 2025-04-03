---
layout: post
title: "Null Injection"
date: 2016-11-06
comments: false
tags: project
image: fusionBlitz.png
description: A platformer game made for the UTGDDC reading week game jam using a QcEngine, a custom engine based off of SDL

---

Null injection is a platformer game made for the UTGDDC reading week game jam using QcEngine, a custom engine based off SDL. This was one of my first game jam games ever, and I learned a lot throughout the entire experience.

![Screenshot 1](/assets/projects/nullInjection1.png)

[itch.io link](https://quichi.itch.io/null-injector)  
[github link](https://github.com/ianw3214/Null-Injection)

Null Injection is a very simple platformer, and my objective with the game was to create something with very tight controls that felt good to play. I learned many animation principles to make movement and attacks feel fluid, as well as how to connect the animation to the code in a seamless way.

![Screenshot 2](/assets/projects/nullInjection2.png)

There isn't much of a story to the game or anything, you play as a defender against computer viruses, planting "null injections" into the host system. The aesthetics of the game is designed with this in mind, with the black and green matrix like background providing most of the atmosphere.

![Screenshot 2](/assets/projects/nullInjection2.png)

## Tech

As I mentioned previously, I used my own engine written in C++ to create this project. I've updated the engine many times since then with all the things I've learned, but I had to wrestle a lot with my own code while I was working on Null Injection. For things like the animation system, I had to constantly switch between game code and engine code since it wasn't implemented properly in the engine. However, I definitely learned a lot about how to improve my code and ended up writing a better engine with all the mistakes I've learned from.

I hadn't quite learned a lot about serialization yet, so many things were hard coded into the final executable. There is some very basic text file serialization for the levels, mainly used so I could adjust the exact level details without having to re-compile the entire project.

## Results

I had to face many unknowns while working on this project, from animation, collisions, attacks, to general level representation and overall game architecture. There are many things that could be improved on, but this project was a real stepping stone for me. Ironically, this is also my most downloaded game, although I suspect that is because of the naming being a somewhat commonly searched term.
