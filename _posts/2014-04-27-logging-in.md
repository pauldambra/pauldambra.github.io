--- 
title: "Websites != CMS Platform - Logging in to the site" 
layout: "post" 
permalink: "/websites-CMS-platform-logging-in.html" 
date: "2014-04-27 08:11:00"
description: user management and logging in with nodejs mongo and passport
category: cms
tags: [learning, cms, design, web, series, mongodb, nosql, express]
---

This post is part of a series where I'm hoping to prove to myself that building a dynamic website with NodeJS is much more fun than using a CMS platform. [See the first post for an explanation of why](/2014/02/websites-cms.html)

The code can be found on [GitHub](https://github.com/pauldambra/omniclopse)

[Previous Post](/Websites-CMS-Platform-Storing-Data2.html)

This was the first part of the process which felt 'hard' so where I've felt the absence of a CMS platform but it's also only the second time I've ever implemented authentication using NodeJS. And still only boiled down to a few hours work.

<!--more-->

Passport
--------
With an eye to future expansion of what authentication the site may do the choice of technology for managing login is a [Node module called PassPort](http://passportjs.org/). PassportJS is a flexible and modular authentication middleware foor NodeJs. 

Initially the site will only support logging in using users stored in the database but Passport once setup is extendable to allow login via oauth, openid, twitter, facebook, and more. Passport uses Strategies to manage the login process.

Tests
-----
In order to test login the site will need to allow creation of users, GETing /login, POSTing to /login and GETing /logout

There's no need to support registration now but it's *so* similar to login and creation that implementation would be trivial.

```js 
describe('creating users', function() {
  it('should be possible to create a user');
  it('should not be possible to create a duplicate user');
})

describe('GET request to /login',function() {
  it('should send back the login page');
  //how to test this?!
  it('should follow 302 when login is invalid and show flash message');
});

describe('logging in by POSTing to /login', function() {
    it('without valid username cannot login');
    it('without valid password cannot login');
    it('with valid credentials can login');
});

describe('logging out by GETing /logout', function() {
  it('should log out the logged in user');
  it('should throw no errors if there is no user logged in');
});
```

Firstly in order to create users it's necessary to `npm install --save bcrypt` and then (borrowing liberally from StackOverflow) create a module that hashes and salts a given password and saves a user with that hash into the database.

```js 
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

module.exports = function(db) {
  return {
    create: function(username, password, callback) {
        bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
            if (err) {
                callback(err);
                return;
            }
            bcrypt.hash(password, salt, function(err, hash) {
                if (err) {
                    callback(err);
                    return;
                }
                db.users.save({
                    username:username,
                    password:hash
                }, function(err, result) {
                    if(err) {
                        callback(err.err);
                    } else {
                        callback('user created');
                    }
                });
            });
        });
    }
  };
};
```

This function takes a database parameter so that the tests and the command line runner that exercise it can pass in different databases. It also demonstrates the smelliness of nested callbacks that I've put off dealing with three times now... hitting the same problem three times is a definite flag it's time to deal with it!

(but not _right_ now)

as an aside - [a colleague](https://twitter.com/LemoncogFoReal) spotted how smelly this code is [in a screenshot on twitter from across a room!](https://twitter.com/LemoncogFoReal/status/468024884741013504) 

# Logging in Tests
The test setup for the logging in tests is slightly different as it's necessary to grab the underlying SuperAgent instance that SuperTest wraps. SuperAgent will manage its cookies so you can extend the example below to allow tests of behaviour once logged in.

```js 
var request = require('supertest');
var expect = require('chai').expect;

var server;
var agent;
var db;
var login;

beforeEach(function() {
    //set environment to test and init things
    process.env.NODE_ENV = 'test'; 
    db = require('../server/db').db;
    server = require('../server').app;
    agent = request.agent(server);
});
```

Having access to the agent and the server application then allows test that look like 

```js 
    it('without valid username cannot login', function(done) {
        agent
          .post('/login')
          .send({ username: 'not a real user', password: 'password' })
          .end(function(err, res) {
            expect(res.status).to.equal(302);
            expect(res.header.location).to.equal('/login');
            done();
          });
    });
```

Not hugely different in syntax to the SuperTest tests but necessary in order to interact with the session.
