var Battery = function (volts) {
  this.voltage = volts;
  this.in = new Connection(this);
  this.out = new Connection(this);
  this.rotation = 0;
  this.x = 0;
  this.y = 0;
}
  
Battery.prototype.calculateTerminals = function() {
  var actualRotation = this.rotation % 360;
  if (actualRotation === 0) {
    this.in.place(this.x, this.y - 25/2);
    this.out.place(this.x, this.y + 25/2);
  } else if (actualRotation === 180 || actualRotation === -180) {
    this.in.place(this.x, this.y + 25/2);
    this.out.place(this.x, this.y - 25/2);
  } else if (actualRotation == -90 || actualRotation === -270) {
    this.in.place(this.x - 25/2, this.y);
    this.out.place(this.x + 25/2, this.y);
  } else if (actualRotation == 90 || actualRotation === -270) {
    this.in.place(this.x + 25/2, this.y);
    this.out.place(this.x - 25/2, this.y);
  }

  console.log("calculating", this.in, this.out);
}

Battery.prototype.rotateLeft = function () {
  this.rotation -= 90;
  this.calculateTerminals();
}

Battery.prototype.rotateRight = function () {
  this.rotation += 90;
  this.calculateTerminals();
}

Battery.prototype.flip = function () {
  this.rotation += 180;
  this.calculateTerminals();
}

Battery.prototype.place = function (x, y) {
  this.x = x;
  this.y = y;
  this.calculateTerminals();
}

Battery.prototype.render = function (svg) {
  var that = this;
  // svg renderings
  svg.selectAll('div')
    .data([15, 30, 15, 30, 15, 30])
    .enter()
    .append('svg:path')
    .attr('d', function(d, i) {
      return 'M ' + (that.x + i%2*(-7) - 15/2)+' '+ (that.y + i * 5 - 25/2) + ' l '+d+' 0';
    })
    .attr("transform", "rotate("+that.rotation+" "+ that.x +", "+ that.y+")")
    .attr("class", "zap-line component");

  var actualRotation = that.rotation % 360;
  var translateX = that.x;
  var translateY = that.y;
  if (actualRotation === 0) {
    translateX += 20;
    translateY += 5;
  } else if (actualRotation === 180 || actualRotation === -180) {
    translateX -= 50;
    translateY += 5;
  } else if (actualRotation == -90 || actualRotation === -270) {
    translateX -= 10;
    translateY -= 25;
  } else if (actualRotation == 90 || actualRotation === -270) {
    translateX -= 15;
    translateY += 35;
  }

  svg.append('text')
    .attr("class", "zap-label")
    .attr("transform", "translate("+ translateX +","+ translateY +")")
    .text(that.voltage + 'V');

  return this;
}

Zap.prototype.createBattery = function (volts) {
  return new Battery(volts);
}