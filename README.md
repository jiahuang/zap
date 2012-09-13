# Zap, circuit drawing library for JavaScript

Installation:

```
brew install closure-compiler
./build.sh
```

## Examples

A voltage divider
![Example image](https://raw.github.com/jiahuang/zap/master/examples/voltage_divider.png)

```
var zap = new Zap();

var resistor1 = zap.createResistor(5);
var resistor2 = zap.createResistor(10);
var ground = zap.createGround();

var wire1 = zap.connect(resistor1.out, resistor2.in);
var wire2 = zap.connect(resistor2.out, ground.in);

var view = zap.createView(200, 200);
view.wires = [wire1, wire2];
view.place(resistor1, 100, 50);
view.place(resistor2, 100, 100);
view.place(ground, 100, 150);

view.render(canvas);
```

A high pass filter
![Example image](https://raw.github.com/jiahuang/zap/master/examples/high_pass_filter.png)

```
var zap = new Zap();

var resistor1 = zap.createResistor(5);
var resistor2 = zap.createResistor(10);
var opAmp = zap.createOpAmp('OPA4188');
var capacitor = zap.createCapacitor('10');
var ground = zap.createGround();

var view = zap.createView(200, 200);
var wireArray = [];
wireArray.push(zap.connect(capacitor.out, resistor1.in));
wireArray.push(zap.connect(opAmp.vNeg, ground.in));
wireArray.push(zap.connect(resistor1.out, opAmp.vPos));
wireArray.push(zap.connect(resistor2.in, opAmp.vPos));
wireArray.push(zap.connect(resistor2.out, opAmp.vOut));

// pretty up the wires
wireArray[1].intersect(70, 110);
wireArray[3].intersect(83, 100);
wireArray[4].intersect(117.5, 105);
wireArray[4].intersect(130, 105);

resistor1.rotateLeft();
resistor2.rotateLeft();
capacitor.rotateLeft();
opAmp.rotateRight();

view.wires = wireArray;
view.place(resistor1, 60, 100);
view.place(opAmp, 100, 105);
view.place(capacitor, 20, 100);
view.place(resistor2, 100, 70);
view.place(ground, 70, 170);

view.render(canvas);
```