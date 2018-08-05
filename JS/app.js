console.log('Collision Detection');

const canvas = document.getElementById('canvas');

const ctx = canvas.getContext('2d');

class Ball	{
	constructor (x, y, r, color, speedX, speedY) {
		this.x = x;

		this.y = y;

		this.r = r;

		this.color = color;
	}

	draw () {
		const {x, y, r, color, speedX, speedY} = this;

		ctx.beginPath();

		ctx.fillStyle = color;

		ctx.arc(x, y, r, 0, Math.PI * 2);

		ctx.stroke();
	}
};


const circle = new Ball(100, 100, 10, '#333', 5, 5);
circle.draw();
