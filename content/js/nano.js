$(document).ready(function(){
  var fullWidth = document.getElementById('wc-graph').offsetWidth;
  var graphPadding = 60;
  var width = (fullWidth-graphPadding);
  var height = 300;
  var yTickCount = 20;
  var yTickGap = height/yTickCount;

  var edgeColor = "#000000";
  var yCountColor = "#666666";
  var barColor = "#506520";
  var lineStroke = "#C9FE51";
  var scaleLineColor = "lightgray"

  // set up the SVG graph space
  var palette = d3.select("#wc-graph").append("svg").
    attr("width", fullWidth).
    attr("height", height);

  var lineContainer = palette.append("svg:g").
    attr("x", graphPadding).
    attr("height", height).
    attr("width", width);

  // set up object groups
  var edgeGroup = lineContainer.append("svg:g");
  var barGroup = lineContainer.append("svg:g");
  var lineGroup = lineContainer.append("svg:g");

  // Draw guides
  edgeGroup.selectAll(".yTicks").
    data(d3.range(0, yTickCount)).
    enter().append("svg:line").
    attr("x1", -10).
    attr("x2", fullWidth).
    attr("y1", function(d) { return height - (d*yTickGap); }).
    attr("y2", function(d) { return height - (d*yTickGap); }).
    attr("stroke", scaleLineColor).
    attr("class", "yTicks");


  // Draw Count
  edgeGroup.selectAll(".yCount").
    data( d3.range(1,yTickCount+1).reverse() ).
    enter().append("svg:text").
    // cheating here because i know the final max ;)
    text(function(d){return(Math.floor(55000/20)*d)}).
    attr("x", 0).
    attr("y", function(d,i) { return (i*yTickGap); }).
    attr("fill", yCountColor)

  // left edge
  edgeGroup.append("svg:line").
    attr("x1", graphPadding).
    attr("x2", graphPadding).
    attr("y1", 0).
    attr("y2", height ).
    attr("stroke", edgeColor).
    attr("stroke-width", 1);
  // botom edge
  edgeGroup.append("svg:line").
    attr("x1", graphPadding).
    attr("x2", fullWidth).
    attr("y1", height).
    attr("y2", height).
    attr("stroke", edgeColor).
    attr("stroke-width", 2);

  $.getJSON('/json/nano_words_per_day.json', function(data){
    var barWidth = width/data.length - 3;

    var x = d3.scale.linear().domain([0, data.length]).range([graphPadding, fullWidth]);
    var y = d3.scale.linear().domain([0, d3.max(data, function(d) { return d[1]; })]).rangeRound([0, height]);

    barGroup.selectAll("rect").
      data(data).
      enter().
      append("svg:rect").
      attr("x", function(d, index) { return x(index); }).
      attr("y", function(d) { return height - y(d[1]); }).
      attr("height", function(d) { return y(d[1]) - 1 ; }).
      attr("width", barWidth).
      attr("fill", barColor).
      attr("class", "wc-graph-bar").
      append("svg:title").
      text(function(d){ return (d[0]+"\nWords:"+d[1])});
  })

  $.getJSON('/json/nano_stats.json', function(data){

    var x = d3.scale.linear().domain([0, data.length]).range([graphPadding, fullWidth]);
    var y = d3.scale.linear().domain([0, d3.max(data, function(d) { return d.wc; })]).rangeRound([0, height]);


    var lineFunction = d3.svg.line()
      .x(function(d) { return data.indexOf(d) * (width/data.length) + graphPadding; })
      .y(function(d) { return height - y(d.wc); })
      .interpolate("linear");

    //The line SVG Path we draw
    var lineGraph = lineGroup.append("path").
      attr("d", lineFunction(data)).
      attr("stroke", lineStroke ).
      attr("stroke-width", 2).
      attr("fill", "none");
  })

});
