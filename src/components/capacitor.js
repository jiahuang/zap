var Capacitor = function (farads) {
  Component.apply(this);
  
  this.capacitance = farads;
  this.in = new Connection(this);
  this.out = new Connection(this);
}

Capacitor.prototype = new Component();

Capacitor.prototype.toJSON = function () {
  return {
    type: 'capacitor',
    id: this.id,
    x: this.x,
    y: this.y,
    rotation: this.rotation,
    capacitance: this.capacitance,
    in: this.in.toJSON(),
    out: this.out.toJSON()
  };
};

Capacitor.prototype.placeUp = function () {
  this.in.place(this.x, this.y, 0, -15);
  this.out.place(this.x, this.y, 0,  15);
}

Capacitor.prototype.placeDown = function () {
  this.in.place(this.x, this.y, 0, 15);
  this.out.place(this.x, this.y, 0, -15);
}

Capacitor.prototype.placeLeft = function () {
  this.in.place(this.x, this.y,  - 15, 0);
  this.out.place(this.x, this.y, 15, 0);
}

Capacitor.prototype.placeRight = function () {
  this.in.place(this.x, this.y, 15, 0);
  this.out.place(this.x, this.y, - 15, 0);
}

Capacitor.prototype.render = function (svg) {
  var that = this;
  // svg renderings
  svg.selectAll('div')
    .data([10, 25, 25, 10])
    .enter()
    .append('svg:path')
    .attr('d', function(d, i) {
      if (i == 0 ) {
        return 'M ' +( that.x )+' '+( that.y - 15*that.scaleFactor)+ ' l 0 '+ (d*that.scaleFactor);
      }
      if (i == 3 ){
        return 'M ' +( that.x )+' '+( that.y + 5*that.scaleFactor)+ ' l 0 '+ (d*that.scaleFactor);
      }
      return 'M ' +( that.x - 25/2*that.scaleFactor)+' '+( that.y + ((i-1)%2*(10) - 5)*that.scaleFactor)+ ' l '+(d*that.scaleFactor)+' 0';
    })
    .attr("transform", "rotate("+(this.rotation/Math.PI*180)+" "+ this.x +", "+ this.y+")")
    .attr("class", "zap-line component");

  var textPlacement = this.renderText();
  svg.append('text')
    .attr("class", "zap-label")
    .attr("transform", "translate("+ textPlacement.x +","+ textPlacement.y +")")
    .text(this.capacitance + 'µF');

  return this;
}

Zap.prototype.createCapacitor = function (farads) {
  return new Capacitor(farads);
}