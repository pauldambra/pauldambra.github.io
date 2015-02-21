--- 
title: "Reactotype Part 3" 
layout: "post" 
permalink: "/reactotype/part-three.html" 
date: "2015-02-20 22:41:00"
description: "exploring ReactJS"
keywords: reactjs js yeoman gulp html css web tdd mocha
---

At the end of the last post I realised I'd sacrificed some good practice in the blind rush to make it work (i.e. worked normally like all those other guilty software engineers everywhere everyday.)

So earlier today I played with the kids to tire them out enough that I could distract them with television and write some #holidaycode because I am a good(-ish) parent.

Messagebus channels and topics
==============================

In the last post we (I) used magic strings to identify the channel and topic that messages were being published to.

I'm not completely sold on this particular structure:

{% highlight JS %}
var messageBusStructure = {
	channels: {
		filters: 'filters'
	},
	topics: {
		filters: {
			yearBoundsChange: 'year.bounds.change'
		}
	}
};
{% endhighlight %}

but the general idea holds since it should mean that the postal publish/subscribe code is less prone to tyoing errors.

{% highlight JS %}
postal.subscribe({
	channel: bus.channels.filters,
	topic : bus.topics.filters.yearBoundsChange,
	callback: function(d, e) {
		this.filterData(d);
	}
}).context(this);

//is better than

postal.subscribe({
	channel: "filters",
	topic : "year.bounds.change",
	callback: function(d, e) {
    	this.filterData(d);
  	}
}).context(this);
{% endhighlight %}

Kill duplication with fire
==========================

Then I componentised (ugh, is that a word?!) the input controls being used in the FilterBox so I could kill the duplication of handling their events.

{% highlight JS %}
var YearFilterInput = React.createClass({
	publishOnChange: function(event) {
		var eventData = {};
		eventData[this.props.name.toLowerCase()] = 
			parseInt(event.target.value, 10);

		postal.publish({
			channel: bus.channels.filters,
			topic : bus.topics.filters.yearBoundsChange,
			data: eventData
		});
	},
	render: function() {
		return (
				<div className="form-group">
					<label htmlFor={this.props.name}>{this.props.name}</label>
					<input type="number" 
						   name={this.props.name}
						   className="form-control"
						   defaultValue={this.props.default}
						   min={this.props.initialEarliest} 
						   max={this.props.initialLatest}
						   onChange={this.publishOnChange}/>
				</div>
		);
	}
});

var FilterBox = React.createClass({
	render: function() {
		return (
			<div className="col-xs-12">
				<YearFilterInput name="Earliest" 
								 default={this.props.initialEarliest}
								 initialEarliest={this.props.initialEarliest}
								 initialLatest={this.props.initialLatest} />
				<YearFilterInput name="Latest" 
								 default={this.props.initialLatest}
								 initialEarliest={this.props.initialEarliest}
								 initialLatest={this.props.initialLatest} />
			</div>
		);
	}
});
{% endhighlight %}

This changed the structure of the data that forms the message.

{% highlight JS %}
publishOnChange: function(event) {
	var eventData = {};
	eventData[this.props.name.toLowerCase()] = 
		parseInt(event.target.value, 10);

	postal.publish({
		channel: bus.channels.filters,
		topic : bus.topics.filters.yearBoundsChange,
		data: eventData
	});
}
{% endhighlight %}

Now, since the component only knows about itself, the eventdata is an object with this component's identifer as a property and the new integer value of the input control as the value for the property.

I didn't want to read both Year filter values in order to send the (currently) two filter inputs as the last version of the code did. There's little point it being a component if it has to know about other components on the page to work.

That does mean that the `PayTable` subscriber to this message had to change how it handled the message.

