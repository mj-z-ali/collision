console.log('Collision Detection');

const canvas = document.getElementById('canvas');

const ctx = canvas.getContext('2d');

class Ball	{
	constructor (x, y, r, color, speedX, speedY) {
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

		ctx.fillStyle = color;

		ctx.arc(x, y, r, 0, Math.PI * 2);

		ctx.closePath();

		ctx.fill();
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
};

class BallFactory {
	constructor () {
		this.balls = [];
	}

	getRandCoor (coor) {
		const {width, height} = canvas;

		return (Math.random() * (coor === 'x' ? (width - 20): (height - 20))) + 10 ;
	}

	generate (amount) {
		const {balls, getRandCoor} = this;
		for (let i = 0; i < amount; i ++) {
			const newBall = new Ball(getRandCoor('x'), getRandCoor('y'), 10, 'red', 5, 5);
			balls.push(newBall);
		};
	}

	drawAll () {
		const {balls} = this;

		balls.forEach(ball => ball.draw());
	}
	moveAll () {
		const {balls} = this;

		balls.forEach(ball => ball.move());
	}	
}

const balls = new BallFactory;
balls.generate(2);

const circle = new Ball(undefined, undefined, 50, '#f0f', 0, 0);

const aBall = new Ball(500, 300, 50, '#0f0', 0, 0);


canvas.addEventListener('mousemove', (e) => {
	circle.x = e.clientX;
	circle.y = e.clientY;
});


const getDistance = (x1, y1, x2, y2) => {
	const xDist = x2 - x1;
	const yDist = y2 - y1;

	return Math.sqrt((xDist ** 2) + (yDist ** 2));
};

const animate = () => {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	balls.drawAll();
	// balls.moveAll();
	circle.draw();
	aBall.draw();
	if (getDistance(aBall.x, aBall.y, circle.x, circle.y) < 100) {
		aBall.color = '#f00';
	}
	else {
		aBall.color = '#0f0';
	}
	console.log();
	requestAnimationFrame(animate);
};

animate();






