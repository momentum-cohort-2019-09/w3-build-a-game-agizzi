class Game {
	constructor(canvasId) {
		const canvas = document.getElementById(canvasId);
		this.screen = canvas.getContext('2d');
		this.size = { width: canvas.width, height: canvas.height };
		this.bodies = [];
		this.gameOver = false;

		this.score = 0;
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
		let enemy = new Enemy(this);
		this.addBody(enemy);

		const tick = () => {
			this.update();
			this.draw(this.screen, this.size);
			if (!this.gameOver) {
				window.requestAnimationFrame(tick);
			}
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

	update() {
		for (let i = 0; i < this.bodies.length; i++) {
			this.bodies[i].update();
		}
	}
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
		this.game = game;
		this.size = { x: 22, y: 22 };
		this.position = { x: 307, y: 171 };
		this.center = { x: this.position.x / 2, y: this.position.y / 2 };
		this.collision = false;
		this.coinSpawn = [
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
	}

	draw(screen) {
		screen.fillStyle = 'yellow';
		screen.fillRect(this.position.x, this.position.y, 22, 22);
	}

	update() {
		if (
			Math.abs(this.position.x - this.game.bodies[0].position.x) <= 22 &&
			Math.abs(this.position.y - this.game.bodies[0].position.y) <= 22
		) {
			this.position = this.coinSpawn[Math.floor(Math.random() * Math.floor(9))];
			this.game.score += 1;
			console.log(this.game.score);
			document.querySelector('.scoreBox').innerHTML = `Your score is ${this.game.score} !`;
		}
		// console.log(this.position.x);
		// console.log(this.collision);
	}
}

class Enemy {
	constructor(game, size, position) {
		this.game = game;
		this.size = { x: 22, y: 22 };
		this.position = { x: 182, y: 0 };
		this.center = { x: this.position.x / 2, y: this.position.y / 2 };
		this.velocity = 3;
		this.enemySpawnX = [ { x: 182, y: 0 }, { x: 246, y: 0 }, { x: 310, y: 0 } ];
		// this.enemySpawnY = [ { x: 0, y: 182 }, { x: 0, y: 246 }, { x: 0, y: 310 } ];
	}
	draw(screen) {
		screen.fillStyle = '#7EE8FA';
		screen.fillRect(this.position.x, this.position.y, 22, 22);
	}

	addEnemy() {
		game.addBody(new Enemy((this.position = this.enemySpawnX[Math.floor(Math.random() * Math.floor(3))])));
		// game.addBody(new Enemy((this.position = this.enemySpawnY[Math.floor(Math.random() * Math.floor(3))])));
	}

	update() {
		// this.position.y += 1;
		this.position.y += 1;

		if (Math.random() < 0.001) {
			this.addEnemy();
			// this.ticksSinceEnemy = 0;
		}
		if (
			Math.abs(this.position.x - game.bodies[0].position.x) <= 22 &&
			Math.abs(this.position.y - game.bodies[0].position.y) <= 22
		) {
			this.game.score = 0;
			// 	console.log(this.game.score);
			document.querySelector('.scoreBox').innerHTML = `Your score is ${this.game.score} !`;
		}
		// function checkPosition() {
		// 	if (this.position.x > 500 || this.position.y > 500) {
		// 		return true;
		// 	}
		// }
		// this.game.bodies = this.game.bodies.filter(checkPosition);
	}
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
