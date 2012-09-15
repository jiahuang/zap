/**
 * UUID implementation
 */

function createUUID () {
  return String(Date.now() + Math.random());
}

/**
 * Zap
 */

function Zap () {
}

Zap.parse = function (json) {
  var zap = new Zap();
  var ids = {};
  var connections = [];
  var data = JSON.parse(json, function (k, v) {
    if (typeof v == 'object' && v.type) {
      switch (v.type) {
        case 'view':
          var view = zap.createView(v.h, v.w);
          view.wires = v.wires;
          view.placements = v.placements;
          return v;
        case 'wire':
          var w = new Wire(v.comp1, v.comp2);
          w.intersections = v.intersections;
          return w;
        case 'connection':
          var c = new Connection(null);
          (connections[v.base] || (connections[v.base] = [])).push(c);
          c.x = v.x;
          c.y = v.y;
          return c;
        case 'resistor':
          var r = zap.createResistor(v.resistance);
          r.x = v.x;
          r.y = v.y;
          r.rotation = v.rotation;
          r.in = v.in;
          ids[v.id] = r;
          return r;
        case 'ground':
          var g = zap.createGround();
          g.x = v.x;
          g.y = v.y;
          g.rotation = v.rotation;
          ids[v.id] = g;
          g.in = v.in;
          return g;
      }
    }
    return v;
  });

  for (var key in connections) {
    connections[key].forEach(function (connection) {
      console.log(connection);
      connection.base = ids[key];
    });
  }

  var view = zap.createView(data.h, data.w, zap);
  view.wires = data.wires;
  view.placements = data.placements;
  return view;
};

/**
 * View.
 */

var View = function (height, width, zap) {
  this.h = height;
  this.w = width;
  this.zap = zap;
  this.wires = [];
  this.placements = [];
}

View.prototype.toJSON = function () {
  return {
    type: 'view',
    h: this.h,
    w: this.w,
    wires: this.wires,
    placements: this.placements
  };
};

View.prototype.render = function (element) {
  if (element.renderView) {
    element.renderView(this);
  } else {
    var svg = element.append('svg').attr('width', this.w).attr('height', this.h);
    // set up wiring
    this.wires.forEach(function (wire, index) {
      wire.render(svg);
    });

    // render all components
    this.placements.forEach(function (item, index) {
      item['component'].render(svg);
    });
  }
}

View.prototype.place = function (component, x, y) {
  component.place(x, y);

  this.placements.push({component: component, x: x, y: y});
}

Zap.prototype.createView = function (height, width) {
  return new View(height, width, this);
};

/**
 * Module exports.
 */

this.Zap = Zap;