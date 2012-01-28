var erases = 0;
var redraws = 0; 

Stat.Graph = function (id, options) {
	console.log("Initialisation to: " + id);
	options = options || {};
	
	this.id = id;
	var canvas = this.canvas = $("#"+id);
	this.cont = canvas[0].getContext('2d');
	
	this.setCanvasSize(options);
	
	this.cont.save();
	
	this.initTranslation(options);
	
	this.scale = new Stat.Scale(this);
	
	var me = this;
	
	canvas.click(function (e) {
		e.preventDefault();
		e.stopPropagation();
		
		me.click.apply(me, arguments);
	});
	
	canvas.dblclick(function (e) {
		e.preventDefault();
		e.stopPropagation();
	});
	
//	canvas.bind("mousedown", me, me.startDrag);
//    canvas.bind("mousemove", me, me.drag);
//    canvas.bind("mouseup", me, me.endDrag);
//    canvas.bind("mouseover", me, me.endDrag);
//    canvas.bind("mouseout", me, me.endDrag);
	
//	this.addEquation(function (x) { return Math.sin(x); }, "grey", 1);
};

Stat.Graph.prototype = {
	step: 1,
	points: [],
	equations: [],
	width: 300,
	height: 150,
	zoom: 50,
	min: {x: undefined, y: undefined},
	max: {x: undefined, y: undefined},
	center: {x: undefined, y: undefined},
	startDragOffset: {x: undefined, y: undefined},
	getMousePosition: function (e) {
		var x = ((e.pageX-this.canvas.offset().left))/this.zoom + this.min.x;
		var y = (-(e.pageY-this.canvas.offset().top) + 1 + this.center.y)/this.zoom;
		return [x,y];
	},
	startDrag: function (e) {
        var me = e.data;
        me.mouseDown = true;
        me.startDragOffset.x = e.clientX - me.center.x;
        me.startDragOffset.y = e.clientY - me.center.y;
    },
    endDrag: function (e) {
        e.data.mouseDown = false;
    },
    drag: function (e) {
    	var me = e.data;
        if (me.mouseDown) {
        	log("You dragger");
            x = e.clientX - me.startDragOffset.x;
            y = e.clientY - me.startDragOffset.y;
            me.setTranslation(x, y);
        }
    },
	click: function (e) {
		var p = this.getMousePosition(e);
		this.addPoint.apply(this, p);
		this.reDraw();
	},
	setCanvasSize: function (x,y ) {
		if (x && typeof(x)==typeof({a: 1})) {
			y = x.height;
			x = x.width;
		}
		x = this.width = x || this.width;
		y = this.height = y || this.height;
		this.canvas[0].setAttribute('width', x);
		this.canvas[0].setAttribute('height', y);
	},
	initTranslation: function (x,y) {
		if (x && typeof(x)==typeof({})) {
			y = x.centerY;
			x = x.centerX;
		}
		
		this.cont.restore();
		this.cont.save();
		
		var x = this.center.x = x || this.center.x || Math.round(this.width / 2),
			y = this.center.y = y || this.center.y || Math.round(this.height / 2),
			zoom = this.zoom;
		
		this.cont.translate(x,y);
		
		this.cont.scale(zoom, -zoom);
		
		var minX = this.min.x = -x/zoom;
		var minY = this.min.y = -(-y + this.height)/zoom;
		
		this.max.x = (this.width)/zoom + minX;
		this.max.y = (y)/zoom;
	},
	addPoint: function (x, y) {
		var p = new Stat.Point(this, x, y);
		this.points.push(p);
		return p
	},
	addEquation: function (formula, color, thickness) {
		var e = new Stat.Equation(this, formula, color, thickness);
		this.equations.push(e);
		return e;
	},
	setTranslation: function (x,y) {
		this.erase();
		
		this.initTranslation(x,y);
		
		this.reDraw();
	},
	setZoom: function (z) {
		this.erase();
		
		this.zoom = z || this.zoom;
		this.initTranslation();
		
		this.reDraw();
	},
	reDraw: function () {
		this.erase();
		
//		console.log("Redrawing.");
		redraws++;
		
		this.scale.draw();
		this.reDrawPoints();
		this.reDrawEquations();
	},
	reDrawPoints: function () {
		this.points.forEach(function (p) {
			p.draw();
		});
	},
	reDrawEquations: function () {
		this.equations.forEach(function (e) {
			e.draw();
		});
	},
	erase: function () {
//		console.log("Erasing.");
		erases++;
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
		return sum/(n*h)
	};
};