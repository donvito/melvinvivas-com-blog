---
title: "How to Encrypt and Decrypt Data using Golang and AES"
date: "2020-03-13T00:00:00.000Z"
template: "post"
draft: false
slug: "how-to-encrypt-and-decrypt-data-using-aes"
category: "Software Development"
tags:
  - "golang" 
  - "security"
description: "Learn to encrypt and encrypt data using Golang and AES"
---

I've been exploring how to secure GET URLs without having to resort to sending authorization headers. So I thought of exploring of passing an encrypted api key in the URL itself. I did some research and what I think I need is a symmetrical way of encrypting and decrypting data. Meaning, I should be able to encrypt the data and send to the consumer and when the encrypted data is sent back to the server, I should be able to decrypt it. I did some research and found that the crypto aes package in the golang standard library will work for my requirements.

The first step is to generate a 32 byte key which we'll use to encrypt and decrypt data. https://golang.org/pkg/crypto/aes/#NewCipher

![screenshot](/media/Screenshot-2020-03-14-22.16.54.png)

Since in real world applications, you need to save the key somewhere(like saving it to Hashicorp's Vault), I encoded the key to string for this purpose.

```
bytes := make([]byte, 32) //generate a random 32 byte key for AES-256
if _, err := rand.Read(bytes); err != nil {
	panic(err.Error())
}

key := hex.EncodeToString(bytes) //encode key in bytes to string for saving
```

### Encryption

To encrypt data, we need the ff.:

- key (32-bytes for AES-256 encryption)
- nonce (a random no., only used only once)
- data to encrypt - plaintext in this example

Since the key is in string, we need to convert decode it to bytes.
```
key, _ := hex.DecodeString(keyString)
plaintext := []byte(stringToEncrypt)
```

Create a new Cipher Block from the key.
```
block, err := aes.NewCipher(key)
```

Create a new GCM - https://en.wikipedia.org/wiki/Galois/Counter_Mode
```
aesGCM, err := cipher.NewGCM(block)
```

Create a nonce. Nonce should be from GCM.
```
nonce := make([]byte, aesGCM.NonceSize())
```

Encrypt the data using the GCM Seal function.
```
ciphertext := aesGCM.Seal(nonce, nonce, plaintext, nil)
```

Here's how the encrypt function looks like.
```
func encrypt(stringToEncrypt string, keyString string) (encryptedString string) {

	//Since the key is in string, we need to convert decode it to bytes
	key, _ := hex.DecodeString(keyString)
	plaintext := []byte(stringToEncrypt)

	//Create a new Cipher Block from the key
	block, err := aes.NewCipher(key)
	if err != nil {
		panic(err.Error())
	}

	//Create a new GCM - https://en.wikipedia.org/wiki/Galois/Counter_Mode
	//https://golang.org/pkg/crypto/cipher/#NewGCM
	aesGCM, err := cipher.NewGCM(block)
	if err != nil {
		panic(err.Error())
	}

	//Create a nonce. Nonce should be from GCM
	nonce := make([]byte, aesGCM.NonceSize())
	if _, err = io.ReadFull(rand.Reader, nonce); err != nil {
		panic(err.Error())
	}

	//Encrypt the data using aesGCM.Seal
	//Since we don't want to save the nonce somewhere else in this case, we add it as a prefix to the encrypted data. The first nonce argument in Seal is the prefix.
	ciphertext := aesGCM.Seal(nonce, nonce, plaintext, nil)
	return fmt.Sprintf("%x", ciphertext)
}
```

### Decryption

To decrypt the encrypted data/cipher text, it's pretty similar.

Convert the key and encrypted data to bytes.
```
key, _ := hex.DecodeString(keyString)
enc, _ := hex.DecodeString(encryptedString)
```

Create a new Cipher Block from the key
```
block, err := aes.NewCipher(key)
```

Create a new GCM
```
aesGCM, err := cipher.NewGCM(block)
```

Get the nonce size and extract the nonce from the prefix of the encrypted data. This is a very important since you can't decrypt the data without the correct nonce.

```
nonceSize := aesGCM.NonceSize()
nonce, ciphertext := enc[:nonceSize], enc[nonceSize:]
```

Decrypt the data using the GCM Open function.
```
plaintext, err := aesGCM.Open(nil, nonce, ciphertext, nil)
```

Here's how the decrypt function looks like.
```
func decrypt(encryptedString string, keyString string) (decryptedString string) {

	key, _ := hex.DecodeString(keyString)
	enc, _ := hex.DecodeString(encryptedString)

	//Create a new Cipher Block from the key
	block, err := aes.NewCipher(key)
	if err != nil {
		panic(err.Error())
	}

	//Create a new GCM
	aesGCM, err := cipher.NewGCM(block)
	if err != nil {
		panic(err.Error())
	}

	//Get the nonce size
	nonceSize := aesGCM.NonceSize()

	//Extract the nonce from the encrypted data
	nonce, ciphertext := enc[:nonceSize], enc[nonceSize:]

	//Decrypt the data
	plaintext, err := aesGCM.Open(nil, nonce, ciphertext, nil)
	if err != nil {
		panic(err.Error())
	}

	return fmt.Sprintf("%s", plaintext)
}
```

### Full source code
Here's the full source code. Check the main method to see how the encrypt/decrypt functions are used.

```
package main

import (
	"crypto/aes"
	"crypto/cipher"
	"crypto/rand"
	"encoding/hex"
	"fmt"
	"io"
)

func main() {

	bytes := make([]byte, 32) //generate a random 32 byte key for AES-256
	if _, err := rand.Read(bytes); err != nil {
		panic(err.Error())
	}

	key := hex.EncodeToString(bytes) //encode key in bytes to string and keep as secret, put in a vault
	fmt.Printf("key to encrypt/decrypt : %s\n", key)

	encrypted := encrypt("Hello Encrypt", key)
	fmt.Printf("encrypted : %s\n", encrypted)

	decrypted := decrypt(encrypted, key)
	fmt.Printf("decrypted : %s\n", decrypted)
}

func encrypt(stringToEncrypt string, keyString string) (encryptedString string) {

	//Since the key is in string, we need to convert decode it to bytes
	key, _ := hex.DecodeString(keyString)
	plaintext := []byte(stringToEncrypt)

	//Create a new Cipher Block from the key
	block, err := aes.NewCipher(key)
	if err != nil {
		panic(err.Error())
	}

	//Create a new GCM - https://en.wikipedia.org/wiki/Galois/Counter_Mode
	//https://golang.org/pkg/crypto/cipher/#NewGCM
	aesGCM, err := cipher.NewGCM(block)
	if err != nil {
		panic(err.Error())
	}

	//Create a nonce. Nonce should be from GCM
	nonce := make([]byte, aesGCM.NonceSize())
	if _, err = io.ReadFull(rand.Reader, nonce); err != nil {
		panic(err.Error())
	}

	//Encrypt the data using aesGCM.Seal
	//Since we don't want to save the nonce somewhere else in this case, we add it as a prefix to the encrypted data. The first nonce argument in Seal is the prefix.
	ciphertext := aesGCM.Seal(nonce, nonce, plaintext, nil)
	return fmt.Sprintf("%x", ciphertext)
}

func decrypt(encryptedString string, keyString string) (decryptedString string) {

	key, _ := hex.DecodeString(keyString)
	enc, _ := hex.DecodeString(encryptedString)

	//Create a new Cipher Block from the key
	block, err := aes.NewCipher(key)
	if err != nil {
		panic(err.Error())
	}

	//Create a new GCM
	aesGCM, err := cipher.NewGCM(block)
	if err != nil {
		panic(err.Error())
	}

	//Get the nonce size
	nonceSize := aesGCM.NonceSize()

	//Extract the nonce from the encrypted data
	nonce, ciphertext := enc[:nonceSize], enc[nonceSize:]

	//Decrypt the data
	plaintext, err := aesGCM.Open(nil, nonce, ciphertext, nil)
	if err != nil {
		panic(err.Error())
	}

	return fmt.Sprintf("%s", plaintext)
}
```

---
P.S. 
For updates, you can follow my blog and Twitter **[@donvito](https://twitter.com/donvito)**. Most of my tweets are about Docker, Kubernetes, GoLang, Cloud, DevOps, Agile and Startups. I also share code in my **[GitHub](https://github.com/donvito)**.  If you want to know more about what I do, please add me in **[LinkedIn](https://www.linkedin.com/in/melvinvivas/)**. I recently started a new [youtube channel](https://www.youtube.com/channel/UCi6RVSV8s9Yy2Qg3WcGq9cg) - I upload some tutorials there. Check it out!