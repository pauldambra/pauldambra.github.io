--- 
title: "Websites != CMS Platform - Storing Data - Part 1" 
layout: "post" 
permalink: "/Websites-CMS-Platform-Storing-Data.html" 
uuid: "5203142603744123699" 
guid: "tag:blogger.com,1999:blog-6728560442491983758.post-5203142603744123699" 
date: "2014-04-12 08:11:00"
updated: "2014-04-12 08:11:30" 
description: storing data using mongo, mongojs and express
keywords: mongojs express node nosql mongodb
published: "false" 
---

This post is part of a series where I'm hoping to prove to myself that building a dynamic website without a CMS platform is comparable to building one with a known CMS. [See the first post for an explanation of why]({% post_url 2014-02-22-websites-cms %})

[Previous Post]({% post_url 2014-03-25-testing-with-browserstack-and-selenium %})

Storing Data - Part 1
=====================
After a day writing DDL for a project that has manual schema versioning against MS SQL and is going through a lot of changes I feel honour bound to write a post about storing data in the Omniclopse site.

I'll be using MongoDB for two reasons.
    
1. The implicit schema of a NoSQL database is awesome when you're not sure of the final shape of the data.
2. Storing a data structure that's almost definitely going to be sent over the wire as JSON as... JSON makes a lot of sense to me.

First Steps
===========
At least for now each view will have its own document in the database (At the moment there's only one view! so why complicate things).

First it is necessary to `npm install --save mongojs` and then require mongojs within the server module.
{% highlight js %}
var mongojs = require('mongojs');
var db = mongojs('omniclopse', ['pages']);
{% endhighlight %}
Here the variable `db` connects to a MongoDB database called omniclopse and a collection called pages.

Next the call to the DB to get the home page data is added to the home route.
{% highlight js %}
app.get('/', function(req, res){
    db.pages.findOne({ name: 'home' }, function(err, doc) {
        if (err) {
            res.render('500', {error: err});
        } 
        if (doc) {
            res.render('home', doc);
        } else {
            res.render('404');
        }
    });
});
{% endhighlight %}

This raises three points:

1. An error page (and tests for it?) is required
2. A 404 page (and tests for it) is required
3. The app's tests will need to be able to mock the MongoDB.

Error Pages
===========
Adding the 404 and 500 pages is straightforward. 

For example:
{% highlight html %}
<div class="container bg-danger">
	<h1>404</h1>
	<div>Dang! That doesn't seem to exist.</div>
</div>
{% endhighlight %}

There are two cases where the app will need to return a 404. 

First, when the URL doesn't exist an HTTP status 400 should be returned
{% highlight js %}
describe('GET unknown route sends 404 status', function(){
  it('respond with 404 html', function(done){
    request(server)
      .get('/never-exists')
      .set('Accept', 'text/html')
      .expect('Content-Type', /html/)
      .expect(404, done);
  });
});
{% endhighlight %}

Second, when the database has no entry for the page then the HTTP status should be 200 but the page should be a 404.
{% highlight js %}
describe('GET known route with no data sends 404 page with 200 status', function(){
  it('respond with 404 html', function(done){
    request(server)
      .get('/')
      .set('Accept', 'text/html')
      .expect('Content-Type', /html/)
      .expect(200, done)
      .end(function(err, res) {
        if (err) return done(err);
        res.text.should.include("Dang! That doesn't seem to exist.");
        done();
      });
  });
});
{% endhighlight %}

Ah, but...
----------
...the MongoDB pages collection is empty. Once this collection contains a match for `name: home` then this test will fail.

Run Tests against a different database instance
===============================================
Much simpler than mocking the DB is simply running against a test copy of the DB. Very little code to write and the best code is the code you (I?) don't write.

The code to intialise the database becomes
{% highlight js %}
var dbName = process.env.NODE_ENV === 'test' ? 'omnitest' : 'omniclopse';
var db = mongojs(dbName, ['pages']);
{% endhighlight %}

and in the test spec files
{% highlight js %}
var server;

beforeEach(function() {
    process.env.NODE_ENV = 'test'; 
    server = require('../server').app;
});
{% endhighlight %}