Stat.Graph = function (id, sizeX, sizeY) {
	log("Initialisation to: " + id);
	this.id = id;
	this.canvas = $("#"+id);
	this.cont = this.canvas[0].getContext('2d');
	this.size = {
		x: sizeX,
		y: sizeY
	};
		
	this.setCanvasSize(sizeX, sizeY);
	
//	this.cont.translate(100,100);
	
	this.scale = new Stat.Scale(this, 10, this.size.y-10);
	
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
		var x = Math.floor((e.pageX-this.canvas.offset().left));
		var y = Math.floor((e.pageY-this.canvas.offset().top));
		this.points.push({x: x, y: y});
		this.drawPoint(x,y);
	},
	mousemove: function (e) {
		var x = Math.floor((e.pageX-this.canvas.offset().left));
		var y = Math.floor((e.pageY-this.canvas.offset().top));
		var pos = this.scale.get(x,y);
//		log("("+pos.x+", "+pos.y+")");
	},
	setCanvasSize: function (x,y) {
		if (x,y) {
			this.canvas[0].setAttribute('width', x);
			this.canvas[0].setAttribute('height', y);
		} else {
			log("Default size.");
		}
	},
	drawEquation: function(equation, color, thickness) {
		console.log(equation, equation(10));
		
	    var canvas = this.canvas,
	    	context = this.cont,
	    	step = this.step,
	    	scale = this.scale;
	    color = color || "black";
	    thickness = thickness || 2;
	 
	    context.beginPath();
	    context.moveTo(0, scale.get(0, equation(scale.get(0,0).x)).y);
	 
	    for (var x = step; x <= this.size.x; x += step) {
	    	scaleX = scale.get(x,0).x;
	    	scaleY = equation(scaleX);
	    	graphY = scale.get(0,scaleY).y;
//	    	console.log("("+scaleX+", "+graphY+")");
	        context.lineTo(x, graphY);
	    }
	    
	    context.lineJoin = "round";
	    context.lineWidth = thickness;
	    context.strokeStyle = color;
	    context.stroke();
	},
	clearEquations: function () {
		console.log(this.points);
		this.cont.clearRect(0,0,this.size.x, this.size.y);
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