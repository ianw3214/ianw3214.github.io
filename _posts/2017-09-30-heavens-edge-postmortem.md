---
layout: post
title: "Heaven's Edge Postmortem"
date: 2017-09-30
comments: true
tags: post
---

## Prologue?

First things first, I've finally gotten around to putting a blog together, and I thought what better to do for my first post than a post mortem of a recent game I've decided to stop working on.

Before I get into too much detail, I want to make clear that Heaven's Edge was not a game that I have released. It was a game that I worked on over the summer and then discontinued when school started. I stopped working on it mainly because I didn't have time to draw out all of the assets I need for the game, and since it was designed to be a RPG game it required *A LOT* of assets. If you are interested, you can see what I managed to finish on [github](https://github.com/ianw3214/HeavensEdge).

## Introduction

Heaven's Edge was a game I started last year in January, and it was initially an attempt for me to learn openGL. Not soon after, I decided to take the 100 days of coding challenge, where in I would code for at least an hour each day on my personal projects for 100 days. I quickly realized that learning openGL wasn't contributing to my personal project very much because I spent too much time on stackoverflow, so I decided to switch to something I was more comfortable with, which was SDL. 

I didn't really have a plan at the start, I kind of just went with whatever came to my mind. The game somehow morphed itself to be an RPG after I implemented a tile system, and I just rolled with it for the rest of its' lifetime. Development was going slow, partially because I was using SDL and building it almost from scratch, but also because I wasn't a very motivated. The game was just a project I was working on for the sake of working on a project, it wasn't really a game I believed in, which leads me quite nicely to the next section of this postmortem.

## Mistakes

In my opinion, the biggest mistake I made was making a game that I didn't believe in, as I just said literally one sentence ago. I spent a solid few months of my life working on a project I didn't believe in, and in the end it played a big part in me giving it up. After reading about the passion project that came to be [Stardew Valley](https://www.gamasutra.com/view/news/267563/The_4_years_of_selfimposed_crunch_that_went_into_Stardew_Valley.php), I've realized the importance that passion plays in game development. The drive and motivation of believing in your own project is what will drive it forward, it's what will keep you working on it even when it seems like nothing is coming together. This passion is what I lacked when I was working on Heaven's Edge.

Another big mistake was miscalculating the scope. I planned to make a small RPG with maybe a few levels and a few enemies, so I thought it wouldn't require much work. However, after having developed a single level in the game, I realize the amount of work that goes into making the art for each level and then implementing it is far beyond what I thought to be. However, I think if I was working on a game that I believed in, I could've pushed through and finished. In a way, this is only a mistake because of the first mistake I made. Referencing **Stardew Valley** again, the developer definitely create a game that is of way too large a scope for most solo developers to handle. However, he believed in his game and was able to work through the enormous scope and finish his game. 

## Accomplishments

Now that I think about it, I probably should've put the accomplishments before the mistakes, but I have such a nice transition there that I don't really want to change it. There are a few key features I achieved in Heaven's Edge that I'm quite proud of, the first being the tilemap system. I was able to structure my map and tile classes quite cleanly and it was overall quite easy for myself to work with during the development of the game. I added file loading/saving to the map class later as well, so I was able to easily store map data in text files. Overall, it is one of the more elegant systems I included in the game.

I also made a level editor for the game, although it was quite basic in design. It could only load one map at a time, and it saved to a specified file location. The editor could only take tile assets from a single image, and didn't even have the ability to add enemies or NPCs. However, I still feel quite accomplished since the level editor saved me *A LOT* of time that I would've otherwise spent on figuring out levels from text files.

Finally, the collision system that I implemented towards the end was also a major accomplishment for me. Even though I wasn't quite able to restructure all of my old code to use my new system, it is still a pretty elegant system itself. I'm not going to go into too much detail because that doesn't really matter here, but I'm mainly happy about the way I wrote my C++ code in the collision system. It was around then that I was really getting into C++ programming, learning about things like *copy constructors*, *the rule of three*, *const correctness*, and all of that jazz. Being able to implement something that is somewhat close to professional code, was a bit step for me. Although it is not too big of a deal for me now, it was quite a big achievement for me when I was working on the game.

## Things to do better

So I guess this section is also about my mistakes, but more specific ones that I made in the development process itself. One example is the move functionality of the *Creature* class. I hard coded a lot of the logic, and when it came time for me to add a more complicated enemy it was a pain in the ass for me to use. For one, I used hard coded collision boxes in the move function instead of using the collision boxes of the Enity it was moving, so I had to make major changes to the code to fix that. Another big problem of the move function was that it only checked tiles in a 2 by 2 square around the target, but if the target is bigger than 1 tile the move function wouldn't check enough tiles. Overall, it was way too messy of a function and I should've done more to refactor it. 

Another part of the code I wasn't happy with was the way I implemented the combo system. Once again, I hard coded it into the hero class so that each attack would handle its own combos. This meant that it wasn't very extensible, and every time I wanted to add a new combo I would have to add a new player state and handle the logic in each attack itself. I should've went with a tree structure or something that kept track of key presses to decide what player logic to execute. 

There are many more mistakes I can point out, the flaws in the enemy AI, the hacky solution for game states, bad memory management, inefficient menu systems, the list goes on forever. I've learned a lot from these mistakes though, and I think I can definitely make my next game a lot better.

## The Future

After a long 8 months, I've definitely come a long way and learned a lot. Although I didn't really care much for this project, I definitely did have fun working on it for the most part. For now, it is back to the drawing board for me, I will figure out what I want to make next time before jumping in. I've started working on my game engine, which is not on github yet so I don't have a link. I mainly want to create a game engine to learn more about C++, but it will also be useful for me during game james so I don't have to always start from scratch. 

As today is the start of October, it is a new month for the [1 game a month challenge](http://www.onegameamonth.com/). I'm going to find a weekend this month to do a mini game jam for myself I think, just to test out my engine and see what needs tweaking/fixing. I'm also going to start a big project again, but this time I'll make sure to be actually making something I like! Stay tuned for more, be sure to follow me on [twitter](twitter.com/ianw3214).