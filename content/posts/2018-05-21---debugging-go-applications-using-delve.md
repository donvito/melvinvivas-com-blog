---
title: "Debugging Go applications using Delve"
date: "2018-05-21T00:00:00.000Z"
template: "post"
draft: false
slug: "debugging-go-applications-using-delve"
category: "Software Development"
tags:
  - "golang" 
  - "delve"
  - "debugging"
description: "Learn how to Debug your Golang applications using Delve."
socialImage: "/media/rest-kafka-mongo-microservice-draw-io.jpeg"
---

A colleague of mine said that...

> "You are not a real programmer if you don't know how to debug your applications!"

Oh well, that is true! If you don't know how to debug your applications, then you can't build better software. 

Debugging applications has been easier with the help of IDEs. One popular and very good IDE for Go is [Goland](https://www.jetbrains.com/go/) by Jetbrains, same company who developed IntelliJ for Java developers and Webstorm for web/javascript developers.

[gdb](https://golang.org/doc/gdb) can be used for debugging Go applications but according to the golang website, [delve](https://github.com/derekparker/delve) is even better. 

> Note that Delve is a better alternative to GDB when debugging Go programs built with the standard toolchain. It understands the Go runtime, data structures, and expressions better than GDB. 

Since the golang developers recommended Delve, I took it for a spin and see how it can be used to create better software built with Go.

Here's a list of available commands in delve
![Screenshot-2018-05-21-00.26.57](/media/Screenshot-2018-05-21-00.26.57.png)

I thought of blogging about it but I felt it was better to show a demo of it. Here is the recording I did to showcase delve's awesomeness!

## Here's the demo (best viewed in full screen mode)
<iframe width="860" height="615" src="https://www.youtube.com/embed/qFf2PRSfBlQ" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

### Sample code I used for the demo
<iframe 
    width="860" height="840"  
    frameBorder="0"
    src="data:text/html;charset=utf-8,
    <head><base target='_blank' /></head>
    <body><script src='https://gist.github.com/donvito/acd6689c820be2c43ca4f2bed8bba524.js'></script>
    </body>"></iframe>

Delve commands you can try out

```
(dlv) help
(dlv) break main.go:29
(dlv) break main.go:31
(dlv) breakpoints
(dlv) continue
(dlv) print family
(dlv) n
(dlv) print family
```

Output will look like this
![2018-05-21_22-26-35](/media/2018-05-21_22-26-35.png)