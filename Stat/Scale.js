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
	
	this.draw();
};

Stat.Scale.prototype = {
	get: function (x,y) {
		return {
			x: x - this.xOffset,
			y: this.yOffset - y
		};
	},
	draw: function () {
		var ct = this.graph.ctx;
		ct.lineWidth = 1;
		ct.strokeStyle = "rgb(55,55,55)";
		
		ct.beginPath();
		
		ct.moveTo(0, this.yOffset-0.5);
		ct.lineTo(this.graph.size.x, this.yOffset-0.5);

		ct.moveTo(this.xOffset-0.5, 0);
		ct.lineTo(this.xOffset-0.5, this.graph.size.x+0.5);
	    
		
		ct.stroke();
	},
	drawTick: function () {
		
	}
};