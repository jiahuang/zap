(function (Zap) {
  var OpAmp = function (model, zap) {
    this.model = model;
    this.w = zap.baseWidth;
    this.h = zap.baseHeight;
  }

  OpAmp.prototype.render = function (element) {
    // svg renderings
    var svg = element.append('svg').attr('width', this.w).attr('height', this.h);
    var x = 100, y = 100;

    svg.append('path')
      .attr('d', function(d) {
        var x = 100, y = 100;
        return 'M ' + x +' '+ y + ' l 40 25 l -40 25 z';
      })
      .attr("class", "zap-line component");

    svg.append('text')
      .attr("class", "zap-label")
      .attr("transform", "translate("+ 120 +","+ 130 +")")
      .text(this.model);

    return this;
  }

  Zap.prototype.createOpAmp = function (model) {
    return new OpAmp(model, this);
  }
})(Zap);