---
title: "Power your Apps: Leverage Natural Language, OpenAI, LangChain and Custom APIs"
date: "2023-04-15T00:00:00.000Z"
template: "post"
draft: false
slug: "chatgpt-openai-natural-language-to-api-call"
category: "AI, Software Development, ChatGPT, OpenAI, LangChain"
tags:
  - "langchain"
  - "openai" 
  - "chatgpt" 
  - "ai" 
description: "In this blog post, I will explore Generative Text AI using OpenAI, Python and llama_Index. I will also discuss the accessibility of AI and the tools I have discovered to make it easier to use OpenAI APIs."
---

## **Natural Language Processing and OpenAI** 

As the world becomes increasingly digital, the use of natural language processing (NLP) in apps is becoming more and more common. NLP allows users to interact with apps using natural language, making the experience more intuitive and user-friendly. OpenAI is one of the leading companies in the field of NLP, offering a range of powerful tools and APIs to developers. With OpenAI's APIs, you can easily add NLP functionality to your app.

By incorporating OpenAI's APIs into your app, you can create a more engaging and interactive experience for your users. Whether you're building a chatbot, an e-commerce site, or a search engine, OpenAI's NLP features can help you take your app to the next level.

## **LangChain** 

*Large language models (LLMs) are emerging as a transformative technology, enabling developers to build applications that they previously could not. But using these LLMs in isolation is often not enough to create a truly powerful app - the real power comes when you can combine them with other sources of computation or knowledge.* - LangChain website

LangChain is primarily a framework to use with Language Model (LLM) technology. It allows for the development of applications for chatbots that support Generative Question-Answering(GCA). Essentially, LangChain is designed to "chain" various components(LLMs, APIs, document retrieval, peristence, etc.) together, allowing for the creation of advanced LLM applications. 

By leveraging the power of LangChain and OpenAI APIs, we can create applications that are not only innovative and powerful but also provide maximum value to our users.

## **APIChain**

APIChain is a feature of LangChain that allows your application to understand natural language and translate it into API calls. This means that your application can leverage the power of APIs to provide your users access to real-time data and provide them better user experience - Imagine an application which requires users to configure so many filters just to be able to search data. For example in a classified ads website, you need to specify filters to narrow down your search and find the specific item you need. 

By allowing for seamless integration with various APIs, APIChain allows you to create advanced applications that can perform complex tasks based on user input. 

<a href="https://www.buymeacoffee.com/melvindave"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=melvindave&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff" /></a>.

## **Searching the Street Address or Postal Code using LangChain and Singapore's OneMap API**

In this example, let's use LangChain's APIChain feature to retrieve the street address and postal code of "OurTampines Hub" from the [OneMap API](https://www.onemap.gov.sg/docs). We can achieve this by creating a LangChain instance and calling its APIChain function with the appropriate API parameters.

![](/media/langchain_openai_apichain.png)

We would use LangChain's APIChain function to translate the user's query for the street address and postal code of OurTampines Hub into an API call to the [OneMap API](https://www.onemap.gov.sg/docs).

The OneMap API would then return the desired information, which LangChain would process and return to the user in a natural language format. For instance, LangChain might respond with "The street address of Our Tampines Hub is "1 TAMPINES WALK OUR TAMPINES HUB SINGAPORE 528523".

The result of the API is a JSON object. We can then use the JSON object to retrieve the desired information and return it to the user in a natural language format. This will be done automatically by LangChain.

**OneMap API Endpoint**

```
GET https://developers.onemap.sg/commonapi/search?searchVal=our%tampines%hub&returnGeom=N&getAddrDetails=Y&pageNum=1
```

**Response**
```json
{
    "found": 1,
    "totalNumPages": 1,
    "pageNum": 1,
    "totalNumEntries": 1,
    "results": [
        {
            "SEARCHVAL": "OUR TAMPINES HUB",
            "BLK_NO": "1",
            "ROAD_NAME": "TAMPINES WALK",
            "BUILDING": "OUR TAMPINES HUB",
            "ADDRESS": "1 TAMPINES WALK OUR TAMPINES HUB SINGAPORE 528523",
            "POSTAL": "528523"
        }
]
}
```

## **Source Code of Example**
Below is the full code for the example above

You can also copy the code from my [Github Gist](https://gist.github.com/donvito/cb67bc5a497fd4bb02b5715c6096c0c0)


```python
import os

from langchain.chains import APIChain
from langchain.chat_models import ChatOpenAI

os.environ["OPENAI_API_KEY"] = ""

llm = ChatOpenAI(temperature=0, model_name="gpt-3.5-turbo", max_tokens=256, verbose=True)

apiSpec = """API documentation:
Base URL: https://developers.onemap.sg/commonapi
Endpoint: /search
Example API call: https://developers.onemap.sg/commonapi/search?searchVal=520201&returnGeom=Y&getAddrDetails=Y&pageNum=1

This API is for retrieving address details based on a search keyword.

Request POST payload (JSON object) 
Json Field	Format	Required	Default	Description
searchVal	String	No		Any string representing a steet address, establishment, location or postal code
returnGeom String Yes N always set to N
getAddrDetails String Yes Y always set to Y

INSTRUCTIONS FOR RESPONDING
Reply to the user with the first ADDRESS result, respond in natural language indicate the ADDRESS from the APi response. If data is empty, just say you the search has not returned any results and you are sorry.

"""

# set the headers if you need to do add authorization, for this example we don't need it because the API is public
# apiToken = ""
# headers = {"Authorization": f"Bearer {apiToken}"} 
# chain_new = APIChain.from_llm_and_api_docs(llm, apiSpec, verbose=True, headers=headers)

chain_new = APIChain.from_llm_and_api_docs(llm, apiSpec, verbose=True)
response = chain_new.run('What is the postal code of Our Tampines Hub?')
print(response)
```

Here are sample outputs:

![](/media/address_tampines_hub.png)

![](/media/address_result.png)

![](/media/postal_code_tampines_hub.png)

![](/media/postal_code_result.png)

The use of OneMap API in the previous example was just an illustration. APIChain can be used with any API that accepts natural language inputs and returns data in a structured format. The possibilities are limitless, and businesses can choose to integrate with any API that meets their specific needs.

APIChain makes it easy to integrate with multiple APIs simultaneously, allowing businesses to create custom workflows that leverage the strengths of different APIs. This not only enhances the user experience but also streamlines business operations, allowing organizations to focus on other critical aspects of their operations.

<a href="https://www.buymeacoffee.com/melvindave"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=melvindave&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff" /></a>.


**Lots of Potential**

**APIChain** has immense potential for a wide range of use cases beyond just retrieving location-based information. Here are a few examples of how APIChain could be used:

- **E-commerce**: With APIChain, businesses could allow customers to use natural language to search for products and retrieve relevant results from their e-commerce API.

- **Finance**: Users could ask natural language questions like "What is the current stock price of Amazon?" and APIChain could use the appropriate financial API to retrieve the information and return it in a human-readable format.

- **Travel**: Users could use natural language to search for flights, hotels, and other travel-related information from various travel APIs, making the travel booking experience more personalized and intuitive.

- **Healthcare**: APIChain could be used to retrieve medical information from various healthcare APIs and provide personalized responses to user inquiries about symptoms, conditions, and treatments.

- **Education**: APIChain could be used to provide personalized learning experiences to students by integrating with various educational APIs and providing answers to questions in real-time.

Overall, APIChain has endless possibilities for businesses and developers looking to leverage the power of natural language processing and APIs to deliver personalized, intuitive experiences to their users.

**Reference used**
- **API Chain Documentation** https://python.langchain.com/en/latest/modules/chains/examples/api.html

---
I hope this article helps you in your journey to develop your own applications with Open AI. I will find time to write more articles about Open AI and how to use it in your applications. You can reach me in my social media accounts below.

If you'd like to show your support and appreciation for my work, please consider buying me a coffee. :)

<a href="https://www.buymeacoffee.com/melvindave"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=melvindave&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff" /></a>.

Your support means a lot to me and will motivate me to continue creating content that you love. Thank you for considering to support my work!

Cheers!

Melvin Dave

<a href="https://discord.com/invite/aDffwCqw"><img height="80" width= "250" src="media/joindiscord.png" /></a>.

Or you can reach me in my social media accounts below.
- **[Twitch](https://twitch.tv/donvitocodes)**
- **[Twitter](https://twitter.com/donvito)**
- **[LinkedIn](https://www.linkedin.com/in/melvinvivas/)**
- **[GitHub](https://github.com/donvito)**.