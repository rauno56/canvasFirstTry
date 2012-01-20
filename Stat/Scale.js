Stat.Scale = function (graph,x,y) {
	if (!graph) {
		throw new Error("Graph must be defined.");
	}
	if (!x || !y) {
		throw new Error('Cordinates for the zero-point must be given.');
	}
	this.graph = graph;
	
	this.xOffset = x;
	this.yOffset = y;
};

Stat.Scale.prototype = {
	get: function (x,y) {
		return {
			x: x - this.xOffset,
			y: this.yOffset - y
		};
	},
	drawScale: function () {
		context.moveTo(100, 150);
	    context.lineTo(450, 50);
	    context.stroke();
	},
	drawTick: function () {
		
	}
};