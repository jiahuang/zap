var Capacitor = function (farads, zap) {
  this.capacitance = farads;
  this.w = zap.baseWidth;
  this.h = zap.baseHeight;
}

Capacitor.prototype.render = function (element) {
  // svg renderings
  var svg = element.append('svg').attr('width', this.w).attr('height', this.h);
  var x = 100, y = 100;

  svg.selectAll('div')
    .data([40, 40])
    .enter()
    .append('svg:path')
    .attr('d', function(d, i) {
      return 'M ' + (x + i%2*(20))+' '+ 0 + ' l 0 '+ 30;
    })
    .attr("class", "zap-line component");

  svg.append('text')
    .attr("class", "zap-label")
    .attr("transform", "translate("+ 80 +","+ 50 +")")
    .text(this.capacitance + 'F');

  return this;
}

Zap.prototype.createCapacitor = function (farads) {
  return new Capacitor(farads, this);
}