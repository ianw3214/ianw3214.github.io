---
layout: post
title: "Material Point Method Snow Simulation"
date: 2020-12-20
comments: false
tags: project
image: snowsimulation.png
description: A material point method for snow simulation - University of California Los Angeles, Walt Disney Animation Studios

---

# A Material point method for snow simulation

[github link](https://github.com/ianw3214/MPM-snow-simulation)

This project was developed as the final project for my Physics-Based Animation course, where I worked with a partner to implement [this paper](https://www.math.ucla.edu/~jteran/papers/SSCTS13.pdf). This technique was used in Disney's Frozen to implement many of the snow effects found in the movie.

You can find a video of our results [here](https://www.youtube.com/watch?v=ZQy6bHo0ImQ&ab_channel=IanWang).

Throughout our course, we mainly used the finite element method in our simulations so it was very interesting to learn about other different methods for physics simulations. We used Eigen extensively throughout our code base to handle most of the math based code. We also had to learn much of the physics concepts on the fly, as neither me nor my partner have had much experience in the field.

We used stb_image to render each frame to an image, then stitched the frames together at the end. This allowed us to run simulations with a large amount of particles and very small timesteps, which meant a higher quality result without the performance restrictions of running the simulation in real time.
