---
layout: post
title: "Building an online multiplayer game"
date: 2019-01-21
comments: true
tags: post
---

# Chaos Arena

## Introduction

Introduce the concept/gameplay

- An online multiplayer pvp game
- Explain the original concept and how it was too hard
- Then describe the resulting game and features that DID end up getting developed



## Tech

Explain the back end and some of the communication

- High level overview of networking interface and guaranteed packets
- Talk about how the packets failed
- Packet structure and conversion between packet types

## Experiences

Describe some experiences working with networking code

- Difficulties in debugging
- ESPECIALLY trying to debug a multiplayer game on a single laptop
- Trying to over complicate things with multi-threading when not necessary

## Conclusion

Some lessons learned, tips for the future

- Make sure things work before refactoring (no need to start complicated)
- Networking is HARD, needs a lot of structure and design