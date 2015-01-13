var graph_data =  {
  "filesystem":       "rootfs / -- 423GB",
  "used": "Used: 147GB",
  "available":  "Available: 276GB",
  "data": [
    { "label": "used",       "value": "131287000" },
    { "label": "available",  "value": "288782200" }
  ]
}

var width  = 300;
var height = 300;


var colors = d3.scale.category10();

var palette = d3.select("#graph")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .attr("overflow", "visible");

// Title
var titleG     = palette.append("g");
var titleText  = titleG.selectAll("text")
                          .data([graph_data.filesystem])
                          .enter()
                          .append("text");
var titleString = titleText
                   .attr("x", 5)
                   .attr("y", 5)
                   .text(function(d){return d})
                   .attr("font-family", "sans-serif")
                   .attr("font-weight", "bold")
                   .attr("font-size", "18px");

// Graph key
var keys = ["used","available"];
var keyG     = palette.append("g");
var keyText  = keyG.selectAll("text")
                          .data(keys)
                          .enter()
                          .append("text");
var keyString = keyText
                   .attr("x", function(d){return (keys.indexOf(d)*150)+5} )
                   .attr("y", 25)
                   .text(function(d){return graph_data[d]})
                   .style("fill", function(d){return colors(d)})
                   .attr("font-family", "sans-serif")
                   .attr("font-weight", "bold")
                   .attr("font-size", "18px");

// Chart
var radius = width/2;

var pie  = d3.layout.pie()
               .value(function(d){ return d.value });

var arc = d3.svg.arc();

var sliceG  = palette.append("g");
var slices = sliceG.selectAll("g")
            .data(pie)
            .enter()
            .append("g")
            .attr("class", "slice");

     arcs.append("svg:path")
        .attr("fill", function(d) { return color(d.label); } )
        .attr("d", arc);
