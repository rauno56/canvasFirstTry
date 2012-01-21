Stat.Scale = function (graph,x,y) {
	if (!graph) {
		throw new Error("Graph must be defined.");
	}
	
	this.graph = graph;
	
	this.draw();
};

Stat.Scale.prototype = {
	draw: function () {
		var cont = this.graph.cont;
		cont.lineWidth = 1;
		cont.strokeStyle = "rgb(155,155,155)";
		
		cont.beginPath();
		
		cont.moveTo(this.graph.min.x, -0.5);
		cont.lineTo(this.graph.max.x, -0.5);

		cont.moveTo(-0.5, this.graph.min.y);
		cont.lineTo(-0.5, this.graph.max.y);
	    
		cont.stroke();
	},
	drawTick: function () {
		
	}
};