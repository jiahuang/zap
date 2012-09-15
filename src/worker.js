importScripts(
	'zap.js',
	'component.js',
	'components/battery.js',
	'components/capacitor.js',
	'components/connection.js',
	'components/ground.js',
	'components/opamp.js',
	'components/resistor.js',
	'components/wire.js'
	);

var repl = {
	renderView: function (view) {
		postMessage(JSON.stringify({
			action: 'render',
			json: JSON.stringify(view)
		}));
	}
};

self.onmessage = function (event) {
	// event data
	eval(event.data);
};