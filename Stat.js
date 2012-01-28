var Stat = {};

function log () {
	if (arguments.length==0) {
		log("Erases:",erases);
		log("Redraws:",redraws);
	}
	return console && console.log && console.log.apply(console,arguments);
}