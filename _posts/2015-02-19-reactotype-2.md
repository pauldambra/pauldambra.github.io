--- 
title: "Reactotype Part 2" 
layout: "post" 
permalink: "/reactotype/part-two.html" 
date: "2015-02-19 22:00:00"
description: "exploring ReactJS"
keywords: reactjs js yeoman gulp html css web
category: react
tags: [learning, react, js, series]
---

I posted about my [impressions of working with React](/reactotype/part-one.html) slowly building an HTML table and banging on about it. I ended that post with one of the more memorable cliff-hangers in recent time.

> Sorting and Filtering the Table
> ===============================
> 
> That we will leave till part two... because I introduced a relatively artifical constraint that I didn't want the filtering control to be a part of the table.
> 
> Imagine that there will be many tables with the same filter. I don't want to bind the filter to any one table or insist that every table has it.
> 
> At first I expected that it would force me to understand React's components and how to compose them... instead I stumbled on something really cool #cliffhanger

Exciting! Right?

I want to add a filter control and I don't want it to be bound to a particular table so that it can be easily re-used. 

<!--more-->

So, having squeezed the table to make space for a column for filter controls I needed to do two things 

1. Add the filter controls
2. Make them affect the table

![screenshot of the web page](/images/reactotype_screenshot.png)

# Adding the filter controls

Once I'd made a static HTML version of the filter controls and knew that I was aiming for a number input for the earliest year to display and one for the latest.

```html 
<div className="col-xs-12">
	<div className="form-group">
		<label htmlFor="earliest">Earliest</label>
		<input type="number" 
			   name="earliest"
			   className="form-control" />
	</div>
	<div className="form-group">
		<label htmlFor="latest">Latest</label>
		<input type="number" 
			   name="latest" 
			   className="form-control" />
	</div>
</div>
```

