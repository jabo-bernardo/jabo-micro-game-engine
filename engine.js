/*
 * Jabo Micro Engine
 * Developed by: https://twitter.com/CodeJabo
 *
*/

class Jabo {
	constructor() {
		this._version = '0.1';
		this._canvas = document.getElementById('jabo-viewport');
		this._canvasContext = this._canvas.getContext('2d');
	}

	clearCanvas() {
		this._canvasContext.clearRect(0, 0, this._canvas.width, this._canvas.height);
	}

	get version() {
		return this._version;
	}

	get canvas() {
		return this._canvas;
	}

	get canvasContext() {
		return this._canvasContext;
	}

}

class SceneManager {
	constructor() {
		this._activeScene = null;
	}

	setScene(scene) {
		this._activeScene = scene;
		this._activeScene.options.initialize()
	}

	get activeScene() {return this._activeScene;}
}

class Scene {
	constructor(options) {
		this._options = options;
	}

	get options() {
		return this._options;
	}
}

class JaboUtil {
	distance(x1, y1, x2, y2) {
		return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
	}

	range(min, max) {
		let r = Math.floor(Math.random() * max);
		while(r < min)
			r = Math.floor(Math.random() * max);
		return r;
	}
}

let JSprite = function(path) {
	if(typeof path != 'string') {
		console.log('Invalid path!');
		return;
	}
	let img = new Image();
	img.src = path;
	return img;
}