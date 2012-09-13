var Capacitor = function (farads) {
  this.capacitance = farads;
  this.in = new Connection(this);
  this.out = new Connection(this);
}

Capacitor.prototype = new Component();

Capacitor.prototype.placeUp = function () {
  this.in.place(this.x, this.y - (25/2 + 5));
  this.out.place(this.x, this.y + (25/2 + 5));
}

Capacitor.prototype.placeDown = function () {
  this.in.place(this.x, this.y + (25/2 + 5));
  this.out.place(this.x, this.y - (25/2 + 5));
}

Capacitor.prototype.placeLeft = function () {
  this.in.place(this.x - (25/2 + 5), this.y);
  this.out.place(this.x + (25/2 + 5), this.y);
}

Capacitor.prototype.placeRight = function () {
  this.in.place(this.x + (25/2 + 5), this.y);
  this.out.place(this.x - (25/2 + 5), this.y);
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
        return 'M ' +( that.x )+' '+( that.y - 18)+ ' l 0 '+ d;
      }
      if (i == 3 ){
        return 'M ' +( that.x )+' '+( that.y + 15/2)+ ' l 0 '+ d;
      }
      return 'M ' +( that.x - 25/2)+' '+( that.y + (i-1)%2*(15) - 15/2)+ ' l '+d+' 0';
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