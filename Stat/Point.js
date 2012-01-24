Stat.Point = function (graph, x, y) {
	if (x == null || y == null) {
		throw new Error("Point has to have coordinates.");
	}
	if (!graph) {
		throw new Error("Point has to have Graph assigned to it.");
	}
	this.x = x;
	this.y = y;
	this.graph = graph;
	
	this.draw();
}

Stat.Point.prototype = {
	isPoint: true,
	draw: function (r,sa,ea,cc) {
		var cont = this.graph.cont;
		var zoom = this.graph.zoom;
		r = (r || 2)/zoom;
		sa = sa || 0;
		ea = ea || Math.PI*2;
		cc = cc || false;
		cont.beginPath();
		cont.lineWidth = 1/zoom;
		cont.strokeStyle = "rgba(55,55,55, 10)";
		cont.arc(this.x,this.y,r,sa,ea,cc);
		cont.stroke();
	}
};