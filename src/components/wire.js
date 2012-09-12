var Wire = function (comp1, comp2) {
  this.comp1 = comp1;
  this.comp2 = comp2;
  this.intersections = [];
}

Wire.prototype.render = function (svg) {
  // svg renderings
  console.log("end", this.comp2.wire);
  var startPos = {x: this.comp1.x, y: this.comp1.y};
  var endPos = {x: this.comp2.x, y: this.comp2.y};

  this.intersections.forEach(function (intersection, index) {
    var nextX = intersection.x, nextY = intersection.y;
    // draw a line
    svg.append('svg:path')
      .attr('d', function(d) {
        return 'M ' + startPos.x +' '+ startPos.y + ' l '+(nextX - startPos.x)+' ' + (nextY - startPos.y);
      })
      .attr("class", "zap-line component");
    startPos = {x: nextX, y: nextY};
  });

  // append the ending path
  svg.append('svg:path')
    .attr('d', function(d) {
      console.log("wire path", startPos, endPos);
      return 'M ' + startPos.x +' '+ startPos.y + ' l '+(endPos.x - startPos.x)+' ' + (endPos.y - startPos.y);
    })
    .attr("class", "zap-line component");

  return this;
}

Wire.prototype.intersect = function (x, y) {
  this.intersections.push({x: x, y:y});
}

Zap.prototype.connect = function (comp1, comp2) {
  return new Wire(comp1, comp2);
}