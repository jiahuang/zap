function Connection (base) {
	this.base = base;
	this.x = 0;
	this.y = 0;
}

Connection.prototype.place = function (x, y) {
	this.x = x || 0;
	this.y = y || 0;
}