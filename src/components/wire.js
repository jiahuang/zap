var Wire = function (comp1, comp2) {
  this.comp1 = comp1;
  this.comp2 = comp2;
  this.intersections = [];
  this.scale = 1;
}

Wire.prototype.toJSON = function () {
  return {
    type: 'wire',
    comp1: this.comp1,
    comp2: this.comp2,
    intersections: this.intersections
  };
};

Wire.prototype.render = function (svg) {
  // svg renderings
  var startPos = this.comp1.scale(this.scaleFactor);
  var endPos = this.comp2.scale(this.scaleFactor);

  function drawLine(s, e) {
    svg.append('svg:path')
      .attr('d', function(d) {
        return 'M ' + s.x +' '+ s.y + ' l '+(e.x - s.x)+' ' + (e.y - s.y);
      })
      .attr("class", "zap-line component");
    return {x: e.x, y: e.y};
  }

  this.intersections.forEach(function (intersection, index) {
    startPos = drawLine(startPos, intersection);
  });

  // do some auto-wiring if user hasn't specified anything
  if (this.intersections.length < 1 && startPos.x != endPos.x && startPos.y != endPos.y) {
    startPos = drawLine(startPos, {x: endPos.x, y: startPos.y});
  }
  
  // append the ending path
  drawLine(startPos, endPos);

  return this;
}

Wire.prototype.intersect = function (x, y) {
  this.intersections.push({x: x, y: y});
}

Zap.prototype.connect = function (comp1, comp2) {
  return new Wire(comp1, comp2);
}