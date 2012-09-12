# Zap, circuit drawing library for JavaScript

Installation:

```
brew install closure-compiler
./build.sh
```

## Example

![Example image](https://raw.github.com/jiahuang/zap/master/example.png)

```
var zap = new Zap;

var battery = zap.createBattery(10);
var battery2 = zap.createBattery(20);

zap.connect(battery.in, battery2.out);
zap.connect(battery.out, battery2.in);

// Render view
zap.createView(500, 500).autoLayout().render(canvas);
```