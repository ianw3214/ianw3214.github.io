---
layout: post
title: "Game States"
date: 2017-10-15
comments: true
---

## Game States

In this post, I'll be talking about how I manage game states in my custom engine. States are useful because they can allow us to easily separate the logic behind different 'states' of the game into different classes. Without a state system, a game might use switch statements and loops of some sort to determine things like menus or death screens, which makes it harder to debug since it is harder to follow along.

By separating our game states, we can treat each state as separate entities, which makes it easier to maintain since we can focus on one part of the game logic at a time. In my engine, I implemented a State class and a State manager to keep track of each current state. The state class handles all of it's own resources, and has some basic methods that each state should have, such as *update* and *render*. This is what the state class looks like:

<script src="https://gist.github.com/ianw3214/3fb011d67eb09fe0aaf34e0b0896661a.js"></script>

Obsiously, this is a very bare bones version of what a state looks like. The *init* and *cleanup* methods are called whenever a state is loaded into the game and when a state is exited. We store a *statemenager* pointer in the class because we use it to change into different states, as well as access to some low level functions for texture loading and all that jazz. 

### State Manager

The state manager class is what makes the state system work. It handles the initialization and cleanup of states when there are any state changes and keeps track of the current state as well. Here is my implementation of the State Manager:

<script src="https://gist.github.com/ianw3214/6b688a0e1a7d58279c7014e79f12d987.js"></script>

As you can see, I disabled the copy constructor and the assignment operator of the State manager class. This is because it wouldn't make sense to have more than 1 state manager class instantiated since we only ever run 1 state at once in the game. Also, I made a decision to separate the state manager from my engine class, so there are some basic functions like *isRunning()* for the engine to call to see if it should quit or continue looping through the updates functions. The *update* and *render* functions simply call the corresponding functions of the currentState, which is stored as a pointer member variable. The *changeState* and *exit* functions also let the states control the flow of states themselves. 

### Downsides

With the way I implemented my state system, there is no way to kind of pause a state and resume it later, which means pause functionalities have to implemented within a game state itself. Since the *changeState* function of the state manager will delete the state, so we can't use the hacky solution of temporarily storing the state pointer in the new state and just changing back later. 

This brings me to another way of implementing a state manager, using a **stack** of states instead of just a pointer. This means that we can just push a new state to the top of the stack and that state will be the current state. This way, adding a new state would pause the other loaded states, giving an easy way to implement pause states. However, I haven't quite needed a pause functionality in my games so far so a simple system of just storing a pointer has worked for me so far. 

All in all, state systems allow for cleaner code that's easier to maintain and debug. It's been a bit of a short post but I hope it was informative nonetheless.