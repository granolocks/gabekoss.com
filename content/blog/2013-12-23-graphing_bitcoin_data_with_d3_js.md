---
title: Graphing Bitcoin data with D3.js
created_at: 2013-12-23 14:44
updated_at: 2013-12-23 14:44
kind: blog-post
author: Gabe Koss
summary: The result of helping my friend play with some of his bitcoin data.
tags: 
 - d3
 - bitcoin
 - javascript
--- 

<script src="/js/d3-v3-min.js" charset="utf-8"></script>
<script src="/js/jquery-1-10-1-min.js"></script>

<style type="text/css">
  #graph-wrapper {
    padding: 10px;
    background-color: rgba(20, 20, 20,0.2); 
    } 
</style>

A technology I have been curious to experiment with lately is [D3.js](http://d3js.org/) a
Javsascript graphing library using SVGs. A friend was looking for a little
assistance creating a graph of the prices of bitcoins over time and I decided
to try it out with D3. 

## The Data

The data coming in was JSON data containing a `time` key with a Unix timestamp
and a `last` key containing the last see price at that moment.

```json
[ {"time":1387774950.180666,"last":678.94998}, 
  ... 
  {"time":1387809762.27258,"last":670.0} ]
```

## The Graph

Before digging into the code for this its nice to show the finished product.
Here is the graph I ended up with:

<div id="graph-wrapper">
  <div id="graph"></div>
</div>

It is worth noting that the X Axis times are static as this was built from a
[static json file](/json/trade_data.json).

## The Code

### Markup

The markup for this is very simple.

**Include the JS**

```html
<script src="/js/d3-v3-min.js" charset="utf-8"></script>
<script src="/js/jquery-1-10-1-min.js"></script>
<script src="/js/d3_bitcoin.js"></script>
```

**Some simple styles**

```css
#graph-wrapper { 
  padding: 10px; 
  background-color: rgba(20, 20, 20,0.2); 
} 
```

**Element where the graph will live**

```html
<div id="graph-wrapper">
  <div id="graph"></div>
</div>
```

### Set document variables 

These are some helpful definitions which will be used throughout the script
which builds the graph.

```js
// Padding on left of graph
var graphPadding = 60;

// Width of SVG palette and of graph, respectively
var fullWidth = document.getElementById('graph').offsetWidth;
var width = (fullWidth-graphPadding);

// Height of SVG palette and of graph, respectively
var fullHeight = 320;
var height = (fullHeight-20);
```

### Set up containers

Next, I added an SVG to `div#graph`. I stored this as `palette` and it has the
dimensions of `fullHeight` x `fullWidth`.

```js
// palette to draw graph and elements
var palette = d3.select("#graph").append("svg").
  attr("width", fullWidth).
  attr("height", fullHeight);

// secondary svg to hold graph, slightly smaller than palette
var lineContainer = palette.append("g").
  attr("x", graphPadding).
  attr("height", height).
  attr("width", width);

// Other groups
var edgeGroup = palette.append("g");
var lineGroup = palette.append("g");
```

### Get the Data
The data for this request is being loaded from `/json/trade_data.json` and so I
used jQuery to pull this in  with `$.getJSON`. This is passed to the function
as the `data` argument.

```js
$(document).ready(function(){
  // Get the data and do the thing
  $.getJSON('/json/trade_data.json', function(data){
    // 
    // All code goes here
    // 
  }
}
```

Everything after this point was placed inside the function block. 

### Split Data

My approach was to split the array of hashes into two sequenced arrays called
`time` and `last. 

```js
var time = [];
var last = [];

$(data).each(function(i,tick){
  time.push(tick.time);
  last.push(tick.last);
});
```

### Set up X and Y coords

There are many ways to do this, but since I was only graphing a single set of
data with two dimensions I bound these strongly to the coordinate systems. I
created `x` and `y` objects to handle processing related to `time` and `last`
respectively.

```js
var x = {};
x.data   = time;
```

Set up a min and max to use for our graph domain and other purposes. This uses
the helpers `d3.min()` and d3.max()` and passes in the `time` data as the
argument.

```js
x.min    = d3.min(x.data);
x.max    = d3.max(x.data);
```

Set up the range for the x axis. This range is very important to creating the
graph and requires a bit of setup. It needs a `domain` which is the data range
that it is responsible for covering. In this case I used `x.min` and `x.max`.

It also needs a `range` which is the range of values which to map the data
domain to. In this case it is the area covered by the graph on the x-axis: the
`graphPadding` value to the `fullWidth` value.


```js
x.domain = [x.min, x.max];
x.range  = [graphPadding, fullWidth]; 
x.scale  = d3.scale.linear().
              domain(x.domain).
              range(x.range);
```


Define a time range axis to display to the user. To keep all this data together
I placed in a sub boject.

```js
x.axis   = {
  min: new Date(x.min*1000),
  max: new Date(x.max*1000)
}
x.axis.scale = d3.time.scale().
                  domain([x.axis.min,x.axis.max]).
                  range(x.range);
x.axis.axis  = d3.svg.axis().
                  scale(x.axis.scale).
                  orient("bottom");
```

The `y` object I used is fairly similar to the `x` although a bit simpler.

```
var y = {};
y.data   = last;
y.min    = d3.min(y.data);
y.max    = d3.max(y.data);
y.domain = [y.max, y.min];
y.range  = [0, height];
y.scale  = d3.scale.linear().
              domain(y.domain).
              range(y.range);
y.axis   = {
  axis: d3.svg.axis().
           scale(y.scale).
           orient("left");
}
```

### Add X and Y axis objects

I use the `d3.svg.axis` objects which were created as part of the `x` and `y`
setup to create the scales on the left and bottom of the graph. Notice how
these are appended to the `edgeGroup` and have to be moved around with
`transform` operations.

```js
edgeGroup.append("g").
  attr("stroke-width", 1).
  attr("transform", "translate("+graphPadding+",0)").
  attr("class", "axis").
  call(y.axis.axis);

edgeGroup.append("g").
  attr("transform", "translate(0,"+(fullHeight-20)+")").
  attr("class", "axis").
  call(x.axis.axis);

edgeGroup.selectAll('.axis path').
  style({
    'stroke': '#000',
    'fill': 'none',
    'stroke-width': '1px'
  });
```

### Add the Line

The final step is to append a `svg:path` to the `lineGroup`. This path is
rendered in the `lineFunction`. 

```js
var lineFunction = d3.svg.line()
  .y(function(d,i) { return y.scale(y.data[i]); })
  .x(function(d,i) { return x.scale(x.data[i]); })
  .interpolate("basis");

var lineGraph = lineGroup.append("svg:path").
  attr("d", lineFunction(data)).
  attr("stroke", "#000" ).
  attr("stroke-width", 1).
  attr("fill", "none");
```

<script src="/js/d3_bitcoin.js"></script>
