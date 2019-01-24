---
layout: post
title: "Building an online multiplayer game - Chaos Arena"
date: 2019-01-21
comments: true
tags: post
---

# Chaos Arena

## Introduction

I've been working on a simple online multiplayer pvp game for the past few weeks, and it has been quite a wild ride. **Chaos Arena** is designed to be a game that encourages friendships in real life by disregarding any sort of permanence like rank or score. The hope was to bring back the experience of gaming simply for the sake of having fun, and although a lot of features couldn't be implemented in time, the prototype managed to hit most of my core design goals.

Originally, I wanted the game to feature some sort of dungeon exploration with a lot of co-op oriented mechanics. I wanted to literally take friendship and teamwork and overload the players with it. However, it quickly proved to be too much work, especially since implementing the players correctly already took so much of my time. In the end, I had to scrap any design of enemies I came up with and just go with a pvp game, but it wasn't too hard to twist that to fit with my design goals. PvP ended up being just as, if not, more interaction inducing between players since they were directly facing each other.

Art wise, this game is definitely below par. I had to fix so many networking bugs that I was forced to put art aside, since having the game *work* was more important than it looking nice. Below is a picture of a concept I drew for a final boss of the original concept.

![Some concept art](/assets/posts/chaos_arena_concept.png)

## Tech

For Chaos Arena, I decided to implement a UDP server in C++ without the help of any external libraries, mainly as a learning experience on how things work at the low level. I ended up writing a basic interface that both my client and server had for networking that would abstract most of the socket details, the class looks like the following:

<script src="https://gist.github.com/ianw3214/89cc1a7534b9601d144bbf18e6934930.js"></script>

First, you might notice that the *sendPacket* functions can take multiple different packet types. For my networking code, I consistently transmitted a 64 byte packet between the client and the server, with 4 of the bytes used to indicate the type of packet and what kind of data it was containing. Then, depending on that type, the program will determine if there's any other flags to parse and then handle the data accordingly. I also wrote up utility functions to convert between different packet types to the *BasicPacket* type, which just holds all of the information in a char array.

For the *sendPacket* functions, implementation was easy, since I would just send the packets and not care about them anymore. This was used on things like movement, where one missed packet wouldn't disrupt the game much. However, implementing guaranteed packets was quite a magnitude harder, and I'm quite sure it doesn't even work (sad...). My idea was to attach a packet id to packets that were supposed to be guaranteed, and if the receiver detects a packet with an id, it would send a *received* packet. There is a lot of overhead to this, including keeping track of packets that haven't been been acknowledged and managing timeouts, as well as making sure packets aren't received twice in case the sender times out before receiving an acknowledgement. In any case, I'm not going to dive into too much detail since it didn't work out too well, and I haven't quite figured out why. The biggest thing I can take away from this is that implementing reliable packets require a lot more design and thought than I put into it.

## Experiences

As this was my first time developing a multiplayer game, almost everything that could have gone wrong did. For one, I decided to make both the client and server multithreaded because I thought it was necessary for simultaneous processing of incoming and outgoing packets, when in reality I could have just used a non-blocking socket. This ended up being a huge pain point for me.

Additionally, I was trying to develop an online game on a single laptop, so I couldn't really play test the important features. I had to run two instances of the game at once on my own laptop, which was problematic because both clients were receiving every packet sent from the server; When a client wasn't receiving any packets but was getting them because the other client was receiving them, it seemed like the client was receiving all the necessary packets and so some bugs didn't show up until I got people to playtest it.

All of these factors made debugging the game infinitely harder. However, in the end, I was able to create something that **kind of works**. The experience also proved invaluable in sharpening my networking skills.

## Conclusion

In the end, my biggest lesson was probably that networking is **a lot** harder than it seems, and it requires a lot of design and forethought. I went into this project without a real plan and everything got really messy really fast, I ended up spending a lot of time re-structuring existing code to be able to support the new features that I wanted rather than actually making the new features. Overall, I am proud of what I was able to create, and I hope my next online game goes a bit better than this one