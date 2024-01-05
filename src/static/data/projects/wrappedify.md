---
title: Wrappedify
date: 2021-12-26
tags: ['Express', 'Svelte', 'BullMQ', 'Data', 'Spotify']
tagline: Spotify Wrapped, but on the the go.
image: 'wrappedify.png'
---

_Wrappedify_ is a cool data application I worked on which, as the name suggests,
is an on-the-go version of [Spotify Wrapped](https://en.wikipedia.org/wiki/Spotify_Wrapped).
Like others, I felt that waiting an entire year to see my listening was just too long. The application
allows users to upload their Spotify data and view a personalized summary of their
listening behaviours — every music junkie's dream.

It uses a Express.js backend to parse a user's information with SvelteKit powering a responsive frontend.
Redis and BullMQ are used for asynchronous data processing. The data dashboard provides robust
visualisations of listening history, made using [D3.js](https://d3js.org).

This project was one of my first fully functioning programming projects, helping me learn a lot about
client-server architecture, web development, and much more. I recently rewrote the site to sort out some
quirks so be sure to check it out!

**Links: [GitHub](https://github.com/msohaill/wrappedify),
[Website](https://wrappedify.vercel.app)**
