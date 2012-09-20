var Battery = function (volts) {
  Component.apply(this);

  this.voltage = volts;
  this.in = new Connection(this);
  this.out = new Connection(this);
}

Battery.prototype = new Component();

Battery.prototype.toJSON = function () {
  return {
    type: 'battery',
    id: this.id,
    x: this.x,
    y: this.y,
    rotation: this.rotation,
    voltage: this.voltage,
    in: this.in.toJSON(),
    out: this.out.toJSON()
  };
};
  
Battery.prototype.placeUp = function () {
  this.in.place(this.x, this.y, 0, - (25/2 + 10));
  this.out.place(this.x, this.y, 0, + (25/2 + 10));
}

Battery.prototype.placeDown = function () {
  this.in.place(this.x, this.y, 0, + (25/2 + 10));
  this.out.place(this.x, this.y, 0, - (25/2 + 10));
}

Battery.prototype.placeLeft = function () {
  this.in.place(this.x, this.y, - (25/2 + 10), 0);
  this.out.place(this.x, this.y, + (25/2 + 10), 0);
}

Battery.prototype.placeRight = function () {
  this.in.place(this.x, this.y, + (25/2 + 10), 0);
  this.out.place(this.x, this.y, - (25/2 + 10), 0);
}

Battery.prototype.render = function (svg) {
  var that = this;
  // svg renderings
  svg.selectAll('div')
    .data([10, 15, 30, 15, 30, 15, 30, 10])
    .enter()
    .append('svg:path')
    .attr('d', function(d, i) {
      if (i == 0 ) {
        return 'M ' +( that.x )+' '+( that.y - 22 *that.scale)+ ' l 0 '+ (d*that.scale);
      }
      if (i == 7 ){
        return 'M ' +( that.x )+' '+( that.y + 25/2 *that.scale)+ ' l 0 '+ (d*that.scale);
      }
      return 'M ' + (that.x + ((i-1)%2*(-7) - 15/2)*that.scale)+' '+ (that.y + ((i-1) * 5 - 25/2)*that.scale) + ' l '+(d*that.scale)+' 0';
    })
    .attr("transform", "rotate("+(that.rotation/Math.PI*180)+" "+ that.x +", "+ that.y+")")
    .attr("class", "zap-line component");

  
  var textPlacement = this.renderText();
  svg.append('text')
    .attr("class", "zap-label")
    .attr("transform", "translate("+ textPlacement.x +","+ textPlacement.y +")")
    .text(that.voltage + 'V');

  return this;
}

Zap.prototype.createBattery = function (volts) {
  return new Battery(volts);
}