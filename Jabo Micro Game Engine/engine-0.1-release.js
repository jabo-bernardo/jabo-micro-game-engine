/*
 * Jabo Micro Engine
 * Developed by: https://twitter.com/CodeJabo
 * Original Version
 *
*/

/*
	Main Libray
	Usage: new Jabo()

	Methods:
		init();
		clearCanvas();

	Properties:
		version
			returns string
		canvas
			returns canvas object
		canvasContext
			returns canvas' context

*/
class Jabo {
	constructor() {
		this._version = '0.1-beta';
	}

	/* 
		Required to initialize to gain access on canvas object cand canvas' context
	*/
	init() {
		this._canvas = document.getElementById('jabo-viewport');
		this._canvasContext = this._canvas.getContext('2d');
		this._canvasContext.imageSmoothingEnabled = 0;
	}

	clearCanvas() {
		if(this._canvasContext == null)
			throw SyntaxError('You need to initialize the engine before you can use the Jabo.canvasContext.');
		this._canvasContext.clearRect(0, 0, this._canvas.width, this._canvas.height);
	}

	get version() {
		return this._version;
	}

	get canvas() {
		if(this._canvas == null)
			throw SyntaxError('You need to initialize the engine before you can use the Jabo.canvasContext.');
		return this._canvas;
	}

	get canvasContext() {
		if(this._canvasContext == null)
			throw SyntaxError('You need to initialize the engine before you can use the Jabo.canvasContext.');
		return this._canvasContext;
	}

}

/*
	SceneManager
		- Manages the scenes of the project
	Usage: new SceneManager();

	Methods:
		init();
		setScene();
*/
class SceneManager {
    constructor() {
        this._activeScene = null;
    }
    /*
		Required for game loop to work.
    */
    init() {
        let that = this;
        let loop = setInterval(function() {
            if(that._activeScene != null) {
                const self = that._activeScene;
                self.options.update();
                self.options.render();
            }
        }, 16.66);
    }

    setScene(scene) {
        this._activeScene = scene;
    }
}

/*
	Scene()
		- Creates a new scene
	Usage: new Scene({
		update: function() {
	
		},
		render: function() {
	
		}
	})

	@param options {f(), f()} - contains two functions update() and render()
*/
class Scene {
	constructor(options) {
		this._options = options;
	}

	get options() {
		return this._options;
	}
}

/*
	JUtil();
		- Helps the developer on 
*/
class JUtil {
	/*
		Usage: distance(0, 0, 0, 0); returns 0;
			- Returns the distance between two points.
		@param (x1, y1, x2, y2)[int] - location between two points
	*/
	distance(x1, y1, x2, y2) {
		return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
	}

	/*
		Usage: range(0, 10); returns random number between 0 and 10
			- More like a Math.random() but simplified

		@param (min, max)[int] - The minimum and maximum numbers that can be generated
	*/
	range(min, max) {
		let r = Math.floor(Math.random() * max);
		while(r < min)
			r = Math.floor(Math.random() * max);
		return r;
	}

	/*
		Usage: checkCollide(GameObject(), GameObject())
			- returns boolean

		@param (obj1, obj2) - GameObject
	*/
	checkCollide(obj1, obj2) {
		if(	obj1.x < obj2.x + obj2.width &&
			obj1.x + obj1.width > obj2.x) {
				if(	obj1.y < obj2.y + obj2.height &&
					obj1.y + obj1.height > obj2.y) {
					return true;
				}		
		}
		return false;
	}


}

/*
	JSprite()

	Usage: new JSprite('your/path/to/img.format');
		- returns an Image() object

*/
let JSprite = function(path) {
	if(typeof path != 'string') {
		console.log('Invalid path!');
		return;
	}
	let img = new Image();
	img.src = path;
	return img;
}

/*
	Animation()

	Usage: new Animation(c, options{})

	@param {
		c[canvasContext]
		options[Object] {
			spite[JSprite]
			speed[int]
			x[int]
			y[int]
			width[int]
			height[int]
			frame_width[int]
			frame_height[int]
			frame_count[int]
		}
	}

	Methods:
		update();
		render();
*/
class Animation {
	constructor(c, options) {		
		/*
			Validation check to prevent an error.
		*/
		if(	options.sprite == null ||
			options.speed == null ||
			options.frame_count == null ||
			options.frame_width == null ||
			options.frame_height == null
		) {
			throw Error('Required options seems null.');
			return null;
		}
		this._animSprite = options.sprite;
		this._c = c;
		this._x = options.x;
		this._y = options.y;
		this._w = options.width;
		this._h = options.height;
		this._divWidth = options.frame_width;
		this._divHeight = options.frame_height;
		let that = this;
		this._speed = options.speed;
		options.sprite.onload = () =>  {
			that._origWidth = options.sprite.width;
			that._origWidth = options.sprite.height;
			if(that._divWidth / that._origWidth == options.frame_count) {
				that._dir = 'right';
			} else if(that._divHeight / that._origHeight == options.frame_count) {
				that._dir = 'down';
			} else if(that._divWidth / that._origWidth != options.frame_count) {
				that._dir = 'both';
			} else if(that._divHeight / that._origHeight != options.frame_count) {
				that._dir = 'both';
			} else {
				throw Error('Frame Count and Size Don\'t Matched');
			}
			this._maxX = options.sprite.width;
			this._maxY = options.sprite.height;
		}
		this._curX = 0;
		this._curY = 0;
		this._tick = 0;
		this._curFrame = 0;
	}

