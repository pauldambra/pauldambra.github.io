--- 
title: "Reactotype Part 1" 
layout: "post" 
permalink: "/reactotype/part-one.html" 
date: "2015-02-17 14:00:00"
description: "exploring ReactJS"
category: react
tags: [learning, react, js, series]
---

#### part one because I've got a feeling this is a topic about which I'll be able to bang on.

[React JS](http://facebook.github.io/react/index.html) was made by Facebook to be the V in MVC. In other words it only deals with the UI. It's sold as being fast - both for performance and development. A definitely contentious part of React is that it mushes JS and HTML together... More specifically you put HTML _inside_ the JS not vice versa.

<!--more-->

I've played with it [very briefly while prototyping an Imgur comment generator](https://pauldambra.github.io/commenturion/) and saw a talk on it recently at [MancJS](http://mancjs.com/#react). 

So I already had a few thoughts:

* I found I grokked things quicker with React than Angular when I built the commenturion examples. And I had zero React experience and reasonable Angular when I built those.
* (It might be that) you have to do things the React way 
	* I don't think this distinguishes it from other things
* JS & Code & HTML all mushed up together... 
	* I'm not sure if it feels wrong because it's unfamiliar or because it is wrong

# Why

We're using Angular in an application at work and without doubt it's allowed us to move fast but I do feel like there's a lot more of the typing to make things happen. And I still don't get directives even after several half-hearted attempts to understand them.

It seems like the cool-kids hold the position we should ditch everything for React. And both my toe-dipped-in-the-water and the talk I saw suggested there was something worth investigating. So I thought I'd use my #holidaycode time to investigate.

# What

Most of my front-end work for the last eight months and most for the foreseeable future is data-visualisation heavy so that's what I wanted to riff on.
<!--alex ignore gross --->
I grabbed some data on the gender pay gap in the UK from the [Annual Survey of Hours and Earnings, 2014 Provisional Results.](http://www.ons.gov.uk/ons/dcp171778_385428.pdf) And decided to use a simplified version of [the source for Figure 8](http://www.ons.gov.uk/ons/rel/ashe/annual-survey-of-hours-and-earnings/2014-provisional-results/chd-8-gpg.xls). Showing the gender pay gap for median gross hourly earnings (excluding overtime), UK, April 1997 to 2014
<!--alex ignore daughters-sons --->
Now to represent as a table and a chart so a good starting point. Plus I've got three daughters so it's a subject close to my heart.

# How

As I sat down and thought about what this would mean (writing a build script to mush the jsx into js, grabbing bootstrap et al from the interweb, etc) I was overcome with ennui (which is a lot to cope with for something that should be #holidaycode levels of fun). I've done that set up so many times it seemed like wasted time.

#### Setup

I remembered [Yeoman.io](http://yeoman.io) and a quick search found a ReactJS with Gulp yeoman generator was available so I grabbed them:

```bash 
mkdir reactotype && cd reactotype
npm install -g yo
npm install -g generator-react-gulp-browserify
yo react-gulp-browserify
```

Fast, simple, easy, and...

The [gulp setup](https://github.com/pauldambra/reactotype/blob/776d915fb9138532df21b2ac97518ba90f152543/gulpfile.js) was _sooooo_ much better than I could have managed myself. Browserify & reactify so that I can use CommonJS modules and it all ends up in the browser correctly. 

And [gulp webserver](https://www.npmjs.com/package/gulp-webserver)! I love finding new (to me), awesome (to me) things 

```javascript 
gulp.task('serve', function () {
    gulp.src('./dist')
        .pipe($.webserver({
            livereload: true,
            port: 9000
        }));
});
```

Seems like overkill when I can do `python -m SimpleHTTPServer` since I'm only making static HTML with some JS but... I have to remember to type that in and it means I need a terminal window for running that. This way I can `gulp watch` and it re-smooshes file changes and serves them up for me.
<!--alex ignore simple --->
Simple! And simple is my favourite thing (that I find hard to achieve).

I like Gulp for the same reason that I prefer Rake to MSBuild. I can read & write code so I can figure out what it's doing (or force it do something undesirable if I don't know the sensible thing). Whereas with Grunt or MSBuild unless you know the JSON/XML magic incantation you're stuck.

# Approach
I started with a static HTML file and [bit-by-bit](https://github.com/pauldambra/reactotype/tags) added features using React. First rendering the table, then sorting it, then allowing sorting and filtering by year.

All the code is up [on Github](https://github.com/pauldambra/reactotype).

So I created a module which gives out a list of `PayYear`s. 

```javascript 
{'year': '1997', 'all': 27.5, 'fulltime': 17.4, 'parttime': 0.6 } 
```

A `PayYear` has a year, the percentage pay gap between genders for all employment, for fulltime and for parttime.

# Rendering the table

```javascript 
/** @jsx React.DOM */
'use strict';

var React = window.React = require('react');

var PayRow = React.createClass({
    render: function() {
        return (
            <tr>
                <td>{this.props.payYear.year}</td>
                <td>{this.props.payYear.all}</td>
                <td>{this.props.payYear.fulltime}</td>
                <td>{this.props.payYear.parttime}</td>
            </tr>
        );
    }
});

var PayTable = React.createClass({
    render: function() {
        return (
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Year</th>
                        <th>All</th>
                        <th>Full-time</th>
                        <th>Part-time</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.payYears.map(function(payYear) {
                      return <PayRow key={payYear.year} payYear={payYear} />;
                    })}
                </tbody>
            </table>
        );
    }
});

module.exports = PayTable;
```

So...
`/** @jsx React.DOM */`
This is so that the [JSX magic](http://facebook.github.io/react/docs/jsx-in-depth.html) can turn this into real Javascript. JSX is the thing that let's you mix HTML into your JS.

Looking at the code that creates a table row.

```javascript 
var PayRow = React.createClass({
    render: function() {
        return (
            <tr>
                <td>{this.props.payYear.year}</td>
                <td>{this.props.payYear.all}</td>
                <td>{this.props.payYear.fulltime}</td>
                <td>{this.props.payYear.parttime}</td>
            </tr>
        );
    }
});
```

[`createClass`](http://facebook.github.io/react/docs/top-level-api.html#react.createclass) is a helper to construct an instance of a component class for you. That class has a render function which returns HTML.

Call JS, get HTML. Looks funky but is straightforward.
<!--alex ignore spit --->
It's saying that in order to have a PayRow you have to have something providing `this.props.payYear`, which has to have a minimum set of properties, and you spit out a table row as HTML.

That's pretty straightforward. 

Having said what a row of the table is we can say what the table is

```javascript 
var PayTable = React.createClass({
    render: function() {
        return (
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Year</th>
                        <th>All</th>
                        <th>Full-time</th>
                        <th>Part-time</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.payYears.map(function(payYear) {
                      return <PayRow key={payYear.year} payYear={payYear} />;
                    })}
                </tbody>
            </table>
        );
    }
});
```

So this says that to render a table you need a bunch of HTML and then take `this.props.payYears` and map it into a set of `PayRow`s that make up the table body.

Oh, and cause I only skimmed the docs, at first I missed that you have to add classes to HTML in JSX using className (since class is a reserved word in JS). 
<!--alex ignore spits --->
Elsewhere in the code we call `React.render(<PayTable payYears={data} />, document.getElementById('idOfContainer'));` and this spits the generated HTML into the page.

That's not weird... _really_. If you can HTML & JS then you can follow what is happening. Other than glossing over the magic JSX incantation, and what React.createClass does there's nothing new or complex here. It's only mashing one or more JS data structures into HTML templates. 

# Sorting

This was probably the hardest bit for me to wrap my head around. Because this isn't a framework this isn't provided for me. So, the horror, I had to write the code.

The only part to change was the PayTable code.

```javascript 
function sortAscending(a,b) {
  if (a.year < b.year)
     return -1;
  if (a.year > b.year)
    return 1;
  return 0;
};

function sortDescending(a,b) {
  if (a.year > b.year)
     return -1;
  if (a.year < b.year)
    return 1;
  return 0;
};

var PayTable = React.createClass({
    getInitialState: function() {
        return {
            sortDirection: 'descending',
            data: this.props.payYears.sort(sortDescending)
        };
    },
    sortData: function() {
        if(this.state.sortDirection==='descending') {
            this.setState({ 
                sortDirection: 'ascending',
                data: this.props.payYears.sort(sortAscending)
            });
        } else {
            this.setState({ 
                sortDirection: 'descending',
                data: this.props.payYears.sort(sortDescending)
            });
        }
    },
    render: function() {
        return (
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th onClick={this.sortData}
                            className={this.state.sortDirection}
                        >
                            Year
                        </th>
                        <th>All</th>
                        <th>Full-time</th>
                        <th>Part-time</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.data.map(function(payYear) {
                      return <PayRow key={payYear.year} payYear={payYear} />;
                    })}
                </tbody>
            </table>
        );
    }
});
```

First I had to come to terms with properties and state. So...

#### Properties

Passed in to the component when you create it. Should be immutable (this is JS so they aren't immutable but you're supposed to treat them as immutable).

#### State

Not passed in. Not immutable. It's the, erm, well, the state.

So in addition to a `render` function we add a [`getInitialState` function](http://facebook.github.io/react/docs/component-specs.html#getinitialstate). This provides the initial state of the component. It should be idempotent - i.e. no matter how many times the component is created, all other things being equal, the initial state is the same. 

I've spotted a "problem" with this... In the docs it is described as an [antipattern to assign a foo property to foo state](http://facebook.github.io/react/tips/props-in-getInitialState-as-anti-pattern.html). You can do it but instead you should have an intialFoo property that is assigned to the foo state. That change of calling out that the link between the two is that the property is the initial value and shouldn't be mutated within the component's state seems important to being in the React mindset.

Anyhoo, having decided that a user would be able to click on the Year column header and that interaction would sort the column and that the Year header would have a visual affordance to show the data is sortable and in which direction it currently is. This means that the initial state is the direction of the sort and the sorted data.

On the table header we assign an onClick handler that calls a `sortData` function. That function checks the current direction of sorting and uses that to pick the new direction and resort the data. Those two new items are assigned to the component's state.

In order to sort the data we call sort with a comparator function. So I wrote two comparators `sortAscending` and `sortDescending`.
<!--alex ignore devil --->
# OnClick is the work of the devil, though

Well, in a world where the JS that the onclick handler calls could be anywhere so maintaining the code is made harder, I totally agree. But here... the `sortData` function is six lines away. And will always be in the same file, nearby. 

Unless someone takes the time to move that behaviour out into some pure JS (which could well be a good thing) and then the JSX is coupled to the JS object rather than the JS object being coupled to the HTML (by needing to know the identifier of the element whose events it reacts to.

And, why should `<th onClick={this.sortData}>` be different from `<th ng-click="sortData">`?! Except, I suppose, that in the Angularified example I have to know where to go to find the `sortData` function because it's in a controller/directive somewhere whereas in the React version it's nearby or explicitly called.

I don't know, right now, where I stand on this.

# But
<!--alex ignore easy --->
Other than the dance to _get_ how to coordinate state so that the table would update this felt pretty easy and almost none of the typing. I could grok enough of React to do this in one sitting. 

As a result I (think I) could explain it to people and have a good expectation that they would be able to work with it, extend it, use the idea elsewhere.

That's the thing I've really enjoyed about working with React (on this admittedly small example). It seems like the application is going to be simpler and that stuff that acts together has to live together.

# Sorting and Filtering the Table

That we will leave till part two... because I introduced a relatively artificial constraint that I didn't want the filtering control to be a part of the table.

Imagine that there will be many tables with the same filter. I don't want to bind the filter to any one table or insist that every table has it.

At first I expected that it would force me to understand React's components and how to compose them... instead I stumbled on something really cool #cliffhanger
