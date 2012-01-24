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
		var zoom = this.graph.zoom;
		cont.lineWidth = 1/(zoom*2);
		cont.strokeStyle = "black";
		
		cont.beginPath();
		
		cont.moveTo(this.graph.min.x, 0);
		cont.lineTo(this.graph.max.x, 0);

		cont.moveTo(0, this.graph.min.y);
		cont.lineTo(0, this.graph.max.y);
	    
		cont.stroke();
		
		this.drawGrid();
	},
	drawGrid: function () {
		var cont = this.graph.cont,
			zoom = this.graph.zoom,
			min = this.graph.min,
			max = this.graph.max,
			step = this.find();
		
		cont.beginPath();
		
		cont.lineWidth = 1/(zoom*2);
		cont.strokeStyle = "rgba(76, 111, 240, 0.3)";
		
		var x = step;
		while (x<max.x) {
			this.drawHorizontal(cont, x, this.graph);
			x+=step;
		}
		var x = -step;
		while (min.x<x) {
			this.drawHorizontal(cont, x, this.graph);
			x-=step;
		}
		var y = step;
		while (y<max.y) {
			this.drawVertical(cont, y, this.graph);
			y+=step;
		}
		var y = -step;
		while (min.y<y) {
			this.drawVertical(cont, y, this.graph);
			y-=step;
		}
		
		cont.stroke();
	},
	drawHorizontal: function (cont, x, g) {
		cont.moveTo(x, g.min.y);
		cont.lineTo(x, g.max.y);
	},
	drawVertical: function (cont, y, g) {
		cont.moveTo(g.min.x, y);
		cont.lineTo(g.max.x, y);
	},
	find: function () {
		var g = this.graph;
		var s = Math.max(g.width, g.height)/50;
//		console.log(g.width, g.height);
		var x = g.max.x-g.min.x;
		var y = g.max.y-g.min.y;
		var longest = Math.max(x, y);
		var c = Math.ceil(longest/s);
		return c;
	}
};