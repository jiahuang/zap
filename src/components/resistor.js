var Resistor = function (ohms, zap) {
  this.resistance = ohms;
  this.w = zap.baseWidth;
  this.h = zap.baseHeight;
}

Resistor.prototype.render = function (element) {
  // svg renderings
  var svg = element.append('svg').attr('width', this.w).attr('height', this.h);

  svg.append('svg:path')
    .attr('d', function(d) {
      var x = 100, y = 100;
      return 'M ' + x +' '+ y + ' l 10 0 l 5 10 l 10 -20 l 10 20 l 10 -20 l 10 20 l 5 -10 l 10 0';
    })
    .attr("class", "zap-line component");

  svg.append('text')
    .attr("class", "zap-label")
    .attr("transform", "translate("+ 120 +","+ 130 +")")
    .text(this.resistance + 'Ω');

  return this;
}

Zap.prototype.createResistor = function (ohms) {
  return new Resistor(ohms, this);
}