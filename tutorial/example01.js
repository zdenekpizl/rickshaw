/**
 * Created by pizl on 2/6/14.
 */

var databar =  [ { x: 0, y: 40 }, { x: 1, y: 49 }, { x: 2, y: 17 }, { x: 3, y: 42 } ];
var dataline =  [ { x: 0, y: 20 }, { x: 1, y: 39 }, { x: 2, y: 27 }, { x: 3, y: 42 } ];

/*
var seriesData = [ [], [] ];
var random = new Rickshaw.Fixtures.RandomData(50);

for (var i = 0; i < 75; i++) {
	random.addData(seriesData);
*/

var data = [ { x: 1910, y: 92228531 }, { x: 1920, y: 106021568 }, { x: 2010, y: 308745538 } ];


var graph = new Rickshaw.Graph( {
	element: document.querySelector("#chart"),
	width: 580,
	height: 290,
    renderer: 'gauge',
    strokeWidth: '13',
    stroke: "true",
	series: [
                {
                    color: 'steelblue',
                    opacity: 0.5,
                    data: databar
            	}
            ]
} );

var hover = new Rickshaw.Graph.HoverDetail({ graph: graph });
/*var slider = new Rickshaw.Graph.RangeSlider.Preview({graph: graph, element: document.querySelector('#slider')});*/

graph.render();


var svvg = d3.select("svg");

var txt = svvg.append("text")
    .style("fill", "black")
    .attr("x", 0)
    .attr("y", 0)
    .attr("text-anchor", "middle")
    .text("42");


var textw = txt.node().getBBox().width;
var cx = 290;
var cy = 145;
var scale = 0.8*cx/textw;
txt
    .attr("transform","scale("+scale+")");

txt
    .attr("transform", "translate(cx,cy)");
