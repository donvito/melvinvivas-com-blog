---
title: "How to run HashiCorp Vault (Secrets Management) in Docker"
date: "2018-04-29T00:00:00.000Z"
template: "post"
draft: false
slug: "secrets-management-using-docker-hashicorp-vault"
category: "Software Development"
tags:
  - "vault" 
  - "hashicorp"
  - "security"
description: "How to run HashiCorp Vault (Secrets Management) in Docker"
socialImage: "/media/rest-kafka-mongo-microservice-draw-io.jpeg"
---

How do you keep your secrets? Probably, you would want to lock them up in a vault and keep your keys in a safe place! 

What are secrets? Here are some examples:

* Login credentials to systems
* Credentials used by applications to connect to other systems like databases
* API keys 

It is very important to keep all these information secure! 

One of the most popular solutions to secrets management is [HashiCorp's Vault](https://www.vaultproject.io/). HashiCorp is the same company who brought as [Vagrant](https://www.vagrantup.com/), a tool which makes it easy to re-create environments using Virtual Machines. They are also the developers of [Terraform](https://www.terraform.io/) which enables developers and operations to re-create infrastructure with code.

Back to Secrets...

Containerisation using [Docker](https://www.docker.com/), [Kubernetes](https://kubernetes.io/), or [Mesos](http://mesos.apache.org/) has been very popular nowadays.  Secrets management is very essential in a distrbuted environment such as these. Imagine an application run as a container which requires access to a production database. You wouldn't want to keep those database credentials in the application configuration! Some implementations centralise their configuration in using Spring Cloud Config server or Zookeeper, a few of the popular configuration servers. Keeping it centralised even makes it worse since you just need to breach the centralized configuration server then! 

Regardless if you have the configuration inside the application or externalised, these credentials needs to be secure. This is where Vault comes into the picture. Although this tutorial does not go that deep yet, it will give you an idea about how to setup Vault using a backend storage. Backend storage is where encrypted secrets are persisted. For simplicity, I'll use the filesystem as a backend storage in the example. There are several [backend storage supported by Vault](https://www.vaultproject.io/docs/configuration/storage/index.html).

I'll assume that you have Docker installed since we'll be using Vault's official docker image.
 
Let's start!

First, create a vault directory which will store vault data. Remember to take note of this directory since we'll be doing a bind mount this directory to the docker container we will create later.

```
/Users/melvin/Documents/mydata/vault
```

Also create a config directory. This is where we'll put the configuration which Vault will use.

```
/Users/melvin/Documents/mydata/vault/config
```

Next, create a configuration named local.json. Copy the contents below and save it into the local.json file.

```
{
	"listener": [{
		"tcp": {
			"address": "127.0.0.1:8200",
			"tls_disable" : 1
		}
	}],
	"storage" :{
		"file" : {
			"path" : "/vault/data"
		}
	}
	"max_lease_ttl": "10h",
	"default_lease_ttl": "10h",
}
```
This is written in json but you can use [HCL](https://github.com/hashicorp/hcl) as well. For demonstration purposes, we disable tls.

Then, save it in this directory
```
/Users/melvin/Documents/mydata/vault/config
```

Next, you need to run a container using the Vault docker image. Bind mount the directory created earlier. I did a shortcut here by automatically going inside the container after spinning it up.

```
docker exec -it $(docker run -d -v /Users/melvin/Documents/mydata/vault:/vault --cap-add=IPC_LOCK vault server) /bin/sh
```

Once you're inside the container, you need to do the ff. before you can add a secret to the Vault.

Execute this so you can communicate with the Vault API.
```
export VAULT_ADDR='http://127.0.0.1:8200'
```

Initialise vault

```
vault init
```

Check the vault server's status
```
vault status
```

Here is how it will look like in your terminal

![Screenshot-2017-11-11-16.33.26](/media/Screenshot-2017-11-11-16.33.26.png)

Keep the unseal keys and initial root token. Let's unseal the vault so we can start keeping our secrets!  We need to unseal the vault using at least 3 keys. Make sure you use the keys generated in your setup.
```
vault unseal "Unseal Token 1"
vault unseal "Unseal Token 2"
vault unseal "Unseal Token 3"
```

![Screenshot-2017-11-11-16.36.25](/media/Screenshot-2017-11-11-16.36.25.png)

Before we can store our secrets, we need to authenticate
```
vault auth <Initial Root Token>
```

![Screenshot-2017-11-11-16.39.36](/media/Screenshot-2017-11-11-16.39.36.png)

Now, Vault is ready!

Let's keep our mysql database credentials(username & password) in Vault

```
vault write secret/mysql_database_credentials username=user1 password=userpasssword888
```

![Screenshot-2017-11-11-16.45.57](/media/Screenshot-2017-11-11-16.45.57.png)

Let's see if these credentials are really saved in Vault.

```
vault read secret/mysql_database_credentials
```


![Screenshot-2017-11-11-16.47.37](/media/Screenshot-2017-11-11-16.47.37.png)

Yey! If you noticed, you can also read the secret in json format by using the -format=json argument.

```
vault read -format=json secret/mysql_database_credentials
```

Once you're done saving, we can now seal the vault.

```
vault seal
```

![Screenshot-2017-11-11-16.51.29](/media/Screenshot-2017-11-11-16.51.29.png)

Once vault is sealed, you cannot write or read from it anymore.

If you are using [Spring Boot](https://projects.spring.io/spring-boot/), [here is a library](https://github.com/spring-cloud/spring-cloud-vault) which you can use to integrate Spring Boot microservices with Vault.


That's it! Hope you like the article! Please feel free to comment below.

Let's connect in [LinkedIn](https://www.linkedin.com/in/melvinvivas/),  [Twitter](https://twitter.com/donvito) and [github](https://github.com/donvito)! 

References:
* https://hub.docker.com/_/vault/
* https://www.vaultproject.io/docs/configuration/storage/filesystem.html