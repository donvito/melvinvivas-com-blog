---
title: "Getting Started with Strapi Headless CMS"
date: "2021-11-06T00:00:00.000Z"
template: "post"
draft: false
slug: "getting-started-strapi-headless-cms-jamstack"
category: "software development"
tags:
  - "headless cms"
  - "strapi" 
description: "Trying out Strapi, a Headless CMS"
---
I am looking for a content management system to use for a new personal site I am building. Since I wanted to use the [Jamstack](https://jamstack.org) architecture, I thought of using a headless CMS and [Gatsby](https://www.gatsbyjs.com), a [static site generator](https://www.gatsbyjs.com/docs/glossary/static-site-generator), for the frontend . Strapi is the most popular headless CMS according to Jamstack.

> https://jamstack.org/headless-cms
![screenshot](/media/Screenshot from 2021-11-06 15-03-54.png)

While doing my research, I came accross [Strapi](https://strapi.io). It looks like it's gaining popularity in terms of the headless space. Strapi is open source and is very popular in Github. As of today, it has 40,700 stars.

> https://github.com/strapi/

Here are the features of the open source community edition.

![screenshot](/media/Screenshot from 2021-11-06 14-52-53.png)

I asked around in LinkedIn and it looks like no one from my network has been using it yet. So I just tried it to see how it is.

### Installing Strapi

Installing Strapi was pretty straightforward, you can follow the guide below:

https://strapi.io/documentation/developer-docs/latest/setup-deployment-guides/installation/cli.html

First, you need to install nodejs, I installed node v14.18.1 which is the recommended version of Strapi. Strapi still does not support the latest LTS version so take note of that. Anyway, when you run the installation, it will let you know of this limitation. On a developer point of view, letting us know of the limitation of which nodejs it supports is very important so we don't encounter unexpected issues later on when using other versions.


### Installation
You can install strapi using this command.
```
npx create-strapi-app my-project
```

If you are using Yarn, this will work too.
```
yarn create strapi-app my-project
```

![screenshot](/media/Screenshot from 2021-11-06 13-12-34.png)

After installation, Strapi will ask you to create a super admin account which you will use to manage your CMS.

To test Strapi functionality, I created a new collection type called Post.  
![screenshot](/media/Screenshot from 2021-11-06 15-12-13.png)

The Post collection type has the ff. fields:

* title
* description
* datePublished
* coverPhoto

Here are the different field types Strapi supports. It even supports JSON as a field type!
![screenshot](/media/Screenshot from 2021-11-06 13-57-59.png)

After you've created a new Collection Type, you can add data into it. Adding new content is very easy and it is pretty similar to traditional CMS like Wordpress. 

![screenshot](/media/Screenshot from 2021-11-06 14-04-20.png)

![screenshot](/media/Screenshot from 2021-11-06 14-04-03.png)

### REST API

So now we've added data and since this is a headless CMS, how do we serve the data. Strapi supports REST API off the bat. So how do we access the API? To make it more convenient to see which REST APIs are available, I installed the Documentation Plugin which enables a Swagger documentation for all the REST APIs available.

![screenshot](/media/Screenshot from 2021-11-06 12-23-22.png)

Once you've installed the Documentation plugin, your CMS now has API documentation. Isn't that cool?! If you noticed, the Swagger documentation shows that I already have enpoints for the Post collection type.

![screenshot](/media/Screenshot from 2021-11-06 14-13-07.png)

To use the Swagger documentation, you can retrieve your jwt token from the Documentation section in Strapi.
![screenshot](/media/Screenshot from 2021-11-06 14-15-06.png)

Use the jwt token to Authorize Swagger.
![screenshot](/media/Screenshot from 2021-11-06 14-21-26.png) 

Voila! We can now retrieve our Post data from Strapi!
![screenshot](/media/Screenshot from 2021-11-06 12-24-39.png) 


### GraphQL

What if I want GraphQL? Good news! There's another plugin which can easily enable that! Go back to the Marketplace and install the GraphQL plugin.
![screenshot](/media/Screenshot from 2021-11-06 12-23-22.png)

Once you've installed the plugin, you can access the GraphQL client in http://localhost:1337/graphql. You need to add the jwt token in the HTTP header of the GraphQL client to be able to access the GraphQL API.
![screenshot](/media/Screenshot from 2021-11-06 12-19-50.png)

Woah! That was actually pretty easy! I didn't even have to code anything to enable the REST and GraphQL APIs!

### First impressions

Strapi seems to be easy to install and configure. The convenience of enabling REST and GraphQL API access to your data in the CMS using plugins is really very cool! The project's documentation is also good but I didn't really need to refer from it since the tool in itself is easy to use. It seems that there's a lot of community support for it and this is a good sign if you plan in using it for your content management needs. Although the interface is not rich as Wordpress or Drupal, it is good enough to add initial data. Since it is a headless CMS, most of your data can be populated using APIs anyway. Maybe at some point, someone will develop a very rich content editor interface, let's see. 

If you need some way to store content and server it easily, I think Strapi is good enough for that purpose. There are some limitations to the community edition I used regarding access management so this needs to be taken into consideration when you wish to use it for your organisation. There are paid plans which you can consider which unlocks more features if you're really keen into considering it.

If you think my article is helpful to you, you can connect with me in **[Twitter](https://twitter.com/donvito)**, **[LinkedIn](https://www.linkedin.com/in/melvinvivas/)** or **[GitHub](https://github.com/donvito)**.

Cheers!

Melvin















