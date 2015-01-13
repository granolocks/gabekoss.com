---
title: Simple D3 Pie Graph of Disk Usage
created_at: 2014-10-01 13:37
updated_at: 2014-10-01 13:37
kind: blog-post
author: Gabe Koss
summary: My first pass at making an SVG pie chart using the D3 Javascript library.
tags: 
 - d3
 - javascript
--- 

<script src="/js/d3-v3-min.js" charset="utf-8"></script>
<script src="/js/jquery-1-10-1-min.js"></script>

I have been slowly building a helpful Sinatra application which I use to
monitor system health and adminster various tasks about my local Linux system.
Really it just gives me a good playground and functional base for testing
things and making myself lightweight GUIs without dealing with... well.. GUIs.
But I digress.

Here is the graph I ended up creating: 

<div id="graph-wrapper">
  <div id="graph"></div>
</div>

<script src="/js/d3-pie-chart.js"></script>
# The Data

For this experiment I decided I wanted to make some pie charts of system disk
usage. With this goal in mind I used Ruby to parse and massage the outputs of
the `du` command on Linux until I ended up with the following JSON:

```js
  {
    "filesystem":       "rootfs",
    "key":              {
      "human_size": "423GB",
      "human_used": "147GB",
      "human_available":  "276GB",
      "used_percent":     "32%",
      "mounted_at":       "/"
    },
    "data": [
      { 
        "label": "used", 
        "value": "131287000"
      },
      { 
        "label": "available", 
        "value": "288782200"
      }
    ]
  }
```


In actuallity I had an array of these objects, one for each filesystem, but for
this post I'll just use the one. 


# Create the Graph

First I made sure my page had the appropriate dom elements for this purpose:

```html
<script src="/js/d3-v3-min.js" charset="utf-8"></script>
<script src="/js/jquery-1-10-1-min.js"></script>
<div id="graph-wrapper">
  <div id="graph"></div>
</div>
```

Next I moved onto the Javascript, first creating an SVG object in the `#graph`
element.

```js
```

