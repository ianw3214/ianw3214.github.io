---
layout: post
title: "Wyverns Nest"
date: 2018-12-01
comments: false
tags: project
image: wyvernsNest.png
description: A 2D fantasy turn based strategy game that features rich customization options paired with simple yet engaging combat.

---

# Wyverns Nest

[itch.io link](https://quichi.itch.io/wyverns-nest)
[github link](https://github.com/ianw3214/WyvernsNest)

Wyverns Nest is a 2D fantasy turn based strategy game that features rich customization options paired with simple yet engaging combat. I started this project as a team project for our game design and development club, and collaborated with many other people throughout the entire development process. We started with about 20 people who were interested in the project, and managing the team started out as a real challenge. Towards the end,

![Screenshot 1](/assets/projects/wyvernsNest1.png)

The combat occurs on a grid, allowing for more positioning based strategy on the players side. The grid itself resides on a map, providing other interesting elements such as completely opaque obstacles such as rocks or more "transparent" obstacles such as water.

![Screenshot 2](/assets/projects/wyvernsNest2.png)

The player assembles a team of various characters with fully customizable skill trees and stats, and each character can equip four skills to use in combat encounters. Each character have their own individual properties and are tracked independently of each other - the end goal of this was to allow the player to store many characters and use specific ones to their choosing for each encounter.

## Tech

We used pure C++ from scratch for this project, with small libraries like SDL for windowing and GLEW to handle loading OpenGL functions. Yes, this was a pretty big time sink, but it was a good learning experience for me as well as the rest of the team. I handled most of the low level OpenGL interfaces, allowing others to work on things such as animation and particle systems. Most of my team had not learned C++ since not many courses use it at UofT, so I had to walk many of our team members through their tasks. Towards the end of the project, many of the remaining team members had a decent grasp on the language and a nice project to show for it.

Another big aspect of the game was the saving/loading of the characters; We serialized all of the game data into JSON files, including the player saves as well as the level data itself. For this, we used the [Nlohmann](https://github.com/nlohmann/json) JSON library, as the hassle of implementing a JSON encoder/parser was not worth it. Many of our team members had web development experience, which is why I chose to use JSON as our file storage format.

There were also a few artists on our team, so we had to create some tools for easier assets creation, including maps, character animations, attacks, and so on. For example, I implemented the attack system to be quite versatile in game, with many adjustable properties on each attack. This translated very well into our editor, where instead of the artists having to figure out logic themselves, they could just turn a few knobs and sliders to achieve the results they wanted.

## Results

Our first demo result is published [here](https://quichi.itch.io/wyverns-nest/devlog/61137/wyverns-nest-devlog-001-official-demo). We managed to implement a lot of the core game structure, but started to lack a little when it came to game design and level design. For now, the content of the game remains unfinished, but it is something to perhaps return to once we have more game design knowledge.
