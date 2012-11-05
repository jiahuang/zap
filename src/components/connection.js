function Connection (base) {
	this.base = base;
	this.x = 0;
	this.y = 0;
  this.xOffset = 0;
  this.yOffset = 0;
}

Connection.prototype.toJSON = function () {
  return {
    type: 'connection',
    id: this.id,
    base: this.base && this.base.id,
    x: this.x,
    y: this.y,
    xOffset: this.xOffset,
    yOffset: this.yOffset
  };
};

Connection.prototype.place = function (x, y, xOffset, yOffset) {
	this.x = x || 0;
	this.y = y || 0;
  this.xOffset = xOffset || 0;
  this.yOffset = yOffset || 0;
}

Connection.prototype.scale = function (scaleFactor) {
  return {x: this.x + this.xOffset * scaleFactor, 
    y: this.y + this.yOffset * scaleFactor};
  // console.log("scaling", this.xOffset, this.yOffset);
}