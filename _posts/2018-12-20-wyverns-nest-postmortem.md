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

Since this was my first time leading a team to work on a game, there were some hiccups. However, towards the end, the process was getting a lot smoother as everyone learned to work better with one another.

### What Went Right

I decided to use Trello to manage tasks; It was quite hectic at first since no one had really ever used Trello before (I got 12 months of Trello gold because of all the invites). However, towards the end, the Trello board came in very handy for keeping track of what was working on what, so I could assign people to high priority tasks and perhaps move people around if a task wasn't getting done. In the end, our Trello board looked a little something like this.

![Our trello board](/assets/posts/trello.png)

Our git workflow was also a bit rocky in the beginning, partially because I had no experience with such a large team and most of my team members had never used git before. I had the git repository set up at first to include multiple different branches for each different *'state'* of the game. However, this approach proved to be very ineffective as there were pull requests happening multiple times a day in so many different directions. In the end, I just went with two branches, a *dev* and *master* branch, and had members work on their own forks. This simpler approach turned out to work very well for us, as there was little to no confusion in the process.

Finally, the weekly team meetings were instrumental in keeping the team on the same page. The meetings usually consisted of a quick update on the current progress and then planning the tasks to complete in the next week. Some of the meetings were also more design focused, figuring out details on how to tweak various features to fit the vision of the game. Although the meetings could have been streamlined a bit, they definitely made a positive impact towards the development process of the game.

### What Went Wrong

First and foremost, the team was very imbalanced at the start, with 17 programmers and only one artist. This imbalance in team members showed in the final product, where most of the features were implemented but a lot of art is still missing from the game. Although we managed to make the final product work, it definitely could have used a lot more polish in terms of art and user experience.

Communication was also very lacking within the team. Although the trello board helped me keep track of tasks that people were working on, most members weren't very vocal about their progress nor any problems they were faced with during development. This made it very difficult to plan properly for future tasks, and required a lot of shuffling team members around so that important tasks were getting done to prevent bottlenecks.

Most importantly, we did pretty much zero playtesting before demoing the game, which posed many problems for us both in terms of design as well as programming bugs. For example, the players moves weren't getting updated properly and the player UI didn't work when the player was on the bottom of the screen. There were also many complaints about the pace of the game, which would have been caught if we would have playtested more.

## The Future

In the end, I'm very proud of the product we were able to put out. A lot of the original design goals were met, and we were able to achieve a game with decent customization and simple enough combat. I will definitely continue this project in the future, and I have a few features in mind already.

With the lessons I've learned, there are some things that I will do differently to improve our workflow. For one, holding playtesting sessions regularly will make sure that the game feels good to play. I'll also try posting updates on our discord server more often to encourage communication between team members. I also found that a lot of people didn't know how to program in C++, which isn't a project specific problem; I do want to try to start some sort of user group to encourage more C++ programming at our school.

All in all, it was a great experience leading so many people to work on a project and I've definitely learned a lot from it. Hopefully, the team will continue working on the project next semester and we'll eventually have a releasable product!