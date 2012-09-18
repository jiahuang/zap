var Resistor = function (ohms) {
  Component.apply(this);
  
  this.resistance = ohms;
  this.in = new Connection(this);
  this.out = new Connection(this);
}

Resistor.prototype = new Component();

Resistor.prototype.toJSON = function () {
  return {
    type: 'resistor',
    id: this.id,
    x: this.x,
    y: this.y,
    scale: this.scale,
    rotation: this.rotation,
    resistance: this.resistance,
    in: this.in.toJSON(),
    out: this.out.toJSON()
  };
};

Resistor.prototype.placeUp = function () {
  this.in.place(this.x, this.y, 0, -35/2);
  this.out.place(this.x, this.y, 0, 35/2);
}

Resistor.prototype.placeDown = function () {
  this.in.place(this.x, this.y, 0, 35/2);
  this.out.place(this.x, this.y, 0,  -35/2 );
}

Resistor.prototype.placeLeft = function () {
  this.in.place(this.x, this.y, -35/2, 0);
  this.out.place(this.x, this.y, 35/2, 0);
}

Resistor.prototype.placeRight = function () {
  this.in.place(this.x, this.y, 35/2, 0);
  this.out.place(this.x, this.y, -35/2, 0);
}

Resistor.prototype.render = function (svg) {
  var that = this;

  // svg renderings
  var pathData = [{x: 0, y: 5}, {x: -5, y: 2.5}, {x: 10, y: 5}, {x: -10, y: 5}, {x: 10, y: 5}, {x: -10, y: 5}, {x: 5, y: 2.5}, {x: 0, y: 5}]

  svg.append('svg:path')
    .attr('d', function(d) {
      var path = ' ';
      pathData.forEach(function (point, index) {
        path += 'l '+point.x*that.scale + ' '+point.y*that.scale + ' ';
      })
      return 'M ' +( that.x ) +' '+ (that.y - (35/2)*that.scale ) + path;
    })
    .attr("transform", "rotate("+(that.rotation/Math.PI*180)+" "+ that.x +", "+ that.y+")")
    .attr("class", "zap-line component");

  var textPlacement = this.renderText();
  svg.append('text')
    .attr("class", "zap-label")
    .attr("transform", "translate("+ textPlacement.x +","+ textPlacement.y +")")
    .text(this.resistance + 'Ω');

  return this;
}

Zap.prototype.createResistor = function (ohms) {
  return new Resistor(ohms);
}