[React Add-ons](http://facebook.github.io/react/docs/addons.html) (which it turns out is an awesome thing) has an update helper which is used to [merge](http://facebook.github.io/react/docs/update.html#shallow-merge) the newly received filterBounds into the existing state. 

{% highlight JS %}
//the paytable now does
var newState = React.addons.update(this.state, {$merge: filterBounds});
{% endhighlight %}

Where previously the code replaced the state with the message body because we'd coupled everything up and implicitly the message body was known to match the state.

This _should_ be better since, if I go on to fangle this much, it should handle change better as the `PayTable` makes fewer assumptions about the message payload.

Testing
=======

It was already getting to be a pain going to the site and changing values in the boxes to check that things were working the way I expected... which means we need tests!

Facebook have created Jest which is (I think) a wrapper around Jasmine. I tend to use Mocha... and to be honest I didn't want to learn another new thing right now if I could avoid it. So I wondered if anyone else had solved the problem (and eventually realised they had.)

The steps I ended up taking were:

#1. Install Mocha

easy!

{% highlight bash %}
npm install --save-dev mocha
npm install --save-dev gulp-mocha
npm install --save-dev should
{% endhighlight %}

#2. Add a gulp task to run tests

also easy!

{% highlight JS %}
gulp.task('test', function() {
    //this require line took me a while to figure out!
    //more below!
	require('./tests/compiler.js');
	return gulp.src(['tests/*Spec.js'], { read: false })
	.pipe(mocha({
		reporter: 'spec',
		globals: {
			should: require('should')
		}
	}));
});
{% endhighlight %}

If you don't Gulp this just says grab all of the javascript files in the tests folder whose names end with Spec and pass them into Mocha.

#3. Actually have some tests

Not actually quite so easy!

I had to `npm install` [jsdom](https://github.com/tmpvar/jsdom) since React has to have a DOM to work against. And then figure out (read largely copy from other people on the Google) how to have React render into that DOM. The secret-sauce was in the [React.addons.TestUtils](http://facebook.github.io/react/docs/test-utils.html) which continues the React.addons reign of awesome.

The end result (snipped a little for clarity) was:

{% highlight JS %}
'use strict';

var jsdom = require('jsdom');
var React = require('react/addons');
var postal = require('postal');
var bus = require('../app/scripts/messageBus');
var FilterBox = require('../app/scripts/filterBox');
var TestUtils = React.addons.TestUtils;

var handlerReceived;

before(function() {
	postal.subscribe({
		channel: bus.channels.filters,
		topic : bus.topics.filters.yearBoundsChange,
		callback: function(data) {
			handlerReceived = data;
		}
	});
});

describe('the filter box', function() {
	var filterBoxInputs;

	beforeEach(function() {
		handlerReceived = null;
		
		//fake a DOM for React to use
		global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
		global.window = document.parentWindow;

		var filterBox = TestUtils.renderIntoDocument(
			<FilterBox initialEarliest={1990} initialLatest={2010}/>
		);

		filterBoxInputs = TestUtils.scryRenderedDOMComponentsWithTag(filterBox, 'input');
	});

	describe('has a single earliest year input that', function() {
		var earliestInput;

		beforeEach(function() {
			var matchedInputs = filterBoxInputs.filter(function(element) {
				return element.props != undefined 
						&& element.props.name === 'Earliest';
			});
			matchedInputs.length.should.be.exactly(1);
			earliestInput = matchedInputs[0];
		});

		it('publishes an event when value changes', function() {
			TestUtils.Simulate.change(earliestInput, {target: {value: '1991'}});
			handlerReceived.should.match({earliest:1991});
		});

		it('sets initial earliest on render', function() {
			earliestInput.props.value.should.be.exactly(1990);
		});
	});

	describe('has a single latest year input that', function() {
		// ..snip
	});
});
{% endhighlight %}

So, just once, we subscribe to the message we're expecting our React component to publish and store the message body.

{% highlight JS %}
var handlerReceived;

before(function() {
	postal.subscribe({
		channel: bus.channels.filters,
		topic : bus.topics.filters.yearBoundsChange,
		callback: function(data) {
			handlerReceived = data;
		}
	});
});
{% endhighlight %}

and then need to have a setup for each test:

{% highlight JS %}
var filterBoxInputs;

beforeEach(function() {
	handlerReceived = null;
	
	//fake a DOM for React to use
	global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
	global.window = document.parentWindow;

	var filterBox = TestUtils.renderIntoDocument(
		<FilterBox initialEarliest={1990} initialLatest={2010}/>
	);

	filterBoxInputs = TestUtils.scryRenderedDOMComponentsWithTag(filterBox, 'input');
});
{% endhighlight %}

Here the handlerReceived is reset each time and then the global document and window variables that a browser would provide are setup.

TestUtils does the magic of rendering the component into that document. I guess it should be possible to compile the jsx to js and then use the actual `React.render` to put that into the document but that seems like a lot of work compared to `TestUtils.renderIntoDocument`.

Then a second use of `TestUtils`, with my first meeting of the word "scry" outside of fantasy novels, where `TestUtils.scryRenderedDOMComponentsWithTag` grabs input elements out of the rendered React component.

Well, no, it grabs any React components that shadow input controls. Not DOM elements as you might get from `document.getElementById` but the React equivalent.

For each input in the Filter box, as it stands, I want to run the same tests and since there are only two inputs right now I'm happy to stand that duplication until I need to remove it. So there are two describe blocks that are basically the same:

{% highlight JS %}
describe('has a single earliest year input that', function() {
	var earliestInput;

	beforeEach(function() {
		var matchedInputs = filterBoxInputs.filter(function(element) {
			return element.props != undefined 
					&& element.props.name === 'Earliest';
		});
		matchedInputs.length.should.be.exactly(1);
		earliestInput = matchedInputs[0];
	});

	it('publishes an event when value changes', function() {
		TestUtils.Simulate.change(earliestInput, {target: {value: '1991'}});
		handlerReceived.should.match({earliest:1991});
	});

	it('sets initial earliest on render', function() {
		earliestInput.props.value.should.be.exactly(1990);
	});
});
{% endhighlight %}

In this block's `beforeEach` it grabs any input with the desired name, asserts there is only one, and stores that component so that it can be asserted against.

One test is straighforward and asserts that the default value matches expectation.

In the other test `TestUtils.Simulate.change` saves our bacon and handles the work of changing the value of the input box. A little bit magic-incantation-y but readable enough that I can live with it.

That change should have caused a message to be published and the test is subscribed to those messages so it can assert that the message body was received and matches expectation.

But... But... Mocha can JSX?
============================

No, I found [this blog post](http://www.hammerlab.org/2015/02/14/testing-react-web-apps-with-mocha/) which borrowed [code from the Khan Academy](https://github.com/Khan/react-components/blob/7afcf35c921a2f984ddff71dead25217f8de3532/test/compiler.js) which can be passed to mocha as a compiler so that it can JSX when it needs to...

{% highlight JS %}
var fs = require('fs'),
    ReactTools = require('react-tools'),
    origJs = require.extensions['.js'];

require.extensions['.js'] = function(module, filename) {
  // optimization: external code never needs compilation.
  if (filename.indexOf('node_modules/') >= 0) {
    return (origJs || require.extensions['.js'])(module, filename);
  }
  var content = fs.readFileSync(filename, 'utf8');
  var compiled = ReactTools.transform(content, {harmony: true});
  return module._compile(compiled, filename);
};
{% endhighlight %}

This required the final NPM of the day adding in react-tools so that the JSX transformer was available.

And..

Ta-da
=====

<figure>
<img src="/images/tada.png" alt="passing tests" class="img-responsive img-thumbnail"/>
<figcaption>Ta-da!</figcaption>
</figure>