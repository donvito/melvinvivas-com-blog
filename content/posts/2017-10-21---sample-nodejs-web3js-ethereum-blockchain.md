---
title: "Sample NodeJS app to query the Ethereum blockchain"
date: "2017-10-21T00:00:00.000Z"
template: "post"
draft: false
slug: "sample-nodejs-web3js-ethereum-blockchain"
category: "Software Development"
tags:
  - "nodejs" 
  - "ethereum"  
  - "dapps"
description: "Create a NodeJS app to query the Ethereum blockchain"
---

Had a discussion last night with some friends and was really curious how to develop applications utilising blockchain technology. I found the Ethereum API a few months back but I was not clear on how to start until last night.

Eric, a former colleague, blogged about a sample on how to do it in Java using Spring Boot and Thymeleaf. One key thing in his blog was the use of the [Infura API](https://infura.io/index.html) rather than spinning up a node to communicate with the Ethereum blockchain. Check out his blog  ["My first foray into the world of blockchain"](https://www.linkedin.com/pulse/my-first-foray-world-blockchain-eric-obias/).

Inspired by all of this, I tried web3js which Eric suggested. [web3js](https://github.com/ethereum/web3.js/), an Ethereum Javascript API, is developed by the Ethereum team. I came up with a basic nodeJS sample below using web3js. It's basically the nodeJS version of what Eric has done in his [blog](https://www.linkedin.com/pulse/my-first-foray-world-blockchain-eric-obias/). Really simple stuff but I needed to figure out things for a few hours to get it running. 

```javascript
require('dotenv').config();
var BigNumber = require('bignumber.js');
var Web3 = require('web3')

var web3 = new Web3(new Web3.providers.HttpProvider(process.env.API_URL));

var balance = web3.eth.getBalance(process.env.ACCOUNT, function (error, result) {
    if (!error) {
	console.log(web3.utils.fromWei(new BigNumber(result), 'ether'));
    } else {
      console.error(error);
    }
  });
```


Source code is available in my github
https://github.com/donvito/web3js-samples

##Steps to run the sample app

1. Install all dependencies using npm

```
npm install
```

2. Configure. Create a .env file with the ff. contents. You can register in https://infura.io/index.html to get an API URL with an access key. Infura can save you the hassle of spinning up your own node. Account configured below is Ethereum's founder Vitalik Buterin's account. (got this from Eric's [blog](https://www.linkedin.com/pulse/my-first-foray-world-blockchain-eric-obias/))

```
API_URL=https://mainnet.infura.io/<access key>
ACCOUNT=0xab5801a7d398351b8be11c439e05c5b3259aec9b
```

You can also get some accounts to query here
https://etherscan.io

3. And finally, run the application
```
node index.js
```

![Screenshot-2017-10-21-18.33.25](/media/Screenshot-2017-10-21-18.33.25.png)

Check if the result is the same as the current value
https://etherscan.io/address/0xab5801a7d398351b8be11c439e05c5b3259aec9b

![Screenshot-2017-10-21-21.15.50](/media/Screenshot-2017-10-21-21.15.50.png)

Some references:
https://github.com/ethereum/web3.js
https://blog.infura.io/getting-started-with-infura-28e41844cc89
https://etherscan.io/
https://www.linkedin.com/pulse/my-first-foray-world-blockchain-eric-obias/
https://github.com/MikeMcl/bignumber.js/
https://github.com/ethereum/wiki/wiki/JavaScript-API
https://web3js.readthedocs.io/en/1.0/web3-utils.html#towei

This video by [Conor Svensson](https://twitter.com/conors10), founder of [web3j](https://web3j.io/) can be useful to get you up to speed on understanding Blockchain.

<iframe width="760" height="515" src="https://www.youtube.com/embed/ea3miXs_P6Y" frameborder="0" allowfullscreen></iframe>

<br/>
If you have any questions about the sample application or have some ideas about blockchain, feel free to start a discussion below.
<br/><br/>
Cheers!


