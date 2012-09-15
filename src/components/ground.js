var Ground = function (zap) {
  Component.apply(this);
  
  this.in = new Connection(this);
}

Ground.prototype = new Component();

Ground.prototype.toJSON = function () {
  return {
    type: 'ground',
    id: this.id,
    x: this.x,
    y: this.y,
    rotation: this.rotation,
    in: this.in.toJSON()
  };
};

Ground.prototype.placeUp = function () {
  this.in.place(this.x, this.y - (25/2 + 5));
}

Ground.prototype.placeDown = function () {
  this.in.place(this.x, this.y + (25/2 + 5));
}

Ground.prototype.placeLeft = function () {
  this.in.place(this.x - (25/2 + 5), this.y);
}

Ground.prototype.placeRight = function () {
  this.in.place(this.x + (25/2 + 5), this.y);
}

Ground.prototype.render = function (svg) {
  var that = this;
  // svg renderings
  svg.selectAll('div')
    .data([10, 30, 20, 10])
    .enter()
    .append('svg:path')
    .attr('d', function(d, i) {
      if (i == 0) {
        return 'M ' +( that.x )+' '+( that.y - 15)+ ' l 0 '+ d;
      }
      return 'M ' + (that.x + (i-1)*5 - 30/2)+' '+ (that.y + (i-1) * 5 - 5) + ' l '+d+' 0';
    })
    .attr("transform", "rotate("+(this.rotation/Math.PI*180)+" "+ this.x +", "+ this.y+")")
    .attr("class", "zap-line component");

  return this;
}

Zap.prototype.createGround = function () {
  return new Ground(this);
}