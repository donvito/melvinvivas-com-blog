---
title: "The GopherCon Singapore 2018 Experience"
date: "2018-05-05T00:00:00.000Z"
template: "post"
draft: false
slug: "gophercon-singapore-2018"
category: "software development"
tags:
  - "golang" 
description: "A few months back, I started my journey to learning Golang. I started with Tour of Go, watched videos of Todd McLeod in Youtube, and tried out examples I find in the web. I thought of sharing all these learning to anyone who wanted to learn Golang so I blogged about it here."
---

A few months back, I started my journey to learning Golang. I started with Tour of Go, watched videos of Todd McLeod in Youtube, and tried out examples I find in the web. I thought of sharing all these learning to anyone who wanted to learn Golang so I blogged about it here.

I only learn Go during my spare time, mostly during the weekends if we don't have any deployment or support activity at work. At some point, I felt this void and knew something was missing. Since most of my colleagues and friends were not into Go yet, I didn't have anyone to share and discuss my ideas. This was the same feeling I had around 15 years ago when I was starting with Java. During that time, the Philippine Java community was not active so I started PinoyJUG - a community of Filipino developers who wanted to be good at Java.

Internally, I figured that I had to do something about this feeling I had! So, I searched if I can find any community which I can share my ideas and learnings and hopefully learn from developers who are already adept with programming in Go. Not sure if it was a coincidence but my friend told me that GopherCon Singapore 2018 was coming up. I wanted to volunteer and help. Thankfully, my friend [Eman](https://twitter.com/emanpatricio), was part of the organizers and introduced me to the group. So I joined the next all-hands(meeting of organizers to plan for the event) when I was free. First all-hands was alright, I volunteered to help in the workshops even though I didn't know what to do to help out - ha ha! Anyway, they informed me that help was required on workshop days itself. It was good, I was excited!

[GopherCon Singapore 2018](https://2018.gophercon.sg/) had a few activities. 2-day workshops on May 2 to 3 and on May 4, it was the conference day.

Speaker for the 2-day workshops was [Bill Kennedy](https://twitter.com/goinggodotnet) of Ardan Labs. He did a workshop for beginners "Go Fundamentals" and "Ultimate Go" for advanced Go developers. Bill was really good and he really spent time in explaining how to do things right with Go. Since Go is natively compiled, he also spent time explaining low level topics like CPU caches. In "Go Fundamentals", he spent significant time in explaining value and pointer semantics which I believe is essential to know especially for those who are using programming languages which do not have pointers. He shared so many information and I'm sure, like me, other attendees are overwhelmed. All information he discussed are in his github repo.

https://github.com/ardanlabs/gotraining/tree/master/topics/go

![IMG_1143](/media/IMG_1143.jpeg)
![IMG_1148](/media/IMG_1148.jpeg)

[Conference Day - 4th May]
Our speakers for this year's conference were from Google, Github, GoJek, SP Digital, WeWork, Heroic Labs, Ordermentum, and Loom Networks.


We started the conference with [Sau Sheong](https://twitter.com/sausheong)'s [welcome address](https://engineers.sg/video/opening-address-gopherconsg-2018--2602). He shared interesting insights about last year's GopherCon. Last year, there were around 100 attendees and this year it was tripled - 300+ attendees! This definitely shows the increasing popularity of Go in the software development scene. 

<iframe width="860" height="615" src="https://www.youtube.com/embed/H1noO30JP98" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

![IMG_1164](/media/IMG_1164.jpeg)

In the conference, we had the privilege to hear from **[Russ Cox](https://swtch.com/~rsc/)** about [vgo](https://github.com/golang/vgo) during his opening keynote. He also has also explained [vgo in his blog](https://research.swtch.com/vgo-intro). Russ is Tech Lead for the Go Project at Google. 

<iframe width="860" height="615" src="https://www.youtube.com/embed/F8nrpe0XWRg" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

![IMG_1175](/media/IMG_1175.jpeg)
![IMG_1170](/media/IMG_1170.jpeg)
![IMG_1172](/media/IMG_1172.jpeg)

This is also my favorite of all the things Russ said! (as tweeted by Sau Sheong)

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Well said! “Tools cannot work around a lack of cooperation.” -<a href="https://twitter.com/_rsc?ref_src=twsrc%5Etfw">@_rsc</a> <a href="https://twitter.com/hashtag/GopherConSG?src=hash&amp;ref_src=twsrc%5Etfw">#GopherConSG</a> <a href="https://twitter.com/hashtag/golang?src=hash&amp;ref_src=twsrc%5Etfw">#golang</a> <a href="https://t.co/hXGhZlfEqR">pic.twitter.com/hXGhZlfEqR</a></p>&mdash; Sau Sheong (@sausheong) <a href="https://twitter.com/sausheong/status/992221106164482049?ref_src=twsrc%5Etfw">May 4, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<br/>

[Bill Kennedy](https://twitter.com/goinggodotnet) also gave a talk about "Optimizing for Correctness". Like what he said, anyone can be affected by the software we develop - can even cost a life - so we should do be mindful of the software we develop and do it right! 

<iframe width="860" height="615" src="https://www.youtube.com/embed/5DCdjxhBpTw" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

![IMG_1200](/media/IMG_1200.jpeg)

We also heard from [Hana Kim](https://twitter.com/belbaoverhill) - a member of the Go team in Google. She discussed how to understand Go programs using built-in tools in the Go toolkit. Really amazed by Hana's technical talk. Really love seeing a lot of tracing tools and profiling tools built-in with Go. Apologies with the pic as I was too engrossed listening to her talk :)

<iframe width="860" height="615" src="https://www.youtube.com/embed/FJQjUueBJ2A" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

![IMG_1178](/media/IMG_1178.jpeg)

[Steve Kruger](https://twitter.com/stephen_kruger) of Grab, had an interesting talk about the journey with Go. Here's a glimpse of what can be done in 3 years, amazing! That's from 50K nodejs lines of code to 0! We can see a pattern here. Not sure if nodejs developers should be worried! :)

<iframe width="860" height="615" src="https://www.youtube.com/embed/L688sHqXL2A" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

![IMG_1184](/media/IMG_1184.jpeg)

We also had [Katrina Owen](https://twitter.com/kytrinyx) of Github. She discussed how the improved an application they developed from within Github.

<iframe width="860" height="615" src="https://www.youtube.com/embed/lp_ST9nbf5M" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

![IMG_1202](/media/IMG_1202.jpeg)

[Yeo Kheng Meng](https://twitter.com/yeokm1) of SP Digital discussed how compilers can be compromised, very cool. Key takeaway is - Never trust anyone but yourself! ha ha! :D

<iframe width="860" height="615" src="https://www.youtube.com/embed/T82JttlJf60" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

![IMG_1214](/media/IMG_1214.jpeg)

In the closing keynote, [Ajey Gore](https://twitter.com/AjeyGore), Go Jek's Group CTO, shared insights about the culture and values in GoJek.  Other organizations can definitely learn from what they are currently doing.

<iframe width="860" height="615" src="https://www.youtube.com/embed/XpefzqEsvjc" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

![IMG_1218](/media/IMG_1218.jpeg)
![IMG_1223](/media/IMG_1223.jpeg)

I also had the opportunity to meet fellow Filipinos during the event. In this pic is one of our speakers, [Beverly Dolor](https://www.linkedin.com/in/bevdolor/) of WeWork.
![IMG_1228](/media/IMG_1228.jpeg)

I also met [Andre Tanner](https://twitter.com/kzapkzap), CTO of galleon.ph - who traveled from Manila and attended the event. Also here is my colleague [Marvin Pascual](https://twitter.com/bintut) and former colleague, [Oscar Garcia](https://twitter.com/kzapkzap).
![IMG_1198](/media/IMG_1198.jpeg)

After the conference, we had the opportunity to meet new friends at the after-party in Erwin's Gastro Bar. 

![IMG_1242](/media/IMG_1242.jpeg)

It was a tiring but fun day for me. I am seeing some momentum in Golang adoption and this is definitely refreshing. It is also humbling since I can see that I have tons of catching-up to do. There is so much more to learn!!! 

Special thanks to [Sau Sheong](https://twitter.com/sausheong), [Eman Patricio ](https://twitter.com/emanpatricio)and all my co-volunteers for giving me the opportunity to help with GopherCon Singapore 2018!  Cheers!

[Me](https://twitter.com/donvito) w/ [Russ Cox](https://twitter.com/_rsc)
![IMG_1204](/media/IMG_1204.jpeg)

[Me](https://twitter.com/donvito) w/ [Bill Kennedy](https://twitter.com/goinggodotnet)
![IMG_1206](/media/IMG_1206.jpeg)

[Me](https://twitter.com/donvito) w/ [Katrina Owen](https://twitter.com/kytrinyx)
![IMG_1211](/media/IMG_1211.jpeg)

![IMG_1244](/media/IMG_1244.jpeg)

> Missed the Conference? No worries! [engineers.sg](https://engineers.sg) covered the event and videos are available [in this link](https://engineers.sg/organization/gopherconsg). Enjoy! :)

> A few speaker decks can be [downloaded from github](https://github.com/donvito/gopherconsg2018/tree/master/speakerdecks)


See you next year! 

---
P.S. 
For updates, you can follow my blog and Twitter **[@donvito](https://twitter.com/donvito)**. Most of my tweets are about Docker, Kubernetes, GoLang, Cloud, DevOps, Agile and Startups. I also share code in my **[GitHub](https://github.com/donvito)**.  If you want to know more about what I do, please add me in **[LinkedIn](https://www.linkedin.com/in/melvinvivas/)**. I recently started a new [youtube channel](https://www.youtube.com/channel/UCi6RVSV8s9Yy2Qg3WcGq9cg) - I upload some tutorials there. Check it out!