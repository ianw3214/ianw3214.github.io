---
layout: post
title: "Sprite Stacking"
date: 2019-10-31
comments: true
tags: post
---

I came across this [cool sprite rendering technique](https://spritestack.io) a few months ago and I recently decided I would have a go at implementing it. It turned out not to be as hard as I thought it was, although I am a long way from perfecting it.

## Overview

The underlying idea for this technique is actually quite simple. The 2D sprites can rendered in 3d and layered on top of one another, and then the result is pixelized.

This is what the model looks like before the pixelization shader is run:  
![before](/assets/posts/spritestack_before.png)

And this is what it looks like after:
<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Playing around with some sprite stacking tech, might have to adjust the shaders/art a little more but here&#39;s my progress so far <a href="https://twitter.com/hashtag/opengl?src=hash&amp;ref_src=twsrc%5Etfw">#opengl</a> <a href="https://twitter.com/hashtag/pixelart?src=hash&amp;ref_src=twsrc%5Etfw">#pixelart</a> <a href="https://t.co/J1SWzWI8TN">pic.twitter.com/J1SWzWI8TN</a></p>&mdash; Ian (@quichi_art) <a href="https://twitter.com/quichi_art/status/1188156250099466241?ref_src=twsrc%5Etfw">October 26, 2019</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

## Problems

From the final result, you can see the separation between the layers on certain angles. To fix this, I tried using rounded edges on the corners of my sprites, like this:  
![layers](/assets/posts/spritestack_layer.png)

When blown up in scale, the separation is still clearly visible, like this:  
![fragment](/assets/posts/spritestack_superfragment.png)

I haven't come up with a good fix for this yet, but for the project I have in mind keeping the models small should help enough in making the visual separation disappear.

## Conclusion

I don't write enough posts so I still have no idea how to end them (not that anyone reads it anyways). I didn't realize I had so little to say so this post turned out a bit short. I guess let me know if this was helpful and be on the lookout as I post new things :D (also follow me on [twitter](https://twitter.com/quichi_art) I am very lonely)
