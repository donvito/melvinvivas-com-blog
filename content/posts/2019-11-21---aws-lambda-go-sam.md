---
title: "Deploying a Go Lambda Function using AWS SAM"
date: "2019-11-21T00:00:00.000Z"
template: "post"
draft: false
slug: "aws-lambda-go-sam"
category: "Software Development"
tags:
  - "golang" 
  - "lambda"
  - "aws"
description: "Learn how to deploy a Go Function in AWS Lambda using AWS SAM(AWS Serverless Application Model)"
socialImage: "/media/Screenshot-2019-08-31-21.10.36.png"
---

I've been hearing about serverless in a few webinars recently. It seems that cloud providers such as Amazon Web Services(AWS), Google Cloud Platform(GCP) and Microsoft Azure are encouraging startups to develop their apps based on serverless technology. Serverless does not really mean that there are no servers or computers running our software. It just means that we don't have to really maintain and operate of physical machines and application software or "Servers". This is great if you are an independent software developer or a startup since it means faster time to market for new products.  In my opinion, it provides great business value and lets companies focus on more important things which is to make money. Also, serverless technology can be cheaper in the long run since you just have to pay for what you use. 

In terms of Serverless technology, I think [AWS Lambda](https://aws.amazon.com/lambda) is the most popular and probably the most mature. It supports Java, Go, PowerShell, Node.js, C#, Python, and Ruby. AWS Lambda also has a Runtime API if you wish to use a language which is not supported by default.


[Google Cloud Functions](https://cloud.google.com/functions) is a similar solution to AWS Lambda. It supports NodeJS, Python and Go. Microsoft also has its own product called [Azure Functions](https://azure.microsoft.com/en-gb/services/functions).  There are also other open source alternatives such as [OpenFaaS](https://www.openfaas.com) and Apache's [Open Whisk](https://openwhisk.apache.org).

So, let's get to the fun part. I have just been starting into  serverless development just a few days ago so I was able to just try [AWS Lambda with Go](https://docs.aws.amazon.com/lambda/latest/dg/go-programming-model.html). I was really curious on how to deploy a Go function in AWS Lambda so I did a bit of research on it. Here is how the AWS Lambda interface looks.

![screenshot](/media/Screenshot-2019-11-21-17.39.46.png)

After creating a function, it shows this screen which has some options for you to update the function with your code. You can either upload a zip file or upload your the Go binary into S3.

![screenshot](/media/Screenshot-2019-11-21-19.18.47.png)

Since we are developers and would want to automate packaging and deployment later on, we won't be doing the uploading of the binary using the user interface. So the questions is, is there a better way? Yes, of course, this is using Amazon's tools. For this example, we will be using the AWS CLI and [AWS SAM](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html). Here are the guides for each platform. I won't be going through this in this post since these guides  are straightforward and easier to follow.
- [Installing the AWS SAM CLI on Linux](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install-linux.html)
- [Installing the AWS SAM CLI on Windows](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install-windows.html)
- [Installing the AWS SAM CLI on macOS](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install-mac.html)

AWS Serverless Application Model (AWS SAM) is an open-source tool which we can use to build/develop serverless applications and deploy to AWS. One major feature of AWS SAM is to allowing debugging and testing of code in the local development environment. You wouldn't want to test your functions after deployment, right?  This is very important if we care about productivity. SAM also makes it easy to package and deploy functions to your desired AWS region.  

Here are the versions of AWS CLI and AWS SAM which I installed.
![screenshot](/media/Screenshot-2019-11-21-17.58.35.png)
```
$sam init --runtime go1.x --name aws-lambda-go-example
```
![screenshot](/media/Screenshot-2019-11-21-18.08.30.png)

The init command downloads a quick start template with some sample code. 

![screenshot](/media/Screenshot-2019-11-21-18.13.37.png)

For our example, let's just replace the contents of main.go with this code below. Code is available here https://gist.github.com/donvito/ab8d6a19a6dc25f4c477359e19efe003

```
package main

import (
	"encoding/json"
	"fmt"
	"log"
	"os"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

func handler(request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {

	envVarKeys := []string{
		"_HANDLER",
		"AWS_REGION",
		"AWS_EXECUTION_ENV",
		"AWS_LAMBDA_FUNCTION_NAME",
		"AWS_LAMBDA_FUNCTION_MEMORY_SIZE",
		"AWS_LAMBDA_FUNCTION_VERSION",
		"AWS_LAMBDA_LOG_GROUP_NAME",
		"AWS_LAMBDA_LOG_STREAM_NAME",
		"LANG",
		"TZ",
		"LAMBDA_TASK_ROOT",
		"LAMBDA_RUNTIME_DIR",
		"PATH",
		"LD_LIBRARY_PATH",
		"AWS_LAMBDA_RUNTIME_API",
	}

	m := make(map[string]string)

	for _, v := range envVarKeys {
		m[v] = os.Getenv(v)
	}

	jsonBytes, err := json.Marshal(m)
	if err != nil {
		log.Fatal("Error in converting map to json")
	}

	rstr := fmt.Sprint(string(jsonBytes))

	return events.APIGatewayProxyResponse{
		Body:       rstr,
		StatusCode: 200,
	}, nil
}

func main() {
	lambda.Start(handler)
}
```

The code above receives a request from Amazon's API Gateway. The function does not need the request contents and just returns the runtime environment variables set in the AWS Lambda instance. We'll see how that works in a moment.

As a responsible developer, we would like to be able to test our code in our local development environment. To build our code, execute this command in the folder where do executed sam init. This will create a binary file named hello-world in the same folder as the main.go file. 
```
GOOS=linux GOARCH=amd64 go build -o hello-world/hello-world ./hello-world
```

Now we have the binary, we can now test our function in our local environment using SAM.
```
$sam local start-api
```

You'll see the message below. You can now access the function via the API using your browser.
![screenshot](/media/Screenshot-2019-11-21-18.35.13.png)

Once you've accessed the API, you'll see the json returned by the request.
![screenshot](/media/Screenshot-2019-11-21-18.38.35.png)

Here is a more readable version of the response.

```
{
  "AWS_EXECUTION_ENV": "AWS_Lambda_go1.x",
  "AWS_LAMBDA_FUNCTION_MEMORY_SIZE": "128",
  "AWS_LAMBDA_FUNCTION_NAME": "test",
  "AWS_LAMBDA_FUNCTION_VERSION": "$LATEST",
  "AWS_LAMBDA_LOG_GROUP_NAME": "/aws/lambda/test",
  "AWS_LAMBDA_LOG_STREAM_NAME": "2019/11/21/[$LATEST]e864c222a1ad66d44b8761027215e792",
  "AWS_LAMBDA_RUNTIME_API": "",
  "AWS_REGION": "us-east-1",
  "LAMBDA_RUNTIME_DIR": "/var/runtime",
  "LAMBDA_TASK_ROOT": "/var/task",
  "LANG": "en_US.UTF-8",
  "LD_LIBRARY_PATH": "/lib64:/usr/lib64:/var/runtime:/var/runtime/lib:/var/task:/var/task/lib:/opt/lib",
  "PATH": "/usr/local/bin:/usr/bin/:/bin:/opt/bin",
  "TZ": ":UTC",
  "_HANDLER": "hello-world"
}
```

At this point, the function is still running in our local machine. If you noticed in the logs below, SAM has started a docker container for our function.

![screenshot](/media/Screenshot-2019-11-21-18.37.15.png)

If you look closely, our function's execution time is only 4.68ms and memory used is 21MB. I bet that's tough to beat if you've developed your function in Java. I think AWS billing charges in blocks of 100ms so Billed Duration is still 100ms. In the future, AWS might support billing up to the millisecond.

When we're happy and  would like to deploy our function, we need to package our application for deployment.  This is the command I used. Note that edsa-sam is a S3 bucket I created earlier. You can change this to any name you'd like but make sure you create the bucket in S3 first.
```
$sam package --template-file template.yaml --s3-bucket edsa-sam --output-template-file packaged.yaml
```

Once packaged, SAM will upload a copy  of the package to the S3 bucket we specified.
![screenshot](/media/Screenshot-2019-11-21-18.50.21.png)

To deploy, just follow the suggested deploy command after packaging. You need to add the --capabilities CAPABILITY_IAM argument so SAM can create an IAM role for your stack.

```
$sam deploy --template-file /Users/melvin/Documents/github/aws-lambda-go-example/aws-lambda-go-example/packaged.ya
ml --capabilities CAPABILITY_IAM --stack-name aws-lambda-go-example 
```
![screenshot](/media/Screenshot-2019-11-21-18.54.32.png)

For reference, if you don't add the capabilities argument, you get this error:
![screenshot](/media/Screenshot-2019-11-21-18.55.21.png)

Once deployment is successful, you can check details in the AWS Console ->Lambda->Applications.

![screenshot](/media/Screenshot-2019-11-21-18.56.42.png)


As defined in package.yaml, this is what was created by CloudFormation. CloudFormation is used by SAM to provision resources required by your stack. If you're not familiar with CloudFormation, it is similar to Hashicorp's Terraform.

![screenshot](/media/Screenshot-2019-11-21-18.58.50.png)

As part of the stack's configuration, a GET /hello API Gateway endpoint has been created.

![screenshot](/media/Screenshot-2019-11-21-19.00.16.png)

To test our endpoint using the AWS Console, click on the Test in the endpoint configuration.

![screenshot](/media/Screenshot-2019-11-21-19.01.38.png)

In our example, we do not need to add some query string or headers.

![screenshot](/media/Screenshot-2019-11-21-19.03.04.png)

After clicking test, we can see the response of our Go Lambda function!

![screenshot](/media/Screenshot-2019-11-21-19.04.40.png)

If you want to test the Lambda function only, you can select the function and click Test.
![screenshot](/media/Screenshot-2019-11-21-19.09.23.png)


Here are some resources which I referred to while creating this example.
- https://docs.aws.amazon.com/lambda/latest/dg/go-programming-model.html
- https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html
- https://github.com/awslabs/aws-sam-cli
- https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-getting-started-hello-world.html

That's it! Hope this useful to someone who would like to develop serverless applications using Go and AWS Lambda.