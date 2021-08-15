---
title: "Generate a QRCode vCard using Go"
date: "2019-08-31T00:00:00.000Z"
template: "post"
draft: false
slug: "generate-vcard-qrcode-using-go"
category: "Software Development"
tags:
  - "golang" 
  - "graphql"
description: "Generate a QRCode vCard using Go"
socialImage: "/media/Screenshot-2019-08-31-21.10.36.png"
---

Every time I receive a business card, I always check if there is a QR code in it. QR codes are very useful since most mobile phone cameras  nowadays can automatically recognise QR codes. Once a QR code which contains vCard data is detected, phones automatically launch "Add Contact" with the details read from the QR code. So all you have to do is just tap "Save" to add the new contact. There is no need to fill in your contacts' information  from the business card.  This saves a few seconds of our lives. Who wants filling in data? :)

I've always been curious how to create these QR codes which contain vCard data so I searched on how to generate them using Go. So after a few minutes, I've come up with a solution using an existing library called go-qrcode. The solution is pretty simple using go-qrcode.

Below is the full source code of the example. Since Go is very straightforward, it just takes a few lines to do it. The example reads data from a vcard.txt file and the vcard data is passed into the qrcode library which generates the qrcode image with the encoded vCard data.

```
package main

import (
	"io/ioutil"
	"log"
	"os"

	qrcode "github.com/skip2/go-qrcode"
)

func main() {

	file, err := os.Open("vcard.txt")
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	b, err := ioutil.ReadAll(file)
	if err != nil {
		log.Fatal(err)
	}

	str := string(b)
	qrFname := "vcard-qr.png"

	err = qrcode.WriteFile(str, qrcode.Medium, 256, qrFname)
	if err != nil {
		log.Fatal(err)
	}

}
```

You can use the ZXing generator to generate the vCard data. Below is sample content of vcard.txt
```
BEGIN:VCARD
VERSION:3.0
N:Melvin Vivas
ORG:Freelance
TITLE:Senior Software Engineer
TEL:+1234567
URL:https://www.melvinvivas.com
EMAIL:melvindave@gmail.com
ADR:Singapore
END:VCARD
```

To run the example, you need to first download go-qrcode.
```
$ go get -u github.com/skip2/go-qrcode/...
```

Then, just do the usual, run main.go
```
$ cd src/
$ go run main.go
```

After running the application, this will generate a vcard-qr.png image file in the same directory as your application.
![screenshot](/media/Screenshot-2019-08-31-21.10.36.png)

That's it! Hope you find the example useful! Source code for this example is in my github repo below:
- https://github.com/donvito/go-qrcode-vcard-example