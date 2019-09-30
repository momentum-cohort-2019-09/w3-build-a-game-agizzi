class Game {
	constructor(canvasId) {
		const canvas = document.getElementById(canvasId);
		this.screen = canvas.getContext('2d');
		this.size = { width: canvas.width, height: canvas.height };
		this.bodies = [];
		this.player = player;
		// this.coin = coin;
		// this.player = player;

		// this.score = 0;
	}

	addBody(body) {
		this.bodies.push(body);
		console.log(this.bodies);
	}

	play() {
		let player = new Player(this);
		this.addBody(player);
		let coin = new Coin(this);
		this.addBody(coin);

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

	update() {}
}

class Player {
	constructor(game, size) {
		this.game = game;
		this.size = { x: 44, y: 44 };
		this.position = {
			x: 160,
			y: 296
		};
		this.center = { x: this.position.x / 2, y: this.position.y / 2 };
		this.keyboard = new Keyboarder();
	}

	draw(screen) {
		screen.fillStyle = 'white';
		screen.fillRect(this.position.x, this.position.y, 44, 44);
	}

	update() {
		if (this.keyboard.isDown(Keyboarder.KEYS.RIGHT)) {
			this.position.x += 8;

			if (this.position.x >= 296) {
				this.position.x = 296;
			}
		}
		if (this.keyboard.isDown(Keyboarder.KEYS.LEFT)) {
			this.position.x -= 8;
			if (this.position.x <= 160) {
				this.position.x = 160;
			}
		}
		if (this.keyboard.isDown(Keyboarder.KEYS.UP)) {
			this.position.y -= 8;
			if (this.position.y <= 160) {
				this.position.y = 160;
			}
		}
		if (this.keyboard.isDown(Keyboarder.KEYS.DOWN)) {
			this.position.y += 8;
			if (this.position.y >= 296) {
				this.position.y = 296;
			}
		}
		// console.log(this.position.x);
	}
}

class Coin {
	constructor(game, size, position) {
		this.size = { x: 22, y: 22 };
		this.position = { x: 307, y: 171 };
		this.center = { x: this.position.x / 2, y: this.position.y / 2 };
		this.collision = false;
	}

	draw(screen) {
		screen.fillStyle = 'yellow';
		screen.fillRect(this.position.x, this.position.y, 22, 22);
	}

	coinSpawn = [
		{ x: 182, y: 182 },
		{ x: 246, y: 182 },
		{ x: 310, y: 182 },
		{ x: 182, y: 246 },
		{ x: 246, y: 246 },
		{ x: 310, y: 246 },
		{ x: 182, y: 310 },
		{ x: 246, y: 310 },
		{ x: 310, y: 310 }
	];

	// collision = false;

	// coinCollision() {
	// 	if (this.coin.position.x - Game.player.position.x <= 22) {
	// 		collision = true;
	// 	}
	// }

	update() {
		Math.floor(Math.random() * Math.floor(9));
		if (this.coin.position.x - Game.player.position.x <= 22) {
			collision = true;
		}
		// console.log(this.position.x);
		console.log(collision);
	}
}

function colliding(b1, b2) {
	return !// b1.safe ||
	// b2.safe ||
	(
		b1 === b2 ||
		b1.center.x + b1.size.width / 2 < b2.center.x - b2.size.width / 2 ||
		b1.center.y + b1.size.height / 2 < b2.center.y - b2.size.height / 2 ||
		b1.center.x - b1.size.width / 2 > b2.center.x + b2.size.width / 2 ||
		b1.center.y - b1.size.height / 2 > b2.center.y + b2.size.height / 2
	);
}

function drawScore() {
	this.screen.font = '16px Century-Gothic';
	this.screen.fillStyle = '#7EE8FA';
	// this.screen.fillText('Score: ' + score);
}

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
				this.keyState[e.keyCode] = false;
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

Keyboarder.KEYS = { LEFT: 37, RIGHT: 39, UP: 38, DOWN: 40 };

// window.addEventListener('load', function() {
// 	let game = new Game('gameCanvas');
// 	game.play();
// });

let game = new Game('gameCanvas');
game.play();
