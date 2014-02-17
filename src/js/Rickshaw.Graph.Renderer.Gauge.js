Rickshaw.namespace('Rickshaw.Graph.Renderer.Gauge');

Rickshaw.Graph.Renderer.Gauge = Rickshaw.Class.create( Rickshaw.Graph.Renderer, {

	name: 'gauge',

	defaults: function($super) {

		return Rickshaw.extend( $super(), {
			unstack: true,
			fill: false,
			stroke: false,
            dashed: false
        });
    },

    get_cx: function(g) {
        var element = g.element;
        var w = g.width;
        return w/2;
    },

    get_cy: function(g) {
        var element = g.element;
        var height = g.height;
        return height/2;
    },

	_styleGauge: function(serie) {

        var graph = this.graph;
        var data = serie.data.slice(-1)[0].y;
        var cx = this.get_cx(graph);
        var cy = this.get_cy(graph);

        graph.vis.select('.gauge')
            .attr('fill', serie.color);

		if (this.stroke) {
            if (this.stroke.toLowerCase() === "true" ) {
                var border = d3.rgb(serie.color);
                this.stroke = border.darker().darker().toString();
            }
			graph.vis
                .select('.gauge')
				.attr('stroke', this.stroke)
				.attr('stroke-width', this.strokeWidth)
                .data(data);
		}

        var color = d3.rgb(serie.color).brighter().brighter().toString();
        var textnode = graph.vis.append("text")
            .style("fill", color)
            .attr("x", cx)
            .attr("y", cy)
            .attr("text-anchor", "middle")
            .text(data);

        var textw = textnode.node().getBBox().width;
        var texth = textnode.node().getBBox().height;

        var scale = 0.8*cx/textw;
        textnode
            .attr("transform","scale("+scale+")")
            .attr("x", cx)
            .attr("y", cy);


	},

	render: function(args) {

		var graph = this.graph;
        args = args || {};
		var series = args.series || graph.series;
        var cx = this.get_cx(graph);
        var cy = this.get_cy(graph);
        var r = cy/2;

		var gauge = graph.vis
            .append("circle");

        var setattribs = gauge
            .attr("class", 'gauge')
            .attr("cx", cx)
			.attr("cy", cy)
			.attr("r", r);

        this._styleGauge(series[0]);
	}

} );

