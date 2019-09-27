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
	}

	addBody(body) {
		this.bodies.push(body);
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
			body.draw(this.screen);
		}
	}
}

class Player {
	constructor(size, position) {
		this.size = size;
		this.position = position;
	}
	// update (game) {}
	draw(screen) {
		screen.fillStyle = 'white';
		screen.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);
	}
}

const game = new Game('gameCanvas');
game.play();