Copying what I already had to turn this into a React component was a very short job. And then I moved onto a little research to see what approaches there were to solve my problem and I stumbled on [a blog exploring React](http://tech.pro/blog/2020/a-thrown-to-the-wolves-hands-on-introduction-to-react) that used a JS pub/sub library called [postal.js](https://github.com/postaljs/postal.js).

> What is it?

> Postal.js is an in-memory message bus - very loosely inspired by AMQP - written in JavaScript. Postal.js runs in the browser, or on the server using node.js. It takes the familiar "eventing-style" paradigm (of which most JavaScript developers are familiar) and extends it by providing "broker" and subscriber implementations which are more sophisticated than what you typically find in simple event emitting/aggregation.

```javascript 
/** @jsx React.DOM */
'use strict';

var React = window.React = require('react');
var postal = window.postal = require('postal');

var FilterBox = React.createClass({
    getInitialState: function() {
        return {
            earliest: this.props.initialEarliest,
            latest: this.props.initialLatest
        };
    },
    handleEarliestChange: function(event) {
    	this.setState({earliest: parseInt(event.target.value, 10)}, function() {
    		postal.publish({
    			channel: 'filters',
    			topic: 'year.bounds.change', 
    			data: this.state
    		});
    	});
    },
    handleLatestChange: function(event) {
    	this.setState({latest: parseInt(event.target.value, 10)}, function() {
    		postal.publish({
    			channel: 'filters',
    			topic: 'year.bounds.change', 
    			data: this.state
    		});
    	});
    },
    render: function() {
        return (
        	<div className="col-xs-12">
        		<div className="form-group">
        			<label htmlFor="earliest">Earliest</label>
        			<input type="number" 
        				   name="earliest"
        				   className="form-control"
        				   defaultValue={this.state.earliest}
        				   min={this.props.initialEarliest} 
        				   max={this.props.initialLatest}
        				   onChange={this.handleEarliestChange}/>
        		</div>
        		<div className="form-group">
        			<label htmlFor="latest">Latest</label>
        			<input type="number" 
        				   name="latest" 
        				   className="form-control"
        				   defaultValue={this.state.latest}
        				   min={this.props.initialEarliest} 
        				   max={this.props.initialLatest}
        				   onChange={this.handleLatestChange}/>
        		</div>
        	</div>
        );
    }
});

module.exports = FilterBox;
```

What do we have?
----------------

#### Render

```javascript 
render: function() {
    return (
    	<div className="col-xs-12">
    		<div className="form-group">
    			<label htmlFor="earliest">Earliest</label>
    			<input type="number" 
    				   name="earliest"
    				   className="form-control"
    				   defaultValue={this.state.earliest}
    				   min={this.props.initialEarliest} 
    				   max={this.props.initialLatest}
    				   onChange={this.handleEarliestChange}/>
    		</div>
    		<div className="form-group">
    			<label htmlFor="latest">Latest</label>
    			<input type="number" 
    				   name="latest" 
    				   className="form-control"
    				   defaultValue={this.state.latest}
    				   min={this.props.initialEarliest} 
    				   max={this.props.initialLatest}
    				   onChange={this.handleLatestChange}/>
    		</div>
    	</div>
    );
}
```

Here we've added a react specific attribute `defaultValue` to set the starting state of the inputs, added min and max validation using properties passed in to the component and an onChange handler specific to each number input.


####Initial state

```javascript 
getInitialState: function() {
    return {
        earliest: this.props.initialEarliest,
        latest: this.props.initialLatest
    };
}
```

Here the default values for the earliest and latest state are set.

####Event Handlers

These two handlers are basically the same except for operating on a different property of the state object.

Yes, yes, kill all duplication. But... the duplicate methods are next to each other and I've half a mind to make each control a React component which would remove this duplication so why do that work twice.

(I got all excited about postal.js and wrote this post before finishing the component)

```javascript 
handleLatestChange: function(event) {
	this.setState(
		{latest: parseInt(event.target.value, 10)}, 
		function() {
			postal.publish({
				channel: 'filters',
				topic: 'year.bounds.change', 
				data: this.state
			});
		}
	);
}
```

Here when an event is received the function calls [`setState`](http://facebook.github.io/react/docs/component-api.html#setstate) on the React component. This merges the object provided as the first argument with the component's current state. 

Since that update doesn't necessarily occur immediately the method takes a callback which runs after the update completes.

In this case the callback uses postal to publish a message. Postal allows you to hold a reference to a channel but here we're using a convenience method that allows you to specify the channel.

```javascript 
postal.publish({
	channel: 'filters',
	topic: 'year.bounds.change', 
	data: this.state
});
```

So, on channel 'filters' publish a message with the topic 'year.bounds.change' including the component's state as the message data.

(and yes the first thing I did when subscribing was type in one of those magic strings incorrectly so there's an obvious improvement to be made in my usage there!)

This gives us a phenomenally useless pub/sub mechanism with no subscribers...

# Subscribing is even harder

```javascript 
componentWillMount: function() {
	postal.subscribe({
	  channel: "filters",
	  topic : "year.bounds.change",
	  callback: function(data, envelope) {
	    this.filterData(data);
	  }
	}).context(this);
```

Postal's subscribe helper takes an object with the same properties as publish. Here for messages posted to a given channel and topic it will call the provided callback.

The [`componentWillMount`](http://facebook.github.io/react/docs/component-specs.html#mounting-componentwillmount) method of the React component is called once before initial rendering so it is perfect for this setup.

# Messy Pay Table Reacting to Filtering

```javascript 
var PayTable = React.createClass({
    getInitialState: function() {
        return {
            sortDirection: 'descending',
            data: this.props.payYears.sort(sortDescending)
        };
    },
    preparePayData: function(data, options) {
        if (options.yearBounds) {
            data = data.filter(function(element) {
                        return element.year >= options.yearBounds.earliest 
                            && element.year <= options.yearBounds.latest;
                    })
        }
        if (options.sortDirection) {
            data = data.sort(options.sortDirection==='descending' 
                                ? sortDescending
                                : sortAscending);
        }
        this.setState({data: data});
    },
    sortData: function() {
        this.setState({sortDirection: this.state.sortDirection === 'descending'
                                     ? 'ascending'
                                     : 'descending'}, 
                      function() {
                        this.preparePayData(this.props.payYears, this.state);
                      })
    },
    filterData: function(filterBounds) {
        this.setState({yearBounds: filterBounds}, function() {
            this.preparePayData(this.props.payYears, this.state);
        });
      },
        componentWillMount: function() {
        postal.subscribe({
          channel: "filters",
          topic : "year.bounds.change",
          callback: function(d, e) {
            this.filterData(d);
          }
        }).context(this);
      },
    render: function() {
        return (
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th onClick={this.sortData}
                            className={this.state.sortDirection}>
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

`PayTable` now has a `preparePayData` method which has the responsibility of taking some data and the component's current state and setting the state's data property correctly.

Now all the `filterData` and `sortData` methods need to do is update state and then call `preparePayData`.

The point here is how easy it was to use postal.js to hook these two components together. I _lurve_ this!

![demo of the web page](/images/reactotype.gif)

# Next Up

A little bit of tidying up and add a chart view. #holidaycode