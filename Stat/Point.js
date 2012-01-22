Stat.Point = function (graph, x, y) {
	if (!x || !y) {
		throw new Error("Point has to have coordinates.");
	}
	if (!graph) {
		throw new Error("Point has to have Graph assigned to it.");
	}
	this.x = x-0.5;
	this.y = y+0.5;
	this.graph = graph;
	
	this.draw();
}

Stat.Point.prototype = {
	isPoint: true,
	draw: function (r,sa,ea,cc) {
		var cont = this.graph.cont;
		r = r || 2;
		sa = sa || 0;
		ea = ea || Math.PI*2;
		cc = cc || false;
		cont.beginPath();
		cont.lineWidth = 1;
		cont.strokeStyle = "rgba(55,55,55, 10)";
		cont.arc(this.x,this.y,r,sa,ea,cc);
		cont.stroke();
	}
};