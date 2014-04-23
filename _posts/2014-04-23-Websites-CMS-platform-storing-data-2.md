--- 
title: "Websites != CMS Platform - Storing Data - Part 2" 
layout: "post" 
permalink: "/Websites-CMS-Platform-Storing-Data2.html" 
uuid: "5203142603744123699" 
guid: "tag:blogger.com,1999:blog-6728560442491983758.post-5203142603744123699" 
date: "2014-04-12 08:11:00"
updated: "2014-04-12 08:11:30" 
description: storing data using mongo, mongojs and express
keywords: mongojs express node nosql mongodb
published: "false" 
---

This post is part of a series where I'm hoping to prove to myself that building a dynamic website with NodeJS is much more fun than using a CMS platform. [See the first post for an explanation of why]({% post_url 2014-02-22-websites-cms %})

The code can be found on [GitHub](https://github.com/pauldambra/omniclopse)

[Previous Post](/Websites-CMS-Platform-Storing-Data.html)

Storing Data - Part 2
=====================

The first step is always (or at least should be) to take a step back and decide what to actually do...

In the last post the decision was made to store one document per page, and to have a unique index on the documents name property. This fits with a PUT request

[Callers of a PUT method should anticipate the calls are idempotent and made to the URL of a given resource](http://stackoverflow.com/a/630475/222163). That is we'll be sending data to `/pages/pageName` and not `/pages` and repeatedly sending the same document for storage means that the document should be updated not duplicated.

Tests
-----
This feature requires a set of conditions are tested:
<ul>
	<li>you can't PUT an empty page</li>
	<li>if you PUT a new page you receive a 201</li>
	<li>if you PUT an existing page you receive a 200</li>
	<li>the inserted or updated resource URL is in the location header of the response</li>
</ul>
{% highlight js %}
describe('PUTing pages', function() {
    it('should 400 when no body');

    describe('with new name', function(){
      it('respond with 201 status');
    });

    describe('with existing name', function(){
      it('respond with 200 status');
  });
});
{% endhighlight %}

After a little backwards and forwards the tests ended up as:
{% highlight js %}
var request = require('supertest');
var should = require('should');

var server;
var db;

beforeEach(function() {
    //set environment to test and init things
    process.env.NODE_ENV = 'test'; 
    db = require('../server/db');
    server = require('../server').app;
});

describe('PUTing pages', function() {
    it('should 400 when no body', function(done) {
        request(server)
          .put('/pages/newPage')
          .set('Accept', 'text/json')
          .expect('Content-Type', /json/)
          .expect(400, done);
    });

    describe('with a new page name', function(){
      beforeEach(function() {
        db.pages.remove({}, false, function(err, doc) {});
      });

      it('should respond with 201 status', function(done){
        request(server)
          .put('/pages/newPage')
          .send({name:'newPage', url:'/somewhere'})
          .set('Accept', 'text/json')
          .expect('Content-Type', /json/)
          .expect('location', '/somewhere')
          .expect(201, done);
      });

    });

    describe('with an existing page name', function(){
      beforeEach(function() {
        db.pages.remove({}, false, function(err, doc) {});
        db.pages.insert({name:'existingPage'}, function(err, docs){});
      });

      it('should respond with 200 status', function(done){
        request(server)
          .put('/pages/existingPage')
          .send({name:'existingPage', url:'/somewhereElse'})
          .set('Accept', 'text/json')
          .expect('Content-Type', /json/)
          .expect('location', '/somewhereElse')
          .expect(200, done);
      });

    });
});
{% endhighlight %}

and an alteration to the server file to make those tests pass:

{% highlight js %}
app.put('/pages/:page', function(req, res, next) {
    var pageName = req.params.page;
    if(!req.body || Object.getOwnPropertyNames(req.body).length === 0) {
        return res.json(400, {});
    }
    db.pages.findAndModify({
        query: { name: pageName },
        update: { $set: req.body },
        upsert: true,
        new: true
    }, function(err, doc, lastErrorObject) {
        if(err) {
            next(err);
        } else {
            res.location(doc.url || '/');
            if(lastErrorObject.updatedExisting) {
                res.json(200, {}); 
            } else {
                res.json(201,{}); 
            }
        }
    });
});
{% endhighlight %}

Again this code feels a bit ugly to me... there's a lot bunched up together - but it can be revisited easily as it's covered by tests. Importantly it works and allows storage of new pages and edits to existing pages

And, yes, I know that any unauthorised user can edit with this... authentication is still to come!