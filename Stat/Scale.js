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
		var cont = this.graph.cont;
		cont.lineWidth = 1;
		cont.strokeStyle = "rgb(55,55,55)";

		
		
		
		cont.beginPath();
		
//		cont.moveTo(0, this.yOffset-0.5);
//		cont.lineTo(this.graph.size.x, this.yOffset-0.5);
//
//		cont.moveTo(this.xOffset-0.5, 0);
//		cont.lineTo(this.xOffset-0.5, this.graph.size.x);
		
		cont.moveTo(-this.graph.size.x, -0.5);
		cont.lineTo(this.graph.size.x, -0.5);

		cont.moveTo(-0.5, -this.graph.size.y);
		cont.lineTo(-0.5, this.graph.size.y);
	    
		
		cont.stroke();
	},
	drawTick: function () {
		
	}
};