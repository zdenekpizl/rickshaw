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

	_styleGauge: function(serie) {

        var graph = this.graph;
        var data = serie.data.slice(-1)[0].y;

        graph.vis.select('.gauge')
            .attr('fill', serie.color);

		if (this.stroke) {
            if (this.stroke.toLowerCase() === "true" ) {
                var border = d3.rgb(serie.color);
                this.stroke = border.darker().darker().toString();
            }
			graph.vis
                .select('.gauge')
                .data(data)
				.attr('stroke', this.stroke)
				.attr('stroke-width', this.strokeWidth);
		}

	},

	render: function(args) {

        function get_cx(g) {
            var element = g.element;
            var w = g.width;
            return w/2;
        }

        function get_cy(g) {
            var element = g.element;
            var height = g.height;
            return height/2;
        }

		var graph = this.graph;
        args = args || {};
		var series = args.series || graph.series;
        var cx = get_cx(graph);
        var cy = get_cy(graph);
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

