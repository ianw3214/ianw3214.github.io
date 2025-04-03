---
layout: post
title: "Rust Raytracer"
date: 2023-07-31
comments: false
tags: project
image: rustRaytraceTitle.png
description: A raytracer developed in rust with features like lighting, shadows, materials, and constructive geometry.

---

![screenshot](/assets/projects/rustRaytrace.png)

This project was developed while following [the ray tracer challenge](https://pragprog.com/titles/jbtracer/the-ray-tracer-challenge/). It features basic raytracing features such as rendering shapes, lighting, shadows, reflections and refractions - as well as a more generic material system and constructive geometry. Scenes are described directly in the code, and are rendered to an output ppm file.

The project was written entirely in rust, and utilizes the built-in testing features of rust and cargo to allow for test-driven development. This was mostly a learning project for both raytracing *and* the rust programming language, so there were quite a few hiccups along the way. The data-driven nature of the language naturally lead to a very data-driven code architecture, with most features working off a common set of data. The data setup relies heavily on rust enums to handle different variants of data, as well as traits to handle common behaviour.