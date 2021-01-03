--- 
title: "Websites != CMS Platform - Storing Data - Part 1" 
layout: "post" 
permalink: "/Websites-CMS-Platform-Storing-Data.html" 
date: "2014-04-12 08:11:00"
updated: "2014-04-12 08:11:30" 
description: storing data using mongo, mongojs and express
category: cms
tags: [nosql, learning, mongodb, cms, design, web, series]
---

This post is part of a series where I'm hoping to prove to myself that building a dynamic website with NodeJS is much more fun than using a CMS platform. [See the first post for an explanation of why](/2014/02/websites-cms.html)

[Previous Post](/2014/03/testing-with-browserstack-and-selenium.html)

After a day writing DDL for a project that has manual schema versioning against MS SQL and is going through a lot of changes I feel honour bound to write a post about storing data in the Omniclopse site.

<!--more-->

I'll be using MongoDB for two reasons.
    
1. The implicit schema of a NoSQL database is awesome when you're not sure of the final shape of the data.
2. Storing a data structure that's almost definitely going to be sent over the wire as JSON as... JSON makes a lot of sense to me.

# First Steps
At least for now each view will have its own document in the database (At the moment there's only one view! so why complicate things).

First it is necessary to `npm install --save mongojs` and then require mongojs within the server module.

```js 
var mongojs = require('mongojs');
var db = mongojs('omniclopse', ['pages']);
```

Here the variable `db` connects to a MongoDB database called omniclopse and a collection called pages.

Next the call to the DB to get the home page data is added to the home route.

```js 
app.get('/', function(req, res){
    db.pages.findOne({ name: 'home' }, function(err, doc) {
        if (err) {
            res.render('500', {error: err});
        } 
        else if (doc) {
            res.render('home', doc);
        } else {
            res.render('404');
        }
    });
});
```

I think this code is a bit ugly but we'll be coming back to the server later on!

# Error Pages
Adding the 404 and 500 pages is straightforward. 

For example:

```html 
<div class="container bg-danger">
	<h1>404</h1>
	<div>Dang! That doesn't seem to exist.</div>
</div>
```

There are two cases where the app will need to return a 404. 

First, when the URL doesn't exist an HTTP status 400 should be returned

```js 
describe('GET unknown route sends 404 status', function(){
  it('respond with 404 html', function(done){
    request(server)
      .get('/never-exists')
      .set('Accept', 'text/html')
      .expect('Content-Type', /html/)
      .expect(404, done);
  });
});
```

Second, when the database has no entry for the page then the HTTP status should be 200 but the page should be a 404.

```js 
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
```

Ah, but...
----------
...the MongoDB pages collection is empty. Once this collection contains a match for `name: home` then this test will fail.

# Run Tests against a different database instance
Much simpler than mocking the DB (and because I couldn't figure out how to mock it without breaking SuperTest) is running against a test copy of the DB. Very little code to write and the best code is the code you (I?) don't write.

The code to initialise the database becomes

```js 
var dbName = process.env.NODE_ENV === 'test' ? 'omnitest' : 'omniclopse';
var db = mongojs(dbName, ['pages']);
```

and in the test spec files

```js 
var server;

beforeEach(function() {
    process.env.NODE_ENV = 'test'; 
    server = require('../server').app;
});
```

Now Mocha tests all pass and running the site gives
<p><img src="/images/home404.png" alt="404 page" class="img-responsive img-thumbnail"/></p>

After adding `{name:'home',carouselImages:[],panels:[]}` to the pages collection using the terminal and reloading the page
<p><img src="/images/homeBare.png" alt="empty page" class="img-responsive img-thumbnail"/></p>

Adding an array of carousel images to the home document:

```json 
db.pages.update({name: 'home' },
                {$set: {
                          carouselImages: [
                            {
                              url:'http://www.fillmurray.com/900/300',
                              alt:'Bill Murray',
                              caption:'Bill Murray'
                            },
                            {
                              url:'http://www.placecage.com/900/300',
                              alt:'Nick Cage',
                              caption:'Nick Cage'
                            },
                            {
                              url:'http://www.nicenicejpg.com/900/300',
                              alt:'Vanilla Ice',
                              caption:'Vanilla Ice'
                            }
                          ]
                        }
                })
```

results in:
<p><img src="/images/homeCarousel.png" alt="partial page" class="img-responsive img-thumbnail"/></p>

Adding an array of panels to the home document results in the desired home page:
<p><img src="/images/homeFull.png" alt="full page" class="img-responsive img-thumbnail"/></p>

# E Voila
Very little code, very little effort and the page data is being loaded from the database. Hurrah!

# Next
I'll be adding authentication so that we can then allow an admin user at Omniclopse HQ to change and add data
