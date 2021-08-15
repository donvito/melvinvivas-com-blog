---
title: "Docker Stack with the official ElasticSearch, Kibana"
date: "2017-09-24T00:00:00.000Z"
template: "post"
draft: false
slug: "docker-stack-with-the-official-elasticsearch-kibana"
category: "Dev Ops"
tags:
  - "docker"  
  - "elasticsearch" 
  - "kibana"   
description: "Run the official ElasticSearch, Kibana using Docker Stack"
---

I've added demo docker stack my [github](https://github.com/donvito/dockerstack/blob/master/demo-project-stack.yml). For this stack I've set my memory allocation for Docker to 8gb because ElasticSearch is using a significant amount of memory. Initially I had it set to 2gb but ElasticSearch does not even start! You can try 4gb first and see.

Anyway, included in the stack are the ff.:

- ElasticSearch 5.6.1 (official one with xpack disabled)
- Kibana 5.6.1 (disabled xpack and created a custom image)
- Sample SpringBoot microservice
- MongoDB - latest
- Portainer - latest

Download the compose file in my [github] (https://github.com/donvito/dockerstack/blob/master/demo-project-stack.yml) repo. 

```
version: "3.1"
services:

  elasticsearch:
    image: 'docker.elastic.co/elasticsearch/elasticsearch:5.6.1'
    ports:
      - "9200:9200"
      - "9300:9300"
    volumes:
      - elasticdata:/usr/share/elasticsearch/data 
    networks:
      - backend
    deploy:
      replicas: 1
    environment:
      - xpack.security.enabled=false      

  kibana:
    image: 'melvindave/kibana:5.6.1'
    ports:
      - "5601:5601"
    networks:
      - backend
    depends_on:
      - elasticsearch    
    deploy:
      replicas: 1    
  
  portainer:
    image: portainer/portainer
    ports:
      - 9000:9000
    volumes:
      - "/var/run/docker.sock:/var/run/docker.sock"
      - "portainerdata:/data"
    networks:
      - frontend  
    deploy:
      placement:
        constraints: [node.role == manager]

  ms1:
    image: melvindave/spring-boot-example
    ports: 
      - "8080:8080"
    networks:
      - backend
    depends_on: 
      - mongodb
    deploy:
      replicas: 1

  mongodb:
    image: mongo
    ports: 
      - "27017:27017"
    volumes:
      - "mongodata:/data/db"
    networks:
      - backend  
    deploy:
      replicas: 1    

networks:
  frontend:
  backend:

volumes:
   mongodata:
   portainerdata:
   ```
 
I had to build a [custom docker image of Kibana](https://hub.docker.com/r/melvindave/kibana/) based on the [official one](https://www.elastic.co/guide/en/kibana/current/_configuring_kibana_on_docker.html) due to this [bug](https://github.com/elastic/kibana-docker/issues/27). The workaround was to remove xpack to disable authentication. I tried to add this for Kibana but it didn't work. It did work for ElasticSearch though.

![alt](/media/Screenshot-2017-09-24-03.12.00.png)

Just do a `docker pull melvindave/kibana` if you want to try it out. Otherwise, you can use the docker compose definition.

![alt](/media/Screenshot-2017-09-24-03.10.53.png)

You can copy the updated compose file from my github repo.

https://github.com/donvito/dockerstack/blob/master/demo-project-stack.yml



