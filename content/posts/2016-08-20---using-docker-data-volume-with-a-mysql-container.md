---
title: "Using Docker Data Volume with a MySQL container"
date: "2016-08-20T00:00:00.000Z"
template: "post"
draft: false
slug: "using-docker-data-volume-with-a-mysql-container"
category: "Software Development"
tags:
  - "docker" 
  - "mysql"
description: "Based on some discussions online, they are saying that it is best to have your data used by other docker containers in a separate container which they call a 'Data Volume Container'."
socialImage: "/media/rest-kafka-mongo-microservice-draw-io.jpeg"
---
I always thought that data storage for Docker containers should always reside in the host's filesystem. But, using this implementation would have a problem since containers are meant to be run on top of any host OS which can be running on Linux, Windows, or any OS which will support Docker in the future. There is a possibility that the directory configured is not in all hosts where the container is supposed to run.

Based on some discussions online, they are saying that it is best to have your data used by other docker containers in a separate container which they call a "Data Volume Container". This approach actually makes sense since containers are supposed to be portable, your data should also be portable.

By a simple google search, it brought me to this link which is from the official Docker documentation:

https://docs.docker.com/engine/tutorials/dockervolumes/


Check out the "Creating and mounting a data volume container" section which describes how this can be done. The example is using postgres but I needed it for MySQL.

Using this reference, here are the steps for MySQL:

First, you need to create a data volume container which is pretty straightforward. 

```
$docker create -v /var/lib/mysql --name mysqldata mysql
```

I named my data volume container "mysqldata". You can choose any name you want. Make sure you take a note of it since you need to mount this container as a volume to your MySQL docker container.

Next, you need to mount the data volume container "mysqldata" when you run the MySQL container which will have MySQL running.

```
$docker run --name mysqldb --volumes-from mysqldata -e MYSQL_ROOT_PASSWORD=password -p 3307:3306 mysql
```

I named the container "mysqldb". You need to add "-p 3307:3306" to map the host port to the port of MySQL in the docker container. This was not mentioned in the official [MySQL docker image](https://hub.docker.com/_/mysql/) documentation.

After you've run the "mysqldb" container, you can access your MySQL database using MySQL workbench or any tool which you are comforable with. 

The takeaway here is that you can delete the "mysqldb" container without affecting your data in "mysqldata". To test this, create some data when you run first time and delete the "mysqldb" container. Then, run a new container "mysqldb1". 

```
$ docker run --name mysqldb1 --volumes-from mysqldata -e MYSQL_ROOT_PASSWORD=password -p 3307:3306 mysql
```

You will see that your data is intact. Some are saying that you need to ensure that you do not run multiple containers accessing a single data volume container since it could lead a data loss. Be careful with this!

Enjoy!
