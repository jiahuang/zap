(function(Zap) {
  var View = function(height, width, Zap) {
    this.h = height;
    this.w = width;
    this.zap = Zap;
    this.wires = [];
    this.placements = [];
    return this;
  }

  View.prototype.render = function (element) {
    var svg = element.append('svg').attr('width', this.w).attr('height', this.h);
    // set up wiring
    this.wires.forEach(function (wire, index) {
      console.log("wire", wire);
      wire.render(svg);
    });

    // render all components
    this.placements.forEach(function (item, index) {
      console.log('component', item);
      item['component'].render(svg);
    });
  }

  View.prototype.place = function (component, x, y) {
    component.place(x, y);

    this.placements.push({component: component, x: x, y: y});
  }

  Zap.prototype.createView = function (height, width) {
    return new View(height, width, this);
  }
})(Zap);