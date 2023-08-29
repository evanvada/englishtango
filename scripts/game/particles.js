

glitters = [];

class Glitter {

    static colors = [
        [17, 132, 226],
        [0, 77, 177],
        [238, 69, 27],
        [167, 20, 9],
        [255, 172, 94],
        [241, 124, 78],
        [7, 227, 227],
        [0, 151, 211],
    ]
    
    constructor(x, y) {
		this.x = x
		this.y = y
		const r = randomFloat(-2*Math.PI, 0)
		const s = randomFloat(0, 1000)
		this.vx = Math.cos(r)*s
		this.vy = Math.sin(r)*s
		this.life = 0.2+randomFloat(0, 0.5)
		this.color = randomItem(Glitter.colors)
	}

	update() {
		this.life -= deltaTime;
		this.vy += 1000 * deltaTime;
        this.vx -= this.vx * 0.95 * deltaTime;
        this.vy -= this.vy * 0.95 * deltaTime;
		// update position
		this.x += this.vx * deltaTime;
		this.y += this.vy * deltaTime;
	}

	draw() {
		ctx.fillStyle = convertArrayRGB(this.color.map(element => element + randomInt(-50, 50)));
		drawCircle(this.x, this.y, 5);
	}
}

function updateParticles(array) {
	for (var i = array.length - 1; i >= 0; i--) {
		if (array[i].life <= 0) {
			array.splice(i, 1)
		} else {
			array[i].update()
		}
	}
}

function drawParticles(array) {
	for (var i = 0; i < array.length; i++) {
		array[i].draw()
	}
}


