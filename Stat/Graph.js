Stat.Graph = function (id, options) {
	log("Initialisation to: " + id);
	options = options || {};
	
	this.id = id;
	this.canvas = $("#"+id);
	this.cont = this.canvas[0].getContext('2d');
	
	this.setCanvasSize(options);
	
	this.cont.save();
	
	this.initTranslation(options);
	
	this.scale = new Stat.Scale(this);
	
	var me = this;
	
	this.canvas.click(function (e) {
		e.preventDefault();
		e.stopPropagation();
		
		me.click.apply(me, arguments);
	});
	
	this.canvas.dblclick(function (e) {
		e.preventDefault();
		e.stopPropagation();
	});
	
	this.canvas.mousemove(function () {
		me.mousemove.apply(me, arguments);
	});
};

Stat.Graph.prototype = {
	step: 1,
	points: [],
	equations: [],
	width: 300,
	height: 150,
	min: {x: undefined, y: undefined},
	max: {x: undefined, y: undefined},
	center: {x: undefined, y: undefined},
	getMousePosition: function (e) {
		var x = Math.floor((e.pageX-this.canvas.offset().left)) + this.min.x;
		var y = -Math.floor((e.pageY-this.canvas.offset().top)) + 1 + this.center.y;
		return [x,y];
	},
	click: function (e) {
		this.addPoint.apply(this, this.getMousePosition(e));
	},
	mousemove: function (e) {
//		var pos = this.scale.get(x,y);
//		log("("+pos.x+", "+pos.y+")");
	},
	setCanvasSize: function (options) {
		var x = options.width || this.width,
			y = options.height || this.height;
		this.canvas[0].setAttribute('width', x);
		this.canvas[0].setAttribute('height', y);
		
		this.width = x;
		this.height = y;
	},
	initTranslation: function (x,y) {
		if (typeof(x)==typeof({})) {
			y = x.centerY;
			x = x.centerX;
		}
		this.cont.restore();
		this.cont.save();
		var x = this.center.x = x || Math.round(this.width / 2),
			y = this.center.y = y || Math.round(this.height / 2);
		
		this.cont.translate(x,y);
		
		this.cont.scale(1, -1);
		
		var minX = this.min.x = -x;
		var minY = this.min.y = -(-y + this.height);
		
		this.max.x = minX + this.width;
		this.max.y = y;
	},
	addPoint: function (x, y) {
		this.points.push(new Stat.Point(this, x, y));
		this.reDraw();
	},
	addEquation: function (formula, color, thickness) {
		this.equations.push(new Stat.Equation(this, formula, color, thickness));
	},
	setTranslation: function (x,y) {
		this.erase();
		
		this.initTranslation(x,y);
		
		this.reDraw();
	},
	reDraw: function () {
		this.erase();
		
		this.scale.draw();
		this.reDrawPoints();
		this.reDrawEquations();
	},
	reDrawDynamics: function () {
		this.dynamicEquations.forEach(function (e) {
			e.draw();;
		});
	},
	reDrawPoints: function () {
		this.points.forEach(function (p) {
			p.draw();
		});
	},
	reDrawEquations: function () {
		this.equations.forEach(function (e) {
			e.draw();;
		});
	},
	erase: function () {
		this.cont.clearRect(this.min.x, this.min.y, this.width, this.height);	
	},
	clear: function () {
		this.points = [];
		this.equations = [];
		this.reDraw();
	}
};

N = function (m,ss) {
	var d = 1/Math.sqrt(2*Math.PI*ss);
	var ss = 2*ss;
	return function (x) {
		return d * Math.exp(-Math.pow(x-m, 2)/(ss));
	};
};

U = function (a,b) {
	var ba = b-a;
	return function (x) {
		if (a<=x && x<=b) {
			return 1/(ba);
		}
		return 0; 
	};
};

Epanechnikov = function () {
	return function (x) {
		if (Math.abs(x)<=1) {
			return 3*(1-Math.pow(x, 2))/4;
		}
		return 0
	};
}

Tricube = function () {
	return function (x) {
		if (Math.abs(x)<=1) {
			return 35*Math.pow((1-Math.pow(x, 2)), 3)/32;
		}
		return 0
	};
}

Triangular = function () {
	return function (x) {
		if (Math.abs(x)<=1) {
			return 1-Math.abs(x);
		}
		return 0
	};
}

kernelDensity = function (points, kernelFunction, h) {
	return function (x) {
		var sum = 0,
			n = points.length;
		g.points.forEach(function (p) {
			sum+=kernelFunction((x-p.x)/h);
		});
		return 10000 * sum/(n*h)
	};
};


//Ns = [
//   N(0,1),
//   N2(0,1),
//   N3(0,1),
//   N4(0,1),
//   N5(0,1)
//];
//
//count = 10;
//
//while (count--) {
//	x = (Math.random()-0.5)*16;
//	console.log("Testcase:", x);
//	a = Ns[0](x);
//	console.log("Originaal:",a);
//	for (var i = 1; i<Ns.length; i++) {
//		var v = Ns[i](x);
//		console.log(i, ": ", v, '  - test: ', a-v);
//	}
//}


