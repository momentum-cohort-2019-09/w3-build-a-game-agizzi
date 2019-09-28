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

		let playerStartLocation = {
			x: 160,
			y: 296
		};

		this.player = new Player(playerSize, playerStartLocation);
		this.addBody(this.player);

		let coinSize = {
			width: 22,
			height: 22
		};

		let coinStartLocation = {
			x: 310,
			y: 168
		};

		this.coin = new Coin(coinSize, coinStartLocation);
		this.addBody(this.coin);
	}

	addBody(body) {
		this.bodies.push(body);
	}

	update() {
		let notCollidingWithAnything = (b1) => {
			return (
				this.bodies.filter(function(b2) {
					return collidingCoin(b1, b2);
				}).length === 0
			);
		};

		this.bodies = this.bodies.filter(notCollidingWithAnything);

		for (let i = 0; i < this.bodies.length; i++) {
			this.bodies[i].update();
		}
	}

	play() {
		const tick = () => {
			this.update();
			this.draw(this.screen, this.size);
			requestAnimationFrame(tick);
		};
		tick();
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
		// this.movement = false;
	}

	draw(screen) {
		screen.fillStyle = 'white';
		screen.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);
	}

	update() {
		if (this.keyboard.isDown(Keyboarder.KEYS.RIGHT)) {
			// this.movement = true;
			this.position.x += 64;

			if (this.position.x >= 296) {
				this.position.x = 296;
			}
			// this.keyState === false;
		}
		if (this.keyboard.isDown(Keyboarder.KEYS.LEFT)) {
			// this.movement = true;
			this.position.x -= 64;

			if (this.position.x <= 160) {
				this.position.x = 160;
			}
		}
		if (this.keyboard.isDown(Keyboarder.KEYS.UP)) {
			// this.movement = true;
			this.position.y -= 64;

			if (this.position.y <= 160) {
				this.position.y = 160;
			}
		}
		if (this.keyboard.isDown(Keyboarder.KEYS.DOWN)) {
			// this.movement = true;
			this.position.y += 64;

			if (this.position.y >= 296) {
				this.position.y = 296;
			}
		}

		// this.movement = false;
		// console.log(this.position.x);
	}
}

class Coin {
	constructor(size, position) {
		this.size = size;
		this.position = position;
	}

	draw(screen) {
		screen.fillStyle = 'yellow';
		screen.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);
	}

	update() {}
}

class Keyboarder {
	constructor() {
		this.keyState = {};

		window.addEventListener(
			'keydown',
			function(e) {
				console.log('keydown')
				console.log(e.keycode + this.keyState[e.KeyCode])
				this.keyState[e.keyCode] = true;
				console.log(e.keycode + this.keyState[e.KeyCode])
			}.bind(this)
		);

		window.addEventListener(
			'keyup',
			function(e) {
				console.log('keyup')
				console.log(e.keycode + this.keyState[e.KeyCode])
				this.keyState[e.KeyCode] = false;
				console.log(e.keycode + this.keyState[e.KeyCode])
			}.bind(this)
		);
	}

	isDown(keyCode) {
		return this.keyState[keyCode] === true;
	}

	// isUp(keyCode) {
	// 	return this.keyState[keyCode] === false;
	// }

	on(keyCode, callback) {
		window.addEventListener('keydown', function(e) {
			console.log('callback')
			if (e.keyCode === keyCode) {
				callback();
			}
		});
	}
}

Keyboarder.KEYS = { LEFT: 37, RIGHT: 39, UP: 38, DOWN: 40 };

function collidingSweeper(b1, b2) {
	return !(
		b1 === b2 ||
		b1.size.width / 2 < b2.size.width / 2 ||
		b1.size.height / 2 < b2.size.height / 2 ||
		b1.size.width / 2 > b2.size.width / 2 ||
		b1.size.height / 2 > b2.size.height / 2
	);
}

function collidingCoin(b1, b2) {
	console.log(b1, b2);
	return !(
		b1 === b2 &&
		b1.size.width < b2.size.width &&
		b1.size.height < b2.size.height &&
		b1.size.width > b2.size.width &&
		b1.size.height > b2.size.height
	);
}

const game = new Game('gameCanvas');
game.play();
