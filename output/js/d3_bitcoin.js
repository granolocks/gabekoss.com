var fullWidth = document.getElementById('graph').offsetWidth;
var graphPadding = 60;
var width = (fullWidth-graphPadding);
var fullHeight = 320;
var height = (fullHeight-20);
var scaleLineColor = "lightgray"

var palette = d3.select("#graph").append("svg").
  attr("width", fullWidth).
  attr("height", fullHeight);

var lineContainer = palette.append("g").
  attr("x", graphPadding).
  attr("height", height).
  attr("width", width);

var edgeGroup = palette.append("g");
var lineGroup = palette.append("g");

$(document).ready(function(){
  $.getJSON('/json/trade_data.json', function(data){

    var time = [];
    var last = [];

    $(data).each(function(i,tick){
      time.push(tick.time);
      last.push(tick.last);
    });

  var x = {};
  x.data   = time;
  x.min    = d3.min(x.data);
  x.max    = d3.max(x.data);
  x.domain = [x.min, x.max];
  x.range  = [graphPadding, fullWidth];
  x.scale  = d3.scale.linear().
    domain(x.domain).
    range(x.range);
  x.axis       = {
    min: new Date(x.min*1000),
    max: new Date(x.max*1000)
  }
  x.axis.scale = d3.time.scale().
    domain([x.axis.min,x.axis.max]).
    range(x.range);
  x.axis.axis  = d3.svg.axis().
    scale(x.axis.scale).
    orient("bottom");

  var y = {};
  y.data   = last;
  y.min    = d3.min(y.data);
  y.max    = d3.max(y.data);
  y.domain = [y.max, y.min];
  y.range  = [0, height];
  y.scale  = d3.scale.linear().
    domain(y.domain).
    range(y.range);

  y.axis   = {}

  y.axis.axis = d3.svg.axis().
             scale(y.scale).
             orient("left");

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

  var lineFunction = d3.svg.line()
    .y(function(d,i) { return y.scale(y.data[i]); })
    .x(function(d,i) { return x.scale(x.data[i]); })
    .interpolate("basis");

  var lineGraph = lineGroup.append("path").
    attr("d", lineFunction(data)).
    attr("stroke", "#000" ).
    attr("stroke-width", 1).
    attr("fill", "none");
  })
});

