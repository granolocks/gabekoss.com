---
title: Creating Github Style Punchcard Graph with D3
created_at: 2014-06-19 21:20
updated_at: 2014-06-19 21:20
kind: blog-post
author: Gabe Koss
summary: 
tags: 
 - d3
 - javascript
--- 

<script src="/js/d3-v3-min.js" charset="utf-8"></script>
<script src="/js/jquery-1-10-1-min.js"></script>

<style type="text/css">
  #graph-wrapper {
    width: 115%;
    padding: 10px;
    background-color: rgba(20, 20, 20,0.2); 
    } 
  .hover-circle:hover { fill: grey; }
</style>

I really like the [punchcard
graphs](https://github.com/granolocks/gabekoss.com/graphs/punch-card) which
Github produces. They are a cool way to get a perspective on how you have been
working on a given codebase. 

At the completion of a recent project which covered several different codebases
I was curious to see what that would look like in aggregate so, in order to
continue (slowly) progressing with `d3.js`, I created the following graph: 

<div id="graph-wrapper">
  <div id="graph"></div>
</div>

<script src="/js/d3-github-punchcard.js"></script>

## Process

For the curious here is how I created this graph: 

### 1. Gather Data

I pulled the raw data from Github directly. This is quite easy to do, simple
append `/graphs/punch-card-data` to any github repo url. The link for the graph
for this website is located at:

> `https://github.com/granolocks/gabekoss.com/graphs/punch-card`

This data takes the form of an Array of Arrays containing 3 elements each


```
 [
   <0-6>  : Day of Week, Y Axis Value,
   <0-23> : Hour of Day, X Axis Value,
   <n>    : Number of commits, Z Axis Value / Circle weight
  ]
```

In other words, the data looks like this: 

```json
[
  [0,0,0], [0,1,0], [0,2,0], [0,3,0], [0,4,0], [0,5,5],
  [0,6,4], [0,7,1], [0,8,2], [0,9,4], [0,10,0], [0,11,3],

  // you get the idea...

  [6,12,4], [6,13,15], [6,14,7], [6,15,6], [6,16,7], [6,17,24],
  [6,18,7], [6,19,13], [6,20,4], [6,21,8], [6,22,1], [6,23,1]]
]
```


### 2. Combine the Arrays

I pasted all the graph data blobs for each repo into a little ruby script and
put them all inside a big array called `DATA` This is the script I used to
generate the graph:

```ruby
require 'json'

DATA = [ 
 # [ ... ],
 # [ ... ],
 # [ ... ]
]

def combine
  empty_counter = []
  (0..6).to_a.each do |day|
    (0..23).to_a.each do |hour|
      empty_counter << [day,hour,0]
    end
  end

  DATA.inject(empty_counter) do |counter,data|
    data.each_with_index do |tpl,index|
      counter[index][2] += tpl[2]
    end
    counter
  end
end

File.write('combined.json', JSON.generate(combine))
```

In the `combined.json` output file I now had a single data set which still
mapped the first element to day, second element to the hour but with the third
element in each tuple containing sum total count of commits during that
day/hour.

### D3

After dropping the JSON file onto a public path I added the following markup:

```html
<script src="/js/d3-v3-min.js" charset="utf-8"></script>
<script src="/js/jquery-1-10-1-min.js"></script>

<style type="text/css">
  #graph-wrapper {
    width: 115%;
    padding: 10px;
    background-color: rgba(20, 20, 20,0.2); 
    } 
  .hover-circle:hover { fill: grey; }
</style>

<div id="graph-wrapper">
  <div id="graph"></div>
</div>

<script src="/js/d3-github-punchcard.js"></script>
```

In the `/js/d3-github-punchcard.js` file I placed the following script body.
It's a bit rough but it got the job done.

```javascript
var fullWidth = document.getElementById('graph').offsetWidth;
var graphPadding = 80;
var width = (fullWidth-graphPadding);
var fullHeight = 380;
var height = (fullHeight-30);
var days = [
  "Sunday", "Monday", "Tuesday", "Wednesday",
  "Thursday", "Friday", "Saturday"
];
var hours = [
  "12am", "1am", "2am", "3am", "4am", "5am", "6am", "7am", "8am",
  "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm",
  "6pm", "7pm", "8pm", "9pm", "10pm", "11pm"
];


var palette = d3.select("#graph").append("svg").
  attr("width", fullWidth).
  attr("height", fullHeight);

var dayGroup = palette.append("g");
var hourGroup = palette.append("g");
var circleGroup = palette.append("g");


$(document).ready(function(){
  $.getJSON('/json/d3-github.json', function(data){

    x = {
      min:  0,
      max:  width
    }
    x.step = x.max/24;

    y = {
      min:  0,
      max:  height
    }
    y.step = y.max/7;

  var dayText = dayGroup.selectAll("text")
                          .data(days)
                          .enter()
                          .append("text");
  var dayLabels = dayText
                   .attr("x", 0)
                   .attr("y", function(d) { return y.step*(days.indexOf(d)+1); })
                   .text(function (d) { return d; })
                   .attr("font-family", "sans-serif")
                   .attr("font-size", "12px");

  var hourText = hourGroup.selectAll("text")
                          .data(hours)
                          .enter()
                          .append("text");
  var hourLabels = hourText
                   .attr("x", function(d) {
                     return x.step*(hours.indexOf(d)+1)+32;
                   })
                   .attr("y", y.max+20)
                   .text(function (d) { return d; })
                   .attr("font-family", "sans-serif")
                   .attr("font-size", "12px");


  var scaleData = [];

  for (i in data){
    scaleData.push(data[i][2])
  }

  z = {
    data: scaleData
  }
  z.max    = d3.max(z.data)
  z.min    = d3.min(z.data)
  z.domain = [z.min, z.max]
  z.range  = [4, 15]
  z.scale  = d3.scale.linear().
  domain(z.domain).
  range(z.range);

  for (var i in data) {
    tuple = data[i];
    commits = tuple[2];
    if (commits > 0) {
      cy    = y.step*(tuple[0]+1);
      cx    = x.step*(tuple[1]+1)+50;
      r     = z.scale(commits);
      title = "Commits: " + commits;

      c = circleGroup.append("circle")
        .attr("cx",cx)
        .attr("cy",cy)
        .attr("r",r)
        .attr("title",title)
        .attr("class","hover-circle");

      }
    }

  })
});
```
