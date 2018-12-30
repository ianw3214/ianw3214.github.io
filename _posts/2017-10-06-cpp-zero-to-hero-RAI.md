---
layout: post
title: "C++ Zero to Hero - RAII"
date: 2017-10-06
comments: true
tags: post
---

## Introduction

I'm going to first talk about a bit of my motivations and goals, so if you don't want to hear that you should skip to the next section for the good stuff. Anyways, I've been working on a game engine this past week and it's really opened up my eyes to how little I know about C++. After a few hours of browsing the [C++ subreddit](https://reddit.com/r/cpp), I've realized that I can't even understand at least half of all the posts on there. That is why I spent a couple of hours putting together a list of C++ topics that I want to learn and understand, from things like *RAII*, *SFINAE*, to *memory alignment* and *template metaprogramming*; I want to learn it all, and I'm starting with this post about **RAII**. 

***

## What is RAII

RAII stands for *resource aquisition is initialization*, which is essentially the idea that the lifetime of a resource that has to be acquired should be bound to the lifetime of an object. Essentially, upon *initialization* of an object, we are also *aquiring resources* which have their lifetimes bound to that of the wrapper object. Some people are pushing to call this *scope bound resouce management*, since the resource is freed once the object goes out of scope. This fundamental programming technique is used to guarantee exception safety; Consider this example:

<script src="https://gist.github.com/ianw3214/37aa8815685eca3192f76690e4857828.js"></script>
<noscript>
    <pre>
        std::mutex var_mutex;
        // .. Do some stuff ..
        try {
            var_mutex.lock();
            throw (std::exception());
            var_mutex.unlock();
        }
        catch(const std::exception& e) {
            std::cout << e.what() << std::endl;
        }
    </pre>
</noscript>

The above code locks the mutex on the first line in the try block, and calls unlock later on in the program. However, once the exception is thrown, the rest of the try block doesn't execute and the program control falls to the catch block. This means that the mutex is never unlocked properly and when the lock function on the mutex is called within the same thread again, the behavior is undefined and will most likely deadlock. Now consider the following class:

<script src="https://gist.github.com/ianw3214/dba616e0acefba77a7ac99b27a158a8d.js"></script>
<noscript>
    <pre>
        class LockGuard{
        public:
            LockGuard(std::mutex& mut) : reference(mut) {
                reference.lock();
            }
            ~LockGuard() {
                reference.unlock();
            }
        private:
            std::mutex & reference;
        };
    </pre>
</noscript>

With this basic implementation of a *lock guard*, we have bound the mutex lock cycle to the lifetime of the *LockGuard* class. Now, when we try the same block of code again, we get our resources properly cleaned up:

<script src="https://gist.github.com/ianw3214/17d89f4331d9cf3b37ae355283625062.js"></script>
<noscript>
    <pre>
        std::mutex var_mutex;
        // .. Do some stuff ..
        try {
            LockGuard(var_mutex);
            throw(std::exception());
            // don't have to worry about unlocking because LockGuard will unlock mutex when it goes out of scope
        }
        catch(const std::exception& e) {
            std::cout << e.what() << std::endl;
        }
    </pre>
</noscript>

With the new implementation, the mutex is unlocked if the try block completes successfully or when an exception is thrown since the unlock is now in the destructor of a stack allocated object, which goes out of scope once program control is passed to the catch block. 

## Applying Concepts

The idea of *scope bound resource management* is not just limited to mutexes, it can be used for things like file handles, sockets, heap allocated memory, basically anything that has a clear initialize/cleanup structure. A lot of times, these things are already in the standard library, like the [*Lock Guard*](http://en.cppreference.com/w/cpp/thread/lock_guard) that we implemented above, or things like [*smart pointers*](http://en.cppreference.com/w/cpp/memory/unique_ptr). Personally, I have used this technique to code certain aspects of my game engine, consider the following texture class(taken from the engine I am currently working on):

<script src="https://gist.github.com/ianw3214/89d2447d3de1ca43d3f100a4eae559d0.js"></script>
<noscript>
    <pre>
        class Texture {

        public:
            Texture(SDL_Texture * texture);
            Texture(std::string path, SDL_Renderer * renderer);
            ~Texture();
        private:
            SDL_Texture * texture;
        };

        Texture::Texture(SDL_Texture * texture) {
            this->texture = texture;
            angle = 0;
            // get the width/height information of the texture
            SDL_QueryTexture(texture, NULL, NULL, &width, &height);
        }

        Texture::Texture(std::string path, SDL_Renderer * renderer) {
            texture = loadTexture(path, renderer);
            angle = 0;
            // get the width/height information of the texture
            SDL_QueryTexture(texture, NULL, NULL, &width, &height);
        }

        Texture::~Texture() {
            SDL_DestroyTexture(texture);
        }
    </pre>
  </noscript>

With the way I have implemented the Texture class, the SDL_Texture object held within the class will always get freed properly, because I put the DestroyTexture function into the destructor. This way, I don't have to worry about freeing the texture myself in my main programs, and leads to overall cleaner code. 

## Extra Resources

As I am not by any means an expert in C++, so I'm going to provide some more resources for extra reading. [Here](http://en.cppreference.com/w/cpp/language/raii) is the cppreference page for RAII, and [here](https://stackoverflow.com/questions/395123/raii-and-smart-pointers-in-c) is a pretty detailed stackoverflow explanation about the concept. If reading isn't your thing, [this video](https://www.youtube.com/watch?v=1ZisTEf2D7g&t=2210s) has a decent explanation as well. 

## Closing Remarks??

As this is my first technical blog post, combined with the fact that I'm not quite fluent in C++, I would greatly appreciate any feedback/criticism. Feel free to leave a comment on this post or send me an email at [ianianw21@gmail.com](mailto:ianianw21@gmail.com).