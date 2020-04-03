---
layout: post
title: "Bananana, a club penguin clone"
date: 2020-04-02
comments: true
tags: post
---

In Toronto, we are currently social distancing in order to combat the spread of COVID19. Naturally, I started playing a lot more games since I can't go outside to hang out with my friends anymore. One night, we decided to play club penguin, and as much as I love the game, it has many flaws. Mainly, it still runs on flash which many browsers are discontinuing support for. As such, I made the decision to try my hand at making a club penguin clone using more modern technologies, and the game *Bananana* was born.

The first thing I noticed is that there's not a lot of tutorials out there that teaches how to create a club penguin like game, which is part of why I'm writing this series. I'm going to focus on the networking systems that I use, since there are many tutorials out there that already cover making a game in javascript. You can find the source code for the game [here](https://github.com/ianw3214/bananana) and the source code for the server [here](https://github.com/ianw3214/bananana-server).

For this project, I decided to go with *webGL* for rendering the game, for the sole reason that I've used it before so I'm more confident with it. For the server, the code is written in Python using the *websocket* module, hosted on Heroku. I chose Python for its simplicity, so I could have the project up and running sooner. There are major performance implications with that decision, but I'll worry about that once performance actually matters.

## Networking architecture

Club Penguin is not a traditional real time game like a first person shooter, where precise timing is very important. A delay of a few seconds is annoying, but not game breaking at all. Therefore, a lot of the architecture I implement trades in performance for *simplicity* and *readability*.

Every action in game is an event that is sent to the server, and the server may process that event and broadcast it back to all the clients. Every event in the game is handled on the server side. As soon as the client joins, it sends a message to the server to notify the game of its existence. At this point, the client doesn't even know of its own player yet, it waits for the server to respond with a create character command. This might create a slightly laggy response for the player, but I deliberately made that choice so that there wouldn't have to be separate logic for the local player and other players. Every player is treated the same in the game, which makes the code a lot simpler.

Both the client and the server are separated into two parts - the consumer and the producer. On the client side, this line is a lot more blurry since everything is bundled into the socket wrapper. However, on the server side, there is a clear distinction between the _consumer\_handler_ and _producer\_handler_. They are both fairly straightforward, the consumer _consumes_ messages and handles them whereas the producer _produces_ messages that are sent to all clients.

### Message Queue Approach

The producer, which sends messages to the clients, sleeps for half a second after sending each message so that we don't use up too many resources running the server. I first implemented this as a queue where each tick, the server would send one event to the client. However, this proved to be a bad and inefficient solution. First of all, since all events are handled on the client side, the clients own actions could take a long time to occur if there is a large message queue on the server. Secondly, this meant that the server was sending out packets for each message, and each packet has its own overhead costs associated with it.

### Message Batching Approach

The current solution I'm now using is batching the messages on the server side together. For example, if the server receives 5 events within the half a second 'tick' of the producer, the producer will simply send all 5 messages in a single giant message at the next tick. This eliminates the delay of having to wait for other messages to get processed first as well as the cost of sending each message individually.

<script src="https://gist.github.com/ianw3214/82ca68e916e76e7530fcfe5fb68f1d31.js"></script>

The *sendMessage* function doesn't actually send the message through the socket, it places the message at the end of the list so that it can be batched into the next producer tick. This way, the delay is eliminated, resources get used more efficiently, and the order is also still preserved.

## Server State

Currently, there is not much gameplay so the server doesn't have a lot of state to keep track of. I only have a list of clients with their associated state stored in a Python dictionary. Clients are identified by an *id* that is created by the client when it joins. Eventually, this will be replaced by a token from a login system, but the id system simulates how it will eventually work pretty well.

For the movement system, the server tracks the client x and y position. When it receives a movement action, it will broadcast that to every client, including the one that sent it. Then, the clients will handle the smoothing of the movement themselves. Again, since the _'real time'_ aspect of the game isn't very critical to the gameplay, a little bit of desync between the clients is completely acceptable here.

For the fishing system, everything is currently very hacked together. My goal was to implement it quickly first to find out what kind of structure I would need to generalize it into in the future. For now, clients keep track of their *state*, which consists of default and fishing. The server will send messages to the clients when it receives the prompt. Then, at each tick, there is an *update* that checks if the client has fished a fish. If so, the server will send another message to the clients about the results of fishing, and the game on the client side will decide how to handle it.

## Next Steps

To make it feel more like club penguin, there needs to be personalization. That starts with players being able to choose a name and have it display in the game. From then on, it's about persistence - players want to be able to get things and keep their things. That mean's I'll have to look into persistent storage of some sort since Heroku doesn't seem to have it, fun! :)

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Boredom is really hitting hard... implemented fishing in my club penguin clone today :) <a href="https://twitter.com/hashtag/gamedev?src=hash&amp;ref_src=twsrc%5Etfw">#gamedev</a> <a href="https://twitter.com/hashtag/gamedevelopment?src=hash&amp;ref_src=twsrc%5Etfw">#gamedevelopment</a> <a href="https://t.co/9PUy6H0ijO">pic.twitter.com/9PUy6H0ijO</a></p>&mdash; Ian (@quichi_art) <a href="https://twitter.com/quichi_art/status/1245585146582937600?ref_src=twsrc%5Etfw">April 2, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
