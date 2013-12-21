$(document).ready(function(){
  $.getJSON('/json/nano_words_per_day.json', function(data){
    var width = 900;
    var height = 300;
    var padding = 2;
    var yTickCount = 20;
    var yTickGap = height/yTickCount;

    var x = d3.scale.linear().domain([0, data.length]).range([0, width]);
    var y = d3.scale.linear().domain([0, d3.max(data, function(datum) { return datum[1]; })]).rangeRound([0, height]);

    var lineFunction = d3.svg.line()
      .x(function(d) { return data.indexOf(d) * (width/data.length); })
      .y(function(d) { return height - y(d[1]); })
      .interpolate("linear");

    var lineContainer = d3.select("#wc-line").append("svg")
      .attr("width", width)
      .attr("height", height);

    var axisGroup = lineContainer.append("svg:g");

    var edges = lineContainer.append("svg:g");

    // left edge
    edges.append("svg:line").
      attr("x1", 0).
      attr("x2", 0).
      attr("y1", 0).
      attr("y2", height ).
      attr("stroke", "black");

    // botom edge
    edges.append("svg:line").
      attr("x1", 0).
      attr("x2", width).
      attr("y1", height).
      attr("y2", height).
      attr("stroke", "black");

    axisGroup.selectAll(".yTicks").
      data(d3.range(0, yTickCount)).
      enter().append("svg:line").
      attr("x1", -5).
      attr("x2", width+5).
      attr("y1", function(d) { return height - (d*yTickGap); }).
      attr("y2", function(d) { return height - (d*yTickGap); }).
      attr("stroke", "lightgray").
      attr("class", "yTicks");

    //The line SVG Path we draw
    var lineGraph = lineContainer.append("path")
      .attr("d", lineFunction(data))
      .attr("stroke", "#506520")
      .attr("stroke-width", 2)
      .attr("fill", "none");
  })

  $.getJSON('/json/nano_stats.json', function(data){
    var width = 900;
    var barWidth = width/data.length - 3;
    var height = 300;

    var x = d3.scale.linear().domain([0, data.length]).range([0, width]);
    var y = d3.scale.linear().domain([0, d3.max(data, function(datum) { return datum.wc; })]).rangeRound([0, height]);

    var wcBar = d3.select("#wc-graph").
      append("svg:svg").
      attr("width", width).
      attr("height", height);

    wcBar.selectAll("rect").
      data(data).
      enter().
      append("svg:rect").
      attr("x", function(datum, index) { return x(index); }).
      attr("y", function(datum) { return height - y(datum.wc); }).
      attr("height", function(datum) { return y(datum.wc); }).
      attr("width", barWidth).
      attr("fill", "#506520").
      attr("class", "wc-graph-bar").
      attr("data-date", function(d){return d.date;}).
      attr("data-wc", function(d){return d.wc;}).
      attr("data-commit", function(d){return d.commit;}).
      append("svg:title").
      text(function(d){ return (d.date+"\n"+d.wc+" words") }) ;
  })
});
