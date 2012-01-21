Stat.Graph = function (id, options) {
	log("Initialisation to: " + id);
	options = options || {};
	
	this.id = id;
	this.canvas = $("#"+id);
	this.cont = this.canvas[0].getContext('2d');
	
	this.setCanvasSize(options);
	
	this.setTranslation(options);
	
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
	drawPoint: function (x,y,r,sa,ea,cc) {
		r = r || 2;
		sa = sa || 0;
		ea = ea || Math.PI*2;
		cc = cc || false;
		console.log("Draw point to ("+x+", "+y+")");
		this.cont.beginPath();
		this.cont.lineWidth = 1;
		this.cont.strokeStyle = "rgba(55,55,55, 10)";
		this.cont.arc(x,y,r,sa,ea,cc);
		this.cont.stroke();
	},
	click: function (e) {
		log("Click!");
		var x = Math.floor((e.pageX-this.canvas.offset().left)) + this.min.x;
		var y = -Math.floor((e.pageY-this.canvas.offset().top)) + this.center.y;
		this.points.push({x: x, y: y});
		this.drawPoint(x,y);
	},
	mousemove: function (e) {
		var x = Math.floor((e.pageX-this.canvas.offset().left));
		var y = Math.floor((e.pageY-this.canvas.offset().top));
		var pos = this.scale.get(x,y);
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
	setTranslation: function (options) {
		var x = this.center.x = options.centerX || Math.round(this.width / 2),
			y = this.center.y = options.centerY || Math.round(this.height / 2);
		
		this.cont.translate(x,y);
		
		this.cont.scale(1, -1);
		
		var minX = this.min.x = -x;
		var minY = this.min.y = -(-y + this.height);
		
		this.max.x = minX + this.width;
		this.max.y = y;
	},
	drawEquation: function(equation, color, thickness) {
		console.log(equation, equation(10));
		
	    var canvas = this.canvas,
	    	context = this.cont,
	    	step = this.step,
	    	min = this.min.x,
	    	max = this.max.x;
	    color = color || "black";
	    thickness = thickness || 2;
	 
	    context.beginPath();
	    
	    context.lineJoin = "round";
	    context.lineWidth = thickness;
	    context.strokeStyle = color;
	    
	    context.moveTo(min, equation(min));
	 
	    for (var x = min + step; x <= max; x += step) {
	        context.lineTo(x, equation(x));
	    }
	    
	    context.stroke();
	},
	clearEquations: function () {
		console.log(this.points);
		this.cont.clearRect(this.min.x, this.min.y, this.width, this.height);
		this.scale.draw();
		var me = this;
		this.points.forEach(function (p) {
			me.drawPoint(p.x,p.y);
		});
	},
	clear: function () {
		this.points = [];
		this.clearEquations();
	},
};