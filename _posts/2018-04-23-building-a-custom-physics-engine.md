---
layout: post
title: "Building a Custom Physics Engine"
date: 2018-04-22
comments: true
tags: post
---

About a week ago, I took part in the **NXT showcase competition** hosted by Ubisoft, wherein we were tasked to create a pinball game using a provided API. The API only contained the functionality of line and text rendering, and we weren't allowed to use any third party libraries, which meant that the physics of the game had to be implemented from scratch. You can check out a video of the game [here](https://www.youtube.com/watch?v=377GqweQunk&t=122s). In this post I'll briefly cover my implementation of a basic physics engine and some of the design choices I made.

## Collisions

The basis of any physics engine has to be collisions, as we have to first know if two objects are colliding before simulating how they react to each other. For my collision system, I started by defining some basic classes to represent each shape that would be in the game. I ended up with something like the following:

<script src="https://gist.github.com/ianw3214/f75dbffc5546d35ca106506c8e6d2402.js"></script>
<noscript>
    <pre>
        struct Shape {
            ShapeType type;
        };

        struct Quad : Shape{
            Vertex vertex[4];
        };

        struct Circle : Shape {
            Vertex center;
            float radius;
        };
    </pre>
</noscript>

The two shapes both inherit the base *Shape* class. I decided to implement it this way so that I could have a general function defined like that takes two *Shape* pointers and calculates the collisions on arbitrary shapes. Although it doesn't help much in this case as it is known in advance what shape each objects are, I still went with this design because it allows for more extensibility. If I were to implement some system where shapes may be added to the level at random, then it wouldn't be known at compile time what shape each object i. Thus, I would have to store extra data in the game itself to determine the type of each shape and use if statements within the game code, which doesn't look clean in my opinion. As such, I decided to put the shape type within the shape itself and have the collision function determine what the shapes are so I have one single top level function to call.

As for the implmentation of the actual collision detection, I used different techniques for each different shape. For quad on quad collision, I used the [**Separating Axis Theorem**](https://www.dyn4j.org/2010/01/sat/). It was only halfway through that I realzied I won't need quad on quad collision since the ball is the only object that moves, and I couldn't figure out a way to utilize it in the game, so all the work I put in was pretty much wasted in the end. 

For circle on circle collisions, I simply take the distance between the two vertices and compare it the length of the two radii combined. A small note here is that I technically used the distance squared because square rooting is an expensive operation, so I really compared the distance squared with the combined radii squared. 

Lastly, the algorithm for Quad and Circle collision detection is comprised of two parts. First, I iterate over each line and find the closest point on the line to the circle. If the distance is smaller than the radius of the circle, then the line must be intersecting the circle and thus the quad and the circle must be colliding. If none of the four lines are colliding with the circle, then the circle may be completely inside the quad. Thus, the second part of the algorithm checks that the circle is completely inside the quad *(using some fancy algorithm on the internet that I didn't understand)*. Finally, if none of the above occured then we can safely conclude that the circle and quad aren't colliding.

## Collision Resolution

Because every object other than the ball and paddles don't move, the collision resolutions become pretty easy to calculate.

<script src="https://gist.github.com/ianw3214/34e40dbf1a6fa84e3431ff53262101b2.js"></script>
<noscript>
    <pre>
        Vector handleCollision(const Shape & shape, float delta, Vector vel, Vector normal, float multiplier) {
            // move the ball out of the colliding solid
            while (IsColliding(shape, ball)) ball.center += normal;

            // calculate the relative velocity
            Vector new_vel = ball_velocity - vel;
            float velAlongNormal = dot(normal, new_vel);
            // if the ball and object are already separating, then leave it be
            if (velAlongNormal > 0) return Vector();

            // apply the impulse
            float j = -1 * velAlongNormal * multiplier;
            Vertex impulse = normal * j;
            new_vel += impulse / BALL_MASS;

            return new_vel;
        }
    </pre>
</noscript>

The algorithm starts by moving the ball to a point where it doesn't collide with the object anymore. This is done so that the ball doesn't *sink* into the ground when the gravity is stronger than the resulting velocity applied to the ball each frame. Then, the difference in velocity between the ball and the object is calculated so we can determine how strong the impulse is later on. Then, the velocity is projected along the normal since that is the direction of the velocity we want to apply to the ball. If the projection is positive, then the object must be moving in the opposite direction as the ball, so we don't need to resolve anything. Otherwise, we calculate the impulse and use that to calculate the resulting velocity that should be applied to the ball as a result of the collision. Obviously, this is a very simple approach but it definitely works decently.

There are many tricks I employed using my collision resolution algorithm. One trick had to do with the bouncing circles in my pinball game, which I called mushrooms. I wanted the ball to not just bounce of the mushrooms but also speed up so that the gameplay felt more elastic overall. To do this, I turned up the multiplier by quite a bit *and* used the opposite of the ball velocity as the input velocity of the mushroom, which meant the speed of the ball increased drastically when it hit the mushrooms.

Also, to implement the windmills in my game, I couldn't just resolve the collision and move the quad of the windmill because the windmills are constrained to a center. I tried looking up some algorithms for collision resolution with constraints but it was too much for me to learn in a weekend. My solution in the end actually had nothing to do with collision resolution. I took the ball velocity and separated into the x and y compontents, then I rotated the windmill based on where it was hit by the ball as well as the relative velocities.

## Improvements

There are many things I could have done better, it was a game jam game after all. In reference to the physics system though, I definitely should have designed it better. Right now, I have specific functions in the game that handles collision resolution between the ball and different objects. A lot of code is duplicated across these functions because they serve the same purpose, so ideally I would have a single function to handle every case so that my update function may look cleaner.

Additionally, my code is very unoptimized. Although it has no impact on performance since it is just a simple 2D game rendered with lines, it is still good practice to write code that isn't horribly optimized. For example, on every update I check the collision of the ball against every other object in the scene, which makes no sense if they aren't even close to each other. I could have perhaps used some sort of quadtree implementation to make sure I check the minimal amount of shapes for collisions or something like that. I'm sure there are many more cases of badly optimized code in my game, but I'm not going to go through the trouble of finding every mistake and putting it in the post.

## Conclusion

I didn't think I would be interested in programming a physics engine before programming this game, since I didn't particularly enjoy physics in high school. However, this has been an extremely educational experience for me and I genuinly enjoyed myself in the process.