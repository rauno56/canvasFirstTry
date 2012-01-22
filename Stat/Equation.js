Stat.Equation = function (graph, formula, color, thickness) {
	if (!formula) {
		throw new Error("Formula has to be defined.");
	}
	if (!graph) {
		throw new Error("Equation has to have Graph assigned to it.");
	}
	this.formula = formula;
	this.color = color;
	this.thickness = thickness;
	this.graph = graph;
	
	this.draw();
};

Stat.Equation.prototype = {
	isEquation: true,
	formula: function (x) {
		return x;
	},
	draw: function (color, thickness) {		
		var graph = this.graph,
			context = graph.cont,
			step = graph.step,
			min = graph.min.x,
			max = graph.max.x,
			formula = this.formula;
		color = color || this.color || "black";
		thickness = thickness || this.thickness || 2;

		context.beginPath();

		context.lineJoin = "round";
		context.lineWidth = thickness;
		context.strokeStyle = color;

		context.moveTo(min, formula(min));

		for (var x = min + step; x <= max; x += step) {
			context.lineTo(x, formula(x));
		}

		context.stroke();
	}
};