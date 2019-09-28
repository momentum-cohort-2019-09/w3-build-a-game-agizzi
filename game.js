class Game {
	constructor(canvasId) {
		const canvas = document.getElementById(canvasId);
		this.screen = canvas.getContext('2d');
		this.size = { width: canvas.width, height: canvas.height };

		this.bodies = [];

		let playerSize = {
			width: 44,
			height: 44
		};

		// center coordinates
		let playerStartLocation = {
			x: 160,
			y: 296
		};
		this.addBody(new Player(playerSize, playerStartLocation));

		let tick = () => {
			this.update();
			this.draw(this.screen, this.size);
			requestAnimationFrame(tick);
		};
		tick();
	}

	addBody(body) {
		this.bodies.push(body);
	}

	update() {
		for (let body of this.bodies) {
			body.update();
		}
	}

	play() {
		this.draw();
	}

	draw() {
		this.screen.fillStyle = 'plum';
		this.screen.fillRect(0, 0, 500, 500);

		this.screen.strokeStyle = '#FFFFFF';
		this.screen.lineWidth = 8;
		this.screen.strokeRect(150, 150, 200, 200);

		for (let body of this.bodies) {
			body.update(this);
			body.draw(this.screen);
		}
	}
}

class Player {
	constructor(size, position) {
		this.size = size;
		this.position = position;
		this.keyboard = new Keyboarder();
	}
	update(game) {}
	draw(screen) {
		screen.fillStyle = 'white';
		screen.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);
	}

	update() {
		if (this.keyboard.isDown(Keyboarder.KEYS.RIGHT)) {
			this.position.x += 1;
		}
		// console.log(this.position.x);
	}
}
// }

class Keyboarder {
	constructor() {
		this.keyState = {};

		window.addEventListener(
			'keydown',
			function(e) {
				this.keyState[e.keyCode] = true;
			}.bind(this)
		);

		window.addEventListener(
			'keyup',
			function(e) {
				this.keyState[e.KeyCode] = false;
			}.bind(this)
		);
	}

	isDown(keyCode) {
		return this.keyState[keyCode] === true;
	}

	on(keyCode, callback) {
		window.addEventListener('keydown', function(e) {
			if (e.keyCode === keyCode) {
				callback();
			}
		});
	}
}

Keyboarder.KEYS = { LEFT: 65, RIGHT: 68, UP: 87, DOWN: 83, S: 83 };

const game = new Game('gameCanvas');
game.play();
