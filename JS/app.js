console.log('Collision Detection');

const canvas = document.getElementById('canvas');

const ctx = canvas.getContext('2d');

const getDistance = (x1, y1, x2, y2) => {
	const xDist = x2 - x1;
	const yDist = y2 - y1;

	return (Math.sqrt((xDist ** 2) + (yDist ** 2))) - 40;
};

class Ball	{
	constructor ({x, y}, r, color, speedX, speedY) {
		this.x = x;

		this.y = y;

		this.r = r;

		this.color = color;

		this.speedX = speedX;

		this.speedY = speedY;
	}

	draw () {
		const {x, y, r, color, speedX, speedY} = this;

		ctx.beginPath();

		ctx.strokeStyle = color;

		ctx.arc(x, y, r, 0, Math.PI * 2);
		
		ctx.stroke();

		ctx.closePath();

	}

	move () {

		if (this.x + this.speedX > canvas.width - this.r || this.x + this.speedX < this.r) {

			this.speedX = -this.speedX;
		};

		if (this.y + this.speedY > canvas.height - this.r || this.y + this.speedY < this.r) {

			this.speedY = -this.speedY;
		};

		this.x += this.speedX;
		this.y += this.speedY;

	}
	checkDistance () {
		const {balls} = particles;

		for (let i = 0, len = balls.length; i < len; i ++) {
			if (this !== balls[i]) {
				if (getDistance(this.x, this.y, balls[i].x, balls[i].y) < 0) {
					console.log('Collided!');
				};
			};
		};
	}
};

class BallFactory {
	constructor () {
		this.balls = [];
	}

	getRandCoor () {
		const {width, height}       = canvas,
		{balls:{length:bLen},balls} = this,
		xCoor                       = (Math.random() * (width - 40)) + 20,
		yCoor                       = (Math.random() * (height - 40)) + 20 ;	


		for (let i = 0; i < bLen; i ++) {
			if (getDistance(xCoor, yCoor, balls[i].x, balls[i].y) < 0) {
				return this.getRandCoor();
			};
		};	
		return {
			x: xCoor,
			y: yCoor
		};
	}


	generate (amount) {
		const {balls} = this;
		for (let i = 0; i < amount; i ++) {
			const newBall = new Ball(this.getRandCoor(), 20, '#00f', 5, 5);

			balls.push(newBall);
		}	
	}

	drawAll () {
		const {balls} = this;

		balls.forEach(ball => ball.draw());
	}
	moveAll () {
		const {balls} = this;

		balls.forEach(ball => ball.move());
	}
	collisionDetection () {
		const {balls} = this;

		balls.forEach(ball => ball.checkDistance());
	}

}

const particles = new BallFactory;
particles.generate(4);



const animate = () => {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	particles.drawAll();
	particles.moveAll();
	particles.collisionDetection();

	requestAnimationFrame(animate);
};

animate();






