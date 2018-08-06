console.log('Collision Detection');

const canvas = document.getElementById('canvas');

const ctx = canvas.getContext('2d');

const getDistance = (x1, y1, x2, y2) => {
	const xDist = x2 - x1;
	const yDist = y2 - y1;

	return (Math.sqrt((xDist ** 2) + (yDist ** 2))) - 40;
};
const getRandColor = () => {
		const colors = ['#7FFFD4', '#FF80AA', '#00FFFF'];
		const indx = Math.floor(Math.random() * 3);
		return colors[indx];
}

/*

* Rotates coordinate sytem for velocities
* Takes velocities and alters them as if the coordinate system  they're on was rotated
* @param Object | velocity | the velocity of an individual particle
* @param Float  | angle    | the angle of collision of two particles in radians
* @eturn Object | The altered x and y velocities after the coordinate system was rotated


*/

const rotate = (velocity, angle) => {
	const rotatedVelocities = {
		x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
		y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
	};

	return rotatedVelocities;
};


/*

* Swaps out two colliding particles' x and y velocities after running through an elastic collision reaction equation
* @param Object | particle      | a particle object with x and y coordinates, plus velocity
* @param Object | otherParticle | a particle object with x and y coordinates, plus velocity
* @return undefined  | Does not return a value

*/


const resolveCollision = (particle, otherParticle) => {
	const xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
	const yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;

	const xDist = otherParticle.x - particle.x;
	const yDist = otherParticle.y - particle.y;

	// Prevent accidental overlap of particles
	if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {
		// Grab angle between two colliding particles
		const angle = -Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x);

		// Store mass in var for better readability in collision equation.

		const m1 = particle.mass;
		const m2 = otherParticle.mass;

		// Velocity before equation
		const u1 = rotate(particle.velocity, angle);
		const u2 = rotate(otherParticle.velocity, angle);


		// Velocity after 1d collision equation
		const v1 = { x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y};
		const v2 = { x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), y: u2.y};

		// Final velocity after rotating axis back to original location
		const vFinal1 = rotate(v1, -angle);
		const vFinal2 = rotate(v2, -angle);

		// Swap particles velocity for realistic bounce effect

		particle.velocity.x = vFinal1.x;
		particle.velocity.y = vFinal1.y;

		otherParticle.velocity.x = vFinal2.x;
		otherParticle.velocity.y = vFinal2.y;

	}
};

class Ball	{
	constructor ({x, y}, r) {
		this.x = x;

		this.y = y;

		this.r = r;

		this.velocity = {
			x: (Math.random() - 0.5) * 4,
			y: (Math.random() - 0.5) * 4
		};

		this.mass = 1;

		this.color = getRandColor();
	}

	draw () {
		const {x, y, r, color} = this;

		ctx.beginPath();
		
		ctx.arc(x, y, r, 0, Math.PI * 2);

		ctx.save();

		ctx.globalAlpha = 0.3;
		
		ctx.fillStyle = color;

		ctx.fill();

		ctx.restore();

		ctx.strokeStyle = color;

		ctx.stroke();

		ctx.closePath();

	}

	move () {

		if (this.x + this.velocity.x > canvas.width - this.r || this.x + this.velocity.x < this.r) {

			this.velocity.x = -this.velocity.x;
		};

		if (this.y + this.velocity.y > canvas.height - this.r || this.y + this.velocity.y < this.r) {

			this.velocity.y = -this.velocity.y;
		};

		this.x += this.velocity.x;
		this.y += this.velocity.y;

	}
	checkDistance () {
		const {balls} = particles;

		for (let i = 0, len = balls.length; i < len; i ++) {
			if (this !== balls[i]) {
				if (getDistance(this.x, this.y, balls[i].x, balls[i].y) < 0) {
					resolveCollision(this, balls[i]);
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
			const newBall = new Ball(this.getRandCoor(), 20);

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
particles.generate(100);



const animate = () => {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	particles.drawAll();
	particles.moveAll();
	particles.collisionDetection();

	requestAnimationFrame(animate);
};

animate();






