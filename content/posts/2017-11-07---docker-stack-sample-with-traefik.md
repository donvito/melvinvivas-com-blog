---
title: "Docker Stack with Traefik"
date: "2017-11-07T00:00:00.000Z"
template: "post"
draft: false
slug: "docker-stack-sample-with-traefik"
category: "Dev Ops"
tags:  
  - "docker"  
  - "traefik" 
description: "Run Traefik using docker-stack"
---

I've created a simple docker stack to demonstrate [Traefik](https://traefik.io/)

> Træfik (pronounced like traffic) is a modern HTTP reverse proxy and load balancer made to deploy microservices with ease. It supports several backends (Docker, Swarm mode, Kubernetes, Marathon, Consul, Etcd, Rancher, Amazon ECS, and a lot more) to manage its configuration automatically and dynamically. 
> 
>   Source: https://traefik.io/

We'll use Docker Swarm as the backend in this example.

Save the compose file below as **traefik-stack.yml**. You can also download it from my [github repo](https://github.com/donvito/dockerstack/blob/master/traefik-stack.yml)

```
version: "3.3"
services:
  traefik:
    image: traefik
    command: --web \
      --docker \
      --docker.swarmmode \
      --docker.domain=traefik \
      --docker.watch \
      --logLevel=DEBUG
    networks:
      - traefik-net
    ports:
      - "80:80"
      - "8080:8080"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - /dev/null:/traefik.toml
    deploy:
      placement:
        constraints: [node.role==manager]

  portainer:
    image: portainer/portainer
    volumes:
      - "/var/run/docker.sock:/var/run/docker.sock"
      - "portainerdata:/data"
    networks:
      - traefik-net
    deploy:
      placement:
        constraints: [node.role == manager]
      labels:
        - "traefik.enable=true"
        - "traefik.port=9000"
        - "traefik.docker.network=mystack_traefik-net"
        - "traefik.frontend.rule=Host:portainer.traefik"

  ms1:
    image: melvindave/spring-boot-example
    networks:
      - traefik-net
    depends_on:
      - mongodb
    deploy:
      replicas: 1
      labels:
        - "traefik.enable=true"
        - "traefik.port=8080"
        - "traefik.docker.network=mystack_traefik-net"
        - "traefik.frontend.rule=Host:ms1.traefik"

  mongodb:
    image: mongo
    volumes:
      - "mongodata:/data/db"
    networks:
      - traefik-net
    deploy:
      replicas: 1
    ports:
      - "27017:27017"  

networks:
  traefik-net:

volumes:
   mongodata:

```

To run this stack, you need to use Swarm Mode. Once you have a cluster, execute this command.

```
docker stack deploy -c traefik-stack.yml mystack
```


Add these domain names in your hosts file to simulate DNS resolution, change the IP ==192.168.1.9== with your Swarm manager's IP address.
```
192.168.1.9	portainer.traefik ms1.traefik mongo.traefik
```

==192.168.1.9== your Swarm manager's IP address

Once the stack has been deployed, you can access Traefik's web console at
http://192.168.1.9:8080

![Screenshot-2017-11-07-00.01.17](/media/Screenshot-2017-11-07-00.01.17.png)

All traffic to the backend services can now be routed using port 80

```
http://portainer.traefik --> portainer service running on port 8080
```
![Screenshot-2017-11-07-00.37.04](/media/Screenshot-2017-11-07-00.37.04.png)

```
http://ms1.traefik --> ms1 service running on port 9000
```
![Screenshot-2017-11-07-00.37.21](/media/Screenshot-2017-11-07-00.37.21.png)

To cleanup, since we're using docker stack, it is just one command

```
docker stack rm mystack
```

I'm not a network expert so if you see something wrong with the demo, let me know!

References:
- https://docs.traefik.io/user-guide/swarm-mode/
- https://github.com/containous/traefik/issues/1388