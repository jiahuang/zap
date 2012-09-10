(function (Zap) {
  var Ground = function (zap) {
    this.w = zap.baseWidth;
    this.h = zap.baseHeight;
  }

  Ground.prototype.render = function (element) {
    // svg renderings
    var svg = element.append('svg').attr('width', this.w).attr('height', this.h);
    var x = 100, y = 100;

    svg.selectAll('div')
      .data([30, 20, 10])
      .enter()
      .append('svg:path')
      .attr('d', function(d, i) {
        return 'M ' + (x + i*5)+' '+ (y + i * 5) + ' l '+d+' 0';
      })
      .attr("class", "zap-line component");

    return this;
  }

  Zap.prototype.createGround = function () {
    return new Ground(this);
  }
})(Zap);