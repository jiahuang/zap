closure-compiler --language_in=ECMASCRIPT5 --js src/zap.js --js src/components/* --output_wrapper "(function() {%output%})();" --js_output_file lib/zap.js
