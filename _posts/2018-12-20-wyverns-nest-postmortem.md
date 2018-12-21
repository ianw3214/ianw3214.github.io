---
layout: post
title: "Wyverns Nest Postmortem"
date: 2018-12-20
comments: true
---

# Wyverns Nest

Over the past few months, I had the privilege of leading a team to create a 2D turn based fantasy strategy game. Since the game was a project for our game development club, I had to pitch it to other members; The pitch can be found [here](https://1drv.ms/p/s!Ag1MonJKWKRDlgz9OuxE4P_8kK2i). I ended up with around 18 people on my team initially, 16 and a half of which were artists. This was my first time leading a team of people, so it was a new experience for me.

As I mentioned before, Wyverns Nest is a 2D turn based fantasy strategy game. The primary focus on the game was heavy DnD like customization, where the player would have an enormous amount of options for building their characters. That would then be paired with simple pokemon like combat, showcasing unit builds rather than combat skill. In the end, there were a few features that we couldn't implement in time, but we managed to produce a playable prototype with most of our envisioned features. The game can be found on [itch](https://quichi.itch.io/wyverns-nest).

In terms of the tech stack, I decided to make the game in C++ using OpenGL, using SDL2 for windowing. The reason I chose C++ over something like Unity or Unreal is that I wanted to lead in something I was already comfortable in, and I would then have one less thing to worry about as I was building the game. Although this meant that a lot of my team members would have to learn C++, it felt like a good decision in the end.

## Leading a Team

Since this was my first time leading a team to work on a game, there were some hiccups.