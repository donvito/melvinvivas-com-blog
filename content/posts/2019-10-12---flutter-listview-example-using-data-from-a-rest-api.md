---
title: "Implement a Flutter ListView using data from a REST API"
date: "2019-10-12T00:00:00.000Z"
template: "post"
draft: false
slug: "flutter-listview-example-using-data-from-a-rest-api"
category: "Software Development"
tags:
  - "mobile" 
  - "flutter"
description: "Learn to implement a Flutter ListView which retrieves data from a REST API in this blog post."
---

I've been learning Flutter for a few weeks now and it has been a really good experience. I used to use Objective-C and this seems to be way easier. Plus, when you develop using Flutter, you develop for both iOS and Android using the same code base. 
I am using a Mac with VSCode. Here are a few links which can get you up and running with Flutter:
- [Install Flutter](https://flutter.dev/docs/get-started/editor)
- [Set up an IDE](https://flutter.dev/docs/get-started/editor). I prefer to use [VSCode](https://flutter.dev/docs/get-started/editor?tab=vscode).
- [Write your First Application](https://flutter.dev/docs/get-started/codelab)
- [Introduction to Flutter Widgets](https://flutter.dev/docs/development/ui/widgets-intro)

These are the links which helped me learn Flutter for the first time. You can also check out the [Flutter in Focus](https://www.youtube.com/playlist?list=PLjxrf2q8roU2HdJQDjJzOeO6J3FoFLWr2) channel in Youtube if you like learning by watching videos.

After you've learned the basics, you can try out this example I've done which displays a ListView widget with data retrieved from a REST API.  

All source code for this example is available in my [github repo](https://github.com/donvito/flutter-examples/tree/master/flutter_listview_rest). 

The entrypoint of the applications is main.dart inside the lib directory. This example is a MaterialApp which has an AppBar and a ListView. The flutter code below is pretty straightforward and is easy to understand.

main.dart
```
class App extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Job Portal',
      home: Scaffold(
        appBar: AppBar(
          title: Text('Job Portal'),
        ),
        body: Center(
          child: JobsListView()
        ),
      ),
    );
  }
}
```

This code is bootstrapped by a main function in the same file.

main.dart
```
void main() {
  runApp(App());
}
```

main.dart
The ListView widget code is in JobsListView.dart.  To use it in main.dart, you need to import it.
```
import 'JobsListView.dart';
```

After that, you can now create an instance of the JobsListView widget.
```
child: JobsListView()
```

All the magic happens in the JobsListView.dart file. In this file, there are 2 classes, Job and JobsListView. Let's check out the code.

The Job class is a data structure which contains our entity, a Job. It also has the conversion of json to the Job structure. This conversion will be used for the data retrieved from the REST API which is in json format.
```
class Job {
  final int id;
  final String position;
  final String company;
  final String description;

  Job({this.id, this.position, this.company, this.description});

  factory Job.fromJson(Map<String, dynamic> json) {
    return Job(
      id: json['id'],
      position: json['position'],
      company: json['company'],
      description: json['description'],
    );
  }
}
```

Job class
The JobsListView class has a few functions.

The _fetchJobs() function is an asynchronous function which returns a Future. This future contains the data which we will use to display in the ListView. I think a future is similar to a Promise in Javascript.

"A future represents the result of an asynchronous operation, and can have two states: uncompleted or completed." (source)

You can change the value of jobsListAPIUrl if you want to point it to your own API. Here is the glitch project https://glitch.com/~mock-json-service for the API I used for this example

```
 Future<List<Job>> _fetchJobs() async {

    final jobsListAPIUrl = 'https://mock-json-service.glitch.me/';
    final response = await http.get(jobsListAPIUrl);

    if (response.statusCode == 200) {
      List jsonResponse = json.decode(response.body);
      return jsonResponse.map((job) => new Job.fromJson(job)).toList();
    } else {
      throw Exception('Failed to load jobs from API');
    }
  }
```

Sample data returned by the API. Check out the actual response payload here https://mock-json-service.glitch.me/
```
[
  {
    "company": "Apple",
    "description": "job description",
    "employmentType": "",
    "id": 1,
    "location": "Singapore",
    "position": "Software Engineer",
    "skillsRequired": []
  },
  {
    "company": "Google",
    "description": "job description",
    "employmentType": "",
    "id": 2,
    "location": "Hong Kong",
    "position": "Software Engineering Manager",
    "skillsRequired": []
  }
]
```

The _jobsListView(data) function returns/creates a ListView using the ListView builder.

```
ListView _jobsListView(data) {
    return ListView.builder(
        itemCount: data.length,
        itemBuilder: (context, index) {
          return _tile(data[index].position, data[index].company, Icons.work);
        });
  }
```

The _tile() function returns/creates a tile which will be used to create an item in the ListView.

```
ListTile _tile(String title, String subtitle, IconData icon) => ListTile(
        title: Text(title,
            style: TextStyle(
              fontWeight: FontWeight.w500,
              fontSize: 20,
            )),
        subtitle: Text(subtitle),
        leading: Icon(
          icon,
          color: Colors.blue[500],
        ),
      );
}
```

Lastly, the JobsListView build method wires up everything. It is using a FutureBuilder. The FutureBuilder is used to integrate the ListView widget and the future we earlier created to asynchronously retrieve data from the REST API.

```
Widget build(BuildContext context) {
    return FutureBuilder<List<Job>>(
      future: _fetchJobs(),
      builder: (context, snapshot) {
        if (snapshot.hasData) {
          List<Job> data = snapshot.data;
          return _jobsListView(data);
        } else if (snapshot.hasError) {
          return Text("${snapshot.error}");
        }
        return CircularProgressIndicator();
      },
    );
  }
```

For this example, I created the REST API using nodeJS in glitch. I have it up, so feel free to use the same service in running this example. But if you need to modify it for your needs, feel free to remix it!
https://glitch.com/~mock-json-service

To run the example just run it.
```
$ flutter run
```

You'll see something like this when you run it. In this screenshot, I am testing with an iOS simulator.
![screenshot](/media/flutter-listview-rest1.png)

That's it! Hope this will be useful to those who are learning Flutter! All source code for this example is available in my github repo.

If you need a someone to develop a Flutter app, I can help! You can reach me in LinkedIn or GitHub.

---
P.S. 
For updates, you can follow my blog and Twitter **[@donvito](https://twitter.com/donvito)**. Most of my tweets are about Docker, Kubernetes, GoLang, Cloud, DevOps, Agile and Startups. I also share code in my **[GitHub](https://github.com/donvito)**.  If you want to know more about what I do, please add me in **[LinkedIn](https://www.linkedin.com/in/melvinvivas/)**. I recently started a new [youtube channel](https://www.youtube.com/channel/UCi6RVSV8s9Yy2Qg3WcGq9cg) - I upload some tutorials there. Check it out!