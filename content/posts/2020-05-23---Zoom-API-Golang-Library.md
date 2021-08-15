---
title: "Developing a Zoom API Client Library for Golang"
date: "2020-05-23T00:00:00.000Z"
template: "post"
draft: false
slug: "zoom-api-golang-library"
category: "software development"
tags:
  - "golang" 
description: "I thought of developing a Zoom API Golang Client Library for my personal use. There is no official Zoom API client library for Go/Golang so I thought it would be interesting to develop one."
---
I thought of developing a [Zoom](https://zoom.us) API Golang Client Library for my personal use. There is no official Zoom API client library for Go/Golang so I thought it would be interesting to develop one.

### Why Zoom?


* Zoom is very popular during this crisis and most businesses and schools are using it. Zoom is also used by families and friends to get in touch during this trying times. This popularity will also give rise to the need to integrate with Zoom.

* There is no official Zoom API client library for Go/Golang.

* I wanted an interesting project to practice my Golang skills and at the same time be able to create something useful for fellow Gophers. 

* It would be interesting to know how Go developers will integrate Zoom into their applications.

Here is the github project if you would like to take a peek. I'd really appreciate it if you can give it a star if you liked it or find it useful. Stars will really give me motivation to spend more time on it and implement more functionality.:)

> https://github.com/donvito/zoom-go

I am very busy with my daytime job so I only work on the library during late nights and weekends. So far, I have implemented the ff. functionality.

* List Meetings
* Create Meeting
* Delete Meeting
* Get Meeting by Id
* Get Meeting Invitation
* Add Meeting Registrant
* List Meeting Registrants
* End Meeting 

This library is in its infancy and has not been tested for production use.

To use the library, you will need a paid account to access Zoom's REST API.  Unfortunately, free or basic accounts do not have access to the APIs.  You need to create a JWT App in the Zoom App Marketplace and get a JWT token from App Credentials.  Here are the instructions I followed to get me started.

> https://marketplace.zoom.us/docs/guides/build/jwt-app

*Image from Zoom Documentation*
![1560025161259](/media/1560025161259.png)

The zoom-go library uses environment variables to configure the API client. Here are the required environment variables.

```
    export ZOOM_API_URL="https://api.zoom.us/v2"
    export ZOOM_AUTH_TOKEN="<your jwt token>" 
    export ZOOM_USER_ID="<your email or username>" 
```

### Download the library to your project

```
go get "github.com/donvito/zoom-go/zoomAPI"
```

### List Meeting example
```
func listMeetingExample() {

	//Create a new Zoom API client
    	apiClient := zoomAPI.NewClient(os.Getenv("ZOOM_API_URL"), os.Getenv("ZOOM_AUTH_TOKEN"))
    
    	//Retrieve the userId from the env variable
    	userId := os.Getenv("ZOOM_USER_ID")
    
    	//Use the client to list meetings
    	var resp zoomAPI.ListMeetingsAPIResponse
    	var err error
    
    	resp, err = apiClient.ListMeetings(userId)
    	if err != nil {
    		log.Fatal(err)
    	}
    
    	for _, meeting := range resp.Meetings {
    		fmt.Printf("id = %d, topic = %s, join url = %s, start time = %s\n", meeting.Id, meeting.Topic, meeting.JoinUrl, meeting.StartTime)
    	}

}
```

### Create Meeting example

```
func createMeetingExample() {
	//Create a new Zoom API client
    	apiClient := zoomAPI.NewClient(os.Getenv("ZOOM_API_URL"),
    		os.Getenv("ZOOM_AUTH_TOKEN"))
    
    	//Retrieve the userId from the env variable
    	userId := os.Getenv("ZOOM_USER_ID")
    
    	//Use the API client to create a meeting
    	var resp zoomAPI.CreateMeetingResponse
    	var err error
    
    	resp, err = apiClient.CreateMeeting(userId,
    		"Contributors Meeting for Project",
    		meeting.MeetingTypeScheduled,
    		"2020-05-24T22:00:00Z",
    		30,
    		"",
    		"Asia/Singapore",
    		"pass8888", //set this with your desired password for better security, max 8 chars
    		"Discuss next steps and ways to contribute for this project.",
    		nil,
    		nil)
    	if err != nil {
    		log.Fatal(err)
    	}
    
    	fmt.Printf("Created meeting : id = %d, topic = %s, join url = %s, start time = %s\n", resp.Id, 
                resp.Topic, resp.JoinUrl, resp.StartTime)

}
```

### End Meeting using Update Meeting Status
```
func updateMeetingStatusExample(){

	//Create a new Zoom API client
	apiClient := zoomAPI.NewClient(os.Getenv("ZOOM_API_URL"),
		os.Getenv("ZOOM_AUTH_TOKEN"))

	//Use the API client to add a meeting registrant
	var err error

	meetingId := 87853332664
	err = apiClient.UpdateMeetingStatus(meetingId, "end")
	if err != nil {
		log.Fatal(err)
	}

	fmt.Printf("Meeting status updated")

}
```

That's it!  Hope this Zoom API Golang client library is useful to someone who would like to start integrating with Zoom using Go. Cheers!

---
P.S. 
For updates, you can follow my blog and Twitter **[@donvito](https://twitter.com/donvito)**. Most of my tweets are about Docker, Kubernetes, GoLang, Cloud, DevOps, Agile and Startups. I also share code in my **[GitHub](https://github.com/donvito)**.  If you want to know more about what I do, please add me in **[LinkedIn](https://www.linkedin.com/in/melvinvivas/)**. I recently started a new [youtube channel](https://www.youtube.com/channel/UCi6RVSV8s9Yy2Qg3WcGq9cg) - I upload some tutorials there. Check it out!