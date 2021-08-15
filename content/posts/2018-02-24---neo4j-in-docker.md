---
title: "My First Experience with Neo4J - running in Docker"
date: "2018-02-24T00:00:00.000Z"
template: "post"
draft: false
slug: "neo4j-in-docker"
category: "Dev Ops"
tags:
  - "neo4j" 
  - "docker"  
description: "Running Neo4J Graph Database in Docker"
---

I was looking for a way to visualise/document our network topology in Docker. While I was doing my research, I saw that Neo4J can be used to do this.  Neo4J is an open-source [graph database](https://en.wikipedia.org/wiki/Graph_database). It is mostly used for data science/engineering to model relationships between entities/nodes. I initially thought that this is just useful for business data but looks like it can also be used to document the network as well.

Here is an example which I found from their website
https://neo4j.com/graphgist/network-dependency-graph

I don't have experience with Neo4J but I gave it a spin. I tried the online sandbox first. The online sandbox is similar to Play With Docker, no installation is required. You can acccess the Neo4J sandbox here.

https://neo4j.com/sandbox-v2/?ref=hcard

The online sandbox was a bit slow so I looked for a Docker image for it so I can run it in my laptop. Neo4J has an official docker image in dockerhub.

https://hub.docker.com/_/neo4j/

Running Neo4J was pretty straightforward.
```
docker run \
    --publish=7474:7474 --publish=7687:7687 \
    --volume=$HOME/neo4j/data:/data \
    --rm -d neo4j
```

![Screenshot-2018-02-23-23.50.39](/media/Screenshot-2018-02-23-23.50.39.png)

Once the Neo4J container is running, you can access it using this URL http://localhost:7474/browser/

![Screenshot-2018-02-23-23.51.50](/media/Screenshot-2018-02-23-23.51.50.png)

Surprisingly, even with no experience, I was able to create my first database. Syntax was not that difficult(of course for the basic queries!) and the documentation was easy to understand.

Some references which I used:
* https://neo4j.com/docs/developer-manual/current/cypher/clauses/create/#create-create-single-node
* https://neo4j.com/docs/developer-manual/current/get-started/cypher/#cypher-intro-patterns-node-syntax
* https://neo4j.com/docs/developer-manual/current/cypher/syntax/patterns/#cypher-pattern-relationship

Since Neo4J was about understanding relationships between entities, to learn it, I thought of modeling my relationships(family and friends) first.

Here is the script I developed, you can just copy and paste this script in the Neo4J browser's query window.

```
CREATE (melvin:Person { name: 'Melvin'})
CREATE (raye:Person { name: 'Raye'})
CREATE (katherina:Person { name: 'Katherina'})
CREATE (vito:Person { name: 'Vito'})
CREATE (scb:Company { name: 'SCB'})
CREATE (dbs:Company { name: 'DBS'})
CREATE (olx:Company { name: 'OLX'})
CREATE (chai:Company { name: 'CHAI CHIPS'})
CREATE (sg:Country { name: 'Singapore'})
CREATE (ph:Country { name: 'Philippines'})
CREATE (marvin:Person { name: 'Marvin'})
CREATE (jon:Person { name: 'Jon'})
CREATE (joy:Person { name: 'Joy'})
CREATE (jp:Person { name: 'JP'})

CREATE
  (katherina)-[:CHILD_OF]->(melvin),
  (katherina)-[:CHILD_OF]->(raye),
  (vito)-[:CHILD_OF]->(melvin),
  (vito)-[:CHILD_OF]->(raye),
  (melvin)-[:SPOUSE]->(raye),
  (melvin)-[:WORKS_AT]->(scb),
  (jon)-[:WORKS_AT]->(scb),
  (marvin)-[:WORKS_AT]->(scb),
  (raye)-[:WORKS_AT]->(dbs),
  (joy)-[:WORKS_AT]->(olx),
  (jp)-[:OWNER_OF]->(chai),
  (jp)-[:SPOUSE]->(joy),
  (dbs)-[:COMPANY_IN]->(sg),
  (scb)-[:COMPANY_IN]->(sg),
  (olx)-[:COMPANY_IN]->(ph),
  (chai)-[:COMPANY_IN]->(ph),
  (melvin)-[:KNOWS]->(jon),
  (melvin)-[:KNOWS]->(marvin),
  (raye)-[:KNOWS]->(joy),
  (melvin)-[:KNOWS]->(jp),
  (melvin)-[:KNOWS]->(joy)
```

Once it is successfully executed, you can visualise the relationships. Here is a zoomed in view of the data I created.
![Screenshot-2018-02-23-23.47.28](/media/Screenshot-2018-02-23-23.47.28.png)

Isn't that awesome? :)

Now that I have some experience with it, I'll see how we can use it for our network diagrams at work.

---

*For more updates, you can follow my blog and Twitter [@donvito](https://twitter.com/donvito). Most of my tweets are about Docker, Kubernetes, GoLang, Cloud, DevOps, Agile and Startups. I also share code in my [GitHub](https://github.com/donvito). If you want to know more about what I do, please add me in [LinkedIn](https://www.linkedin.com/in/melvinvivas/). I recently started a new [youtube channel](https://www.youtube.com/channel/UCi6RVSV8s9Yy2Qg3WcGq9cg) - I upload some tutorials there. Check it out!*

