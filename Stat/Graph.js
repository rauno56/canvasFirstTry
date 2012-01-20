Stat.Graph = function (id, sizeX, sizeY) {
	log("Initialisation to: " + id);
	this.id = id;
	this.points = [];
	this.canvas = $("#"+id);
	this.ctx = this.canvas[0].getContext('2d');
	this.size = {
		x: sizeX,
		y: sizeY
	};
	
	this.setCanvasSize(sizeX, sizeY);
	
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
	drawPoint: function (x,y,r,sa,ea,cc) {
		r = r || 2;
		sa = sa || 0;
		ea = ea || Math.PI*2;
		cc = cc || false;
		console.log("Draw point to ("+x+", "+y+")");
		this.ctx.beginPath();
		this.ctx.strokeStyle = "rgba(55,55,55, 10)";
		this.ctx.arc(x,y,r,sa,ea,cc);
		this.ctx.stroke();
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
		this.scale = new Stat.Scale(this, 10, this.size.y-10);
	},
};