	update() {
		this._tick++;
		if(this._dir == 'right') {
			if(this._tick == this._speed) {
				this._curX += this._divWidth;
				this._curFrame += 1;
				this._tick = 0;
				if(this._curX == this._maxX) {
					this._curX = 0;
					this._curFrame = 0;
				}
			}
		}
		if(this._dir == 'down') {
			if(this._tick == this._speed) {
				this._curY += this._divHeight;
				this._tick = 0;
				this._curFrame += 1;
				if(this._curY == this._maxY) {
					this._curY = 0;
					this._curFrame = 0;
				}
			}
		}
		if(this._dir == 'both') {
			if(this._tick == this._speed) {
				this._curX += this._divWidth;
				this._tick = 0;
				if(this._curX == this._maxX) {
					this._curX = 0;
					this._curY += this._divHeight;
					if (this._curY == this._maxY) {
						this._curY = 0;
					}
				}
			}
		}
	}

	render() {
		this._c.drawImage(this._animSprite, this._curX, this._curY, this._divWidth, this._divHeight, this._x, this._y, this._w, this._h);
	}

	get x() {
		return this._x;
	}

	get y() {
		return this._y;
	}

	get width() {
		return this._w;
	}

	get height() {
		return this._h;
	}

	set x(val) {
		this._x = val;
	}

	set y(val) {
		this._y = val;
	}

	set width(val) {
		this._width = val;
	}

	set height(val) {
		this._height = val;
	}
}

/*
	JSound()

	Usage: new JSound('path/to/music.format')

	@param path[string] - provide your path to a music file

	Methods:
		play();
		pause();
		loop();
		unloop()
*/
class JSound {
	constructor(path) {
		this._sound = new Audio(path);
	}

	play() {
		this._sound.play();
		this._sound.play().catch(() => this._sound.play())
	}

	pause() {
		this._sound.pause();
	}

	loop() {
		this._sound.setAttribute('loop', 'true');
	}

	unloop() {
		this._sound.loop = false;
	}
}

// List of objects in the game.
let objects = [];
/*
	GameObject()

	Usage: new GameObject();

	@param c[canvas' context]

*/
class GameObject {
	constructor(c) {
		this._x = 0;
		this._y = 0;
		this._width = 0;
		this._height = 0;
		this._sprite = null;
		this._draw = c;
		this._customVar = {};
		objects.push(this);
		this._id = objects.length - 1;
		this._name = null;
	}

	Translate(xMove, yMove) {
		this._x += xMove;
		this._y += yMove;
	}

	// CUSTOM VARIABLE FUNCTION :
	getVar(variable) {
		const tag = variable.toLowerCase();
		return this._customVar[tag];
	}

	addVar(name, val) {
		const tag = name.toLowerCase();
		this._customVar[tag] = val;
	}

	updateVar(name, val) {
		const tag = name.toLowerCase();
		this._customVar[tag] = val;
	}
	// END - - -

	update() {

		if(this._sprite != null) {
			if(this._sprite.constructor.name == 'Animation') {
				this._sprite.x = this._x;
				this._sprite.y = this._y;
				this._sprite.width = this._width;
				this._sprite.height = this._height;
				this._sprite.update();
			}	
		}

	}

	render() {
		if(this._sprite == null)
			this._draw.fillRect(this._x, this._y, this._width, this._height);
		if(this._sprite != null) {
			if(this._sprite.constructor.name == 'Animation')
				this._sprite.render();
			if(this._sprite.constructor.name == 'HTMLImageElement')
				this._draw.drawImage(this._sprite, this._x, this._y)
		}

	}

	delete() {
		for(let i = 0; i < objects.length; i++) {
			if(objects[i] == this) {
				if(objects[i].id == this._id) {
					objects.splice(objects[i], 1);
					return null;
				}
			}
		}
	}

	near() {
		let listofdist = []
		for (var i = 0; i < objects.length; i++) {
			if(objects[i].id != this._id) {
				listofdist.push(Math.sqrt(Math.pow(objects[i].x - this._x, 2) + Math.pow(objects[i].y - this._y, 2)));
			}
		}
		listofdist.sort();
		for (var i = 0; i < objects.length; i++) {
			if(Math.sqrt(Math.pow(objects[i].x - this._x, 2) + Math.pow(objects[i].y - this._y, 2)) == listofdist[0]) 
				return objects[i];
		}
		return null;
	}

	// SETTERS
	set sprite(s) {
		this._sprite = s;
		if(this._sprite !== null) {
			if (this._sprite.constructor.name == 'Animation') {
				this._sprite.x = this._x;
				this._sprite.y = this._y;
				this._sprite.width = this._width;
				this._sprite.height = this._height;
			}
		}
	} 

	set x(val) {
		this._x = val;
		if(this._sprite !== null) {
			if (this._sprite.constructor.name == 'Animation')
				this._sprite.x = val;
		}
	}

	set y(val) {
		this._y = val;
		if(this._sprite !== null) {
			if (this._sprite.constructor.name == 'Animation')
				this._sprite.y = val;
		}
	}

	set width(val) {
		this._width = val;
		if(this._sprite !== null) {
			if (this._sprite.constructor.name == 'Animation')
				this._sprite.width = val;
		}
	}

	set height(val) {
		this._height = val;
		if(this._sprite !== null) {
			if (this._sprite.constructor.name == 'Animation')
				this._sprite.height = val;
		}
	}

	set name(val) {
		this._name = val;
	}

	// GETTERS
	get x() {
		return this._x;
	}

	get y() {
		return this._y;
	}

	get width() {
		return this._width;
	}

	get height() {
		return this._height;
	}

	get spite() {
		return this._sprite;
	}

	get id() {
		return this._id;
	}

	get name() {
		return this._name;
	}
}