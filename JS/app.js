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

		ctx.stroke();
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
			const newBall = new Ball(getRandCoor('x'), getRandCoor('y'), 10, '#f00', 5, 5);
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
balls.generate(10);


const animate = () => {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	balls.drawAll();
	balls.moveAll();
	requestAnimationFrame(animate);
};

animate();




