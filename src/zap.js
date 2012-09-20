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

  function setDefaults(value, obj){
    obj.x = value.x;
    obj.y = value.y
    if (value.rotation != 'undefined') {
      obj.rotation = value.rotation;
    }
    return obj;
  }

  var zap = new Zap();
  var ids = {};
  var connections = [];
  var data = JSON.parse(json, function (k, v) {
    if (typeof v == 'object' && v.type) {
      switch (v.type) {
        case 'view':
          var view = zap.createView(v.w, v.h, v.scale);
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
          c = setDefaults(v, c);
          c.xOffset = v.xOffset;
          c.yOffset = v.yOffset;
          return c;
        case 'battery':
          ids[v.id] = setDefaults(v, zap.createBattery(v.voltage));
          return ids[v.id];
        case 'resistor':
          ids[v.id] = setDefaults(v, zap.createResistor(v.resistance));
          return ids[v.id];
        case 'ground':
          ids[v.id] = setDefaults(v, zap.createGround());
          return ids[v.id];
        case 'opAmp':
          ids[v.id] = setDefaults(v, zap.createOpAmp(v.model));
          return ids[v.id];
        case 'capacitor':
          ids[v.id] = setDefaults(v, zap.createCapacitor(v.capacitance));
          return ids[v.id];
      }
    }
    return v;
  });

  for (var key in connections) {
    connections[key].forEach(function (connection) {
      connection.base = ids[key];
    });
  }

  var view = zap.createView(data.w, data.h, data.scale);
  view.wires = data.wires;
  view.placements = data.placements;
  return view;
};

/**
 * View.
 */

var View = function (width, height, scale) {
  this.h = height;
  this.w = width;
  this.scale = scale;
  this.wires = [];
  this.placements = [];
}

View.prototype.toJSON = function () {
  return {
    type: 'view',
    h: this.h,
    w: this.w,
    scale: this.scale,
    wires: this.wires,
    placements: this.placements
  };
};

View.prototype.render = function (element) {
  if (element.renderView) {
    element.renderView(this);
  } else {
    var svg = element.append('svg').attr('width', this.w).attr('height', this.h);
    var that = this;
    console.log(this);
    // render all components
    this.placements.forEach(function (item, index) {
      item['component'].scale = that.scale;
      item['component'].render(svg);
    });

    // set up wiring
    this.wires.forEach(function (wire, index) {
      wire.scale = that.scale;
      console.log(wire.scale);
      wire.render(svg);
    });
  }
}

View.prototype.place = function (component, x, y) {
  component.place(x, y);
  this.placements.push({component: component, x: x, y: y});
}

Zap.prototype.createView = function (width, height, scale) {
  return new View(width, height, scale || 1);
};


/**
 * Module exports.
 */

this.Zap = Zap;