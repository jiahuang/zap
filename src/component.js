// base prototype object for all components

function Component () {
  this.x = 0;
  this.y = 0;
  this.rotation = 0;
  this.id = createUUID();
  this.scaleFactor = 1;
}

Component.prototype.rotateLeft = function () {
  this.rotation -= Math.PI/2;
  this.calculateTerminals();
}

Component.prototype.rotateRight = function () {
  this.rotation += Math.PI/2;
  this.calculateTerminals();
}

Component.prototype.flip = function () {
  this.rotation += Math.PI;
  this.calculateTerminals();
}

Component.prototype.place = function (x, y) {
  this.x = x;
  this.y = y;
  this.calculateTerminals();
}

Component.prototype.renderText = function () {
  var actualRotation = this.rotation % (Math.PI * 2);
  var translateX = this.x;
  var translateY = this.y;
  if (actualRotation == 0) {
    translateX += 20;
    translateY += 5;
  } else if (actualRotation == Math.PI || actualRotation == -Math.PI) {
    translateX -= 50;
    translateY += 5;
  } else if (actualRotation == -Math.PI/2 || actualRotation == -Math.PI*(3/2)) {
    translateX -= 10;
    translateY -= 25;
  } else if (actualRotation == Math.PI/2 || actualRotation == -Math.PI*(3/2)) {
    translateX -= 15;
    translateY += 35;
  }

  return {x: translateX, y: translateY};
}

Component.prototype.calculateTerminals = function () {
  var actualRotation = this.rotation % (Math.PI * 2);
  if (actualRotation == 0) {
    this.placeUp();
  } else if (actualRotation == Math.PI || actualRotation == -Math.PI) {
    this.placeDown();
  } else if (actualRotation == -Math.PI/2 || actualRotation == Math.PI*(3/2)) {
    this.placeLeft();
  } else if (actualRotation == Math.PI/2 || actualRotation == -Math.PI*(3/2)) {
    this.placeRight();
  }
}