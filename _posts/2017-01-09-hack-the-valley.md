---
layout: post
title: "Hack the Valley"
date: 2017-01-09
comments: true
tags: post
---

## The Hack

So I spent my weekend at Hack the Valley, a hackathon hosted at the University of Toronto Scarborough campus. This was my first hackathon, and I was in a team with three other people who were all at a hackathon at their first time. In the end, we were able to pull through and build a simple web application. It is basically an app that takes an image of food and determines how long it should be microwaved for it to be at the perfect temperature. It takes into account things that are not microwavable, like metal forks and plastic, and gives a warning if someone decides to try to microwave it. All the data is crowd sourced as well, so after enough users start using the app the data will become more accurate.

![Easy Reheat Webpage](/assets/posts/easy_reheat.jpg)

---

## The Journey

Since I went with a friend, we had a team of 2 to begin with. Neither of us had been to a hackathon before that, so our plan was to team with someone more experienced. Somehow, we managed to pick two other people who were new too, so we just went with it anyways. So it's Saturday morning, we had a team of four first year computer science students who had all never been to a hackathon before, and we had absolutely no idea what we were going to build as well. The microwave reheat idea was our first idea, but we didn't think it was possible so we moved onto different ideas. However, we stumbled onto an API called [Clarifai](https://www.clarifai.com/), which processes the computer vision for us and made everything a lot simpler. The fact that there is a food option with the API made everything go a lot smoother for us. 

We split each task among different members of the team so there would be minimal conflicts. I worked on the front end website design and implementation, we had two people working on the back end algorithms to calculate the averages using the external API, and then one person to write our own custom API with PHP. Everything is hosted with Microsoft Azure, and you can find the source code on [Github](https://github.com/junzhengca/easy-reheat).

There were also some workshops, and one that really interested me was the one about the Microsoft Bot Service. I won't get into details, but after the workshop I decided to make a messenger bot that would work with our app. I had never used Azure before, let alone the Microsoft Bot Service, and I had touched C# before either; As simple as the bot was, it was a huge challenge for me to figure out. It was a long night of reading docs and searching stack overflow, but I pulled through in the end and was able to link the bot up to our custom API. It was about 4 in the morning when we finished most of the web app as well as the bot. 

![Easy Reheat message app](/assets/posts/reheat_message.jpg)

After about half an hour of trying to nap but not being able to because of the coffee, we decided that we had enough time to fix an obvious problem with our app. In a nutshell, our data about microwave time corresponding to food was very unreliable, so we decided to look for an API or database that would handle it for us. Unfortunately, people don't love microwaves enough to have an online database of food and their microwave times. This is when we turned to the idea of basic machine learning. Instead of manually inputting and sorting foods with their microwave times, we decided to crowd source the data and have the app constantly improve it's accuracy with user feedback. 

By the next morning, we had pretty much everything figured out, so all that was left was a bit of polish/clean up on the code and design work. Of course, there are some major flaws with our app, one being the initial temperature of the food. Unless we take user input, we have no way of knowing what temperature the food starts at and so giving an accurate time would be hard. Another big problem is size. Obviously, bigger food portions would have to be microwaved for a longer amount of time, but it was very challenging to implement size detection without requiring too much more work from the user. We tried using openCV to try and calculate the size, but that would require the user to stand at a certain distance away and point the camera at a certain degree, which would be too much work for the user. One last major problem was when the user uploaded a picture of something that wasn't food but wasn't in the unmicrowavable category as well. For example, if the user took a picture of their hand, our program would think it was beer or cake or something and tell the user to microwave it for 30 seconds. 

In the end, our app idea was quite well received. People were interested in how we implemented the computer vision and the machine learning as well. It helped that we actually put our web app online, so people could go onto their own smartphone and try our the app for themselves. We also got to demo the messenger bot, but since we need Microsoft to review the bot before it could go public, we could only let people try out the bot on our phones. Our app definitely grabbed the attention of many people though, we had a pretty good crowd throughout the expo.

---

## Postmortem

The whole experience has just been phenomenal for me. Not only did I learn to use Microsoft Azure and the Microsoft Bot Service, I also learned to work in a team environment. Although we didn't win any major prize in the end, I still gained some incredible experience and made some new friends as well. We also did win a small prize for having the [most creative domain name](http://easyreheat.com/web/), so I guess that's something to be proud of! After these two days, I'm now really looking forward to Penapps which is in two weeks!

---

Check out our [Devpost Project](https://devpost.com/software/microwave-time) and our [Github Repo](https://github.com/junzhengca/easy-reheat)
