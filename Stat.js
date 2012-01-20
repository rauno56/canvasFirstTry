var Stat = {};

function log(){
	console && console.log && console.log.apply(console,arguments);
}

Stat.Graph = function (id, sizeX, sizeY) {
	log("Initialisation to: " + id);
	this.id = id;
	this.canvas = $("#"+id);
	this.ctx = this.canvas[0].getContext('2d');
	
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
		this.drawPoint(x,y);
	},
	setCanvasSize: function (x,y) {
		if (x,y) {
			this.canvas[0].setAttribute('width', x);
			this.canvas[0].setAttribute('height', y);
		} else {
			log("Default size.");
		}
	}
};