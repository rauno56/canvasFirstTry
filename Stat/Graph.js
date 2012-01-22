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
	min: {
		x: undefined,
		y: undefined
	},
	max: {
		x: undefined,
		y: undefined
	},
	center: {
		x: undefined,
		y: undefined
	},
	
	click: function (e) {
		var x = Math.floor((e.pageX-this.canvas.offset().left)) + this.min.x;
		var y = -Math.floor((e.pageY-this.canvas.offset().top)) + this.center.y;
		this.addPoint(x, y);
	},
	mousemove: function (e) {
		var x = Math.floor((e.pageX-this.canvas.offset().left)) + this.min.x;
		var y = -Math.floor((e.pageY-this.canvas.offset().top)) + this.center.y;
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