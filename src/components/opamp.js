var OpAmp = function (model) {
  Component.apply(this);
  
  this.model = model;
  this.vPos = new Connection(this);
  this.vNeg = new Connection(this);
  this.vSPos = new Connection(this);
  this.vSNeg = new Connection(this);
  this.vOut = new Connection(this);
}

OpAmp.prototype = new Component();

OpAmp.prototype.toJSON = function () {
  return {
    type: 'opAmp',
    id: this.id,
    x: this.x,
    y: this.y,
    rotation: this.rotation,
    model: this.model,
    vPos: this.vPos.toJSON(),
    vNeg: this.vNeg.toJSON(),
    vSPos: this.vSPos.toJSON(),
    vSNeg: this.vSNeg.toJSON(),
    vOut: this.vOut.toJSON()
  };
};

// fun fun fun 
OpAmp.prototype.placeUp = function () {
  this.vPos.place(this.x, this.y, - (15 * 1/3), + 18/2);
  this.vNeg.place(this.x, this.y,  + (15 * 1/3), + 18/2);
  this.vSPos.place(this.x, this.y,  - (15 * 1/2), - (18/6));
  this.vSNeg.place(this.x, this.y,  + (15 * 1/2), - (18/6));
  this.vOut.place(this.x, this.y, 0, - 18/2 );
}

OpAmp.prototype.placeDown = function () {
  this.vPos.place(this.x, this.y, - (15 * 1/3), - 18/2);
  this.vNeg.place(this.x, this.y, + (15 * 1/3), - 18/2);
  this.vSPos.place(this.x, this.y, - (15 * 1/2), + (18/6));
  this.vSNeg.place(this.x, this.y, + (15 * 1/2), + (18/6));
  this.vOut.place(this.x , this.y, 0, + 18/2 );
}

OpAmp.prototype.placeLeft = function () {
  this.vPos.place(this.x, this.y, + 18/2,  - (15 * (1/3)));
  this.vNeg.place(this.x, this.y, + 18/2, + (15 * 1/3));
  this.vSPos.place(this.x, this.y, - (18/6), - (15 * 1/2));
  this.vSNeg.place(this.x, this.y, - (18/6), + (15 * 1/2));
  this.vOut.place(this.x, this.y, - 18/2, 0 );
}

OpAmp.prototype.placeRight = function () {
  this.vPos.place(this.x, this.y, - 18/2,  - (15 * (1/3)));
  this.vNeg.place(this.x, this.y, - 18/2, + (15 * 1/3));
  this.vSPos.place(this.x, this.y, + (18/6), - (15 * 1/2));
  this.vSNeg.place(this.x, this.y, + (18/6), + (15 * 1/2));
  this.vOut.place(this.x, this.y,  + 18/2, 0 );
}

OpAmp.prototype.render = function (svg) {
  var that = this;

  var pathData = [{x: 15, y: -18}, {x: 15, y: 18}]
  // svg renderings
  svg.append('path')
    .attr('d', function(d) {
      var path = ' ';
      pathData.forEach(function (point, index) {
        path += 'l '+(point.x *that.scaleFactor) + ' '+(point.y*that.scaleFactor) + ' ';
      });
      path += 'z';
      return 'M ' + ( that.x -(15*that.scaleFactor))+' '+ ( that.y + (18/2*that.scaleFactor)) + path;
    })
    .attr("transform", "rotate("+(this.rotation/Math.PI*180)+" "+ this.x +", "+ this.y+")")
    .attr("class", "zap-line component");

  var textPlacement = this.renderText();
  svg.append('text')
    .attr("class", "zap-label")
    .attr("transform", "translate("+ textPlacement.x +","+ textPlacement.y +")")
    .text(this.model);

  return this;
}

Zap.prototype.createOpAmp = function (model) {
  return new OpAmp(model);
}