function Connection (base) {
	this.base = base;
	this.x = 0;
	this.y = 0;
}

Connection.prototype.toJSON = function () {
  return {
    type: 'connection',
    id: this.id,
    base: this.base && this.base.id,
    x: this.x,
    y: this.y
  };
};

Connection.prototype.place = function (x, y) {
	this.x = x || 0;
	this.y = y || 0;
}