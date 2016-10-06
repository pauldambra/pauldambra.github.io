--- 
title: "Websites != CMS Platform - Promises - part 2" 
layout: "post" 
permalink: "/Websites-CMS-Platform-promises-part-2.html" 
date: "2014-06-01 08:11:00"
description: bluebird and stack exchange communities are awesome
keywords: node nodejs promises javascript bluebird stackexchange stackoverflow community
category: cms
tags: [js, learning, cms, design, web, series, promises]
---
This post is part of a series where I'm hoping to prove to myself that building a dynamic website with NodeJS is much more fun than using a CMS platform. [See the first post for an explanation of why](/2014/02/websites-cms.html)

The code can be found on [GitHub](https://github.com/pauldambra/omniclopse)

[Previous Post](/Websites-CMS-Platform-promises.html)

 So, in the last post I worked on switching some callback code to using promises with [Bluebird](https://www.npmjs.org/package/bluebird) library but as I've not seen much promisified (definitely a word!) code I wasn't sure whether it was any good.

 So I posted [a question on the code review stackexchange](http://codereview.stackexchange.com/questions/51712/is-this-a-reasonable-way-to-implement-promises-in-node-js) asking for feedback.

<!--more-->

Here's the code I had written: 

```js 
//I'm using bluebird.js for promises
var users = Promise.promisifyAll(db.users);
var compare = Promise.promisify(bcrypt.compare);

//this strategy is used by passport to handle logins
module.exports.localStrategy = new LocalStrategy(function(username, password, done) {
  var matchedUser;

  var comparePassword = function(user){
    if(!user) {
      throw new NoMatchedUserError();
    }

    //memoise the loaded user so it can be returned below
    matchedUser = user;
    return compare(password, matchedUser.password);
  };

  users.findOneAsync({ username: username })
    .then(comparePassword)
    .then(function(isMatch) {
      return isMatch
        ? done(null, matchedUser)
        : done(null, false, { message: 'Incorrect password.' });
    })
    .catch(NoMatchedUserError, function() {
      return done(null, false, { message: 'Incorrect username.' });
    }) 
    .error(function(err) {
      return done(err);
    });
});
```

and here's the code that was suggested

```js 
//I'm using bluebird.js for promises
var users = Promise.promisifyAll(db.users);
var compare = Promise.promisify(bcrypt.compare);


// This strategy is used by passport to handle logins
module.exports.localStrategy = new LocalStrategy(function(username, password, done) {
  users.findOneAsync({username: username}).bind({})
    .then(function(user) {
        if (!user) {
          throw new NoMatchedUserError('Incorrect username.');
        }
        this.user = user;
        return compare(password, user.password);
    })
    .then(function(isMatch) {
      if (isMatch) {
        return this.user;
      }
      else {
        throw { message: 'Incorrect password.' };
      }
    })
    .nodeify(done);
});
```

there are a couple of differences here that led to some great learning for me!

# Bind

The first is [the bind function](https://github.com/petkaantonov/bluebird/blob/master/API.md#binddynamic-thisarg---promise). 

In JS there is [a method on the function prototype called bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind). Bind returns a new function identical to the original except that the first argument to bind sets the `this` context for the function and any subsequent arguments are 'stored' and precede any arguments given when the new function is eventually called.

```js 
var original = function() {
    console.log(this);
    console.log(arguments);
} // in a browser for example the original function logs the window object and an empty array

var withNoParameters = original.bind({ada:'lovelace'});
withNoParameters(); //logs Object {ada: "lovelace"} and an empty array

var withParameters = withNoParameters.bind({ada:'lovelace'},34)
withParameters(); //logs Object {ada: "lovelace"} and then [34]
withParameters('Hedy Lamarr'); //logs Object {ada: "lovelace"} and then [34, "Hedy Lamarr"] 
```

The bluebird bind function doesn't allow you to add arguments but does provide the ability to bind the context. Or rather of returning a promise bound to the given context. That context follows the promise down the chain (unless a new `Promise` is created)

So here we can use it to simplify the code:
```js 
var users = Promise.promisifyAll(db.users);
var compare = Promise.promisify(bcrypt.compare);

module.exports.localStrategy = new LocalStrategy(function(username, password, done) {
  users.findOneAsync({username: username})
    .bind({}) //replace the findOneAsync promise with one bound to an empty object
    .then(function(user) {
        this.user = user; // add or update a user property on the bound object 
        return compare(password, user.password);
    })
    .then(function(isMatch) {
      if (isMatch) {
        return this.user; //still able to refer to the same context
      }
    });
});
```

# Nodeify

The other fantabulous feature is [nodeify](https://github.com/petkaantonov/bluebird/blob/master/API.md#nodeifyfunction-callback---promise). In the original code above the promisify functions convert code that expects to receive a callback into code that returns a promise. Nodeify does the reverse and returns a promise that when it is resolved will call the provided callback. Or as the bluebird docs explain it:

> Register a node-style callback on this promise. When this promise is is either fulfilled or rejected, the node callback will be called back with the node.js convention where error reason is the first argument and success value is the second argument. The error argument will be `null` in case of success.

```js 
var users = Promise.promisifyAll(db.users);
var compare = Promise.promisify(bcrypt.compare);

module.exports.localStrategy = new LocalStrategy(function(username, password, done) {
  users.findOneAsync({username: username}).bind({})
    .then(function(user) {
        this.user = user;
        return compare(password, user.password);
    })
    .then(function(isMatch) {
      if (isMatch) {
        return this.user;
      }
    }).nodefiy(done); //on success calls done(null, this.user)
});
```

# So
These were both transformative for me. I now have a way to plug promises into my code bit by bit and to carry on using libraries that know nothing about promises.

# But
Passport uses an optional third argument to populate the flash message so you can put a meaningful message in front of a user when they try to login and aren't successful.

I poked at nodeify with a stick and a glass of wine and couldn't make that work... because nodeify only passes on the error object or the success value.

# Wonderful Community
After reading the code for nodeify and realising I had far less idea how JS works than than I thought I did and much, much less than the library authors I [posted on StackOverflow](http://stackoverflow.com/questions/23920589/how-to-pass-a-third-argument-to-a-callback-using-bluebird-js-nodeify) with an example of what I wanted to achieve

```js 
module.exports.localStrategy = new LocalStrategy(function(username, password, done) {
  users.findOneAsync({username: username}).bind({})
    .then(function(user) {
        if (!user) {
          throw new NoMatchedUserError('Incorrect username.');
          //should be equivalent to:
          // return done(null, false, {message:'something'});
        }
        this.user = user;
        return compare(password, user.password);
    })
    .then(function(isMatch) {
      if (isMatch) {
        return this.user;
        //is equivalent to:
        // return done(null, this.user);
      }
      else {
        throw { message: 'Incorrect password.' };
        //should be equivalent to:
        // return done(null, false, {message:'something else'};
      }
    })
    .nodeify(done);
});
```

Apart from a message confirming that it wasn't currently possible to use nodeify that way I also got comments from one of the Bluebird project committers that he thought this was a decent use-case and could I log an issue...

[I did](https://github.com/petkaantonov/bluebird/issues/219)...

[And they've added the feature for version 2.0](https://github.com/petkaantonov/bluebird/commit/5ca7743c8f8260d43c2f25951e65177d71450d1c#diff-218b9ea0594b584c56937aadfc377657)

I really love it when a project is responsive! Gives me confidence that they care about what they're building and I'm safe to be using it.

(yes, I'm a massive hippy :-))

# And
So I forked Bluebird, cloned it, switched to the 2.0 branch and ran npm build. I (relatively lazily) copied the built js files over the v1.2.4 files that npm had installed in the project and changed the code to use the new feature (with some comments added for this post)...

```js 
module.exports.localStrategy = new LocalStrategy(function(username, password, done) {
  users.findOneAsync({ username: username })
    .bind([]) //now the context needs to be an array
    .then(function(user){
      if(!user) {
        throw new NoMatchedUserError();
      }
      this[0] = user; //the first item in the context should be the user
      return compare(password, this[0].password);
    })
    .then(function(passwordsMatch) {
      if (!passwordsMatch) {
        this[0] = false; //don't return a user (as they cannot login)
        this[1] = 'Incorrect password.'; //add a message that passport can use for a flash message
      }
      return this;
    })
    .catch(NoMatchedUserError, function() {
      this[0] = false; // couldn't find a user so don't return one
      this[1] = 'Incorrect username.'; //add a message that passport can use for a flash message
      return this;
    }) 
    .error(function(err) {
      return err;
    })
    .nodeify(done, {spread:true}); // Yay! 
});
```

My code looks how I wanted, does what I wanted, I grok promises much more, and I've learned that the bluebird developers are lovely. Awesomeness! 