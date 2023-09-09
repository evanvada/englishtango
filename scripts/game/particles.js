

glitters = [];
gems = [];

var gemImg = new Image();
gemImg.src = "../../media/gem.png";

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
		const r = randomFloat(-Math.PI, Math.PI)
		const s = randomFloat(0, 1000)
		this.scatter_x = Math.cos(r)*s
		this.scatter_y = Math.sin(r)*s
		this.startLife = 0.2 + randomFloat(0, 0.5)
		this.life = this.startLife
		this.color = randomItem(Glitter.colors)
	}

	update() {
		this.life -= deltaTime;
		this.scatter_y += 1000 * deltaTime;
        this.scatter_x -= this.scatter_x * 0.95 * deltaTime;
        this.scatter_y -= this.scatter_y * 0.95 * deltaTime;
		// update position
		this.x += this.scatter_x * deltaTime;
		this.y += this.scatter_y * deltaTime;
	}

	draw() {
		ctx.fillStyle = convertArrayRGB(this.color.map(element => element + randomInt(-50, 50)));
		drawCircle(this.x, this.y, 5);
	}
}

class Gem {
    
    constructor(start_x, start_y, dest_x, dest_y, updateLast) {
		this.start_x = start_x
		this.start_y = start_y
		this.dest_x = dest_x
		this.dest_y = dest_y

		this.size = 0
		this.x = start_x
		this.y = start_y
		this.r = randomFloat(-Math.PI, Math.PI)

		const r = randomFloat(-Math.PI, Math.PI)
		const s = randomFloat(50, 100)
		this.scatter_x = Math.cos(r)*s
		this.scatter_y = Math.sin(r)*s

		this.startLife = 2 + randomFloat(0, 0.5)
		this.life = this.startLife

		this.updateLast = updateLast
	}

	update() {
		this.life -= deltaTime;

		this.x = this.start_x
		this.y = this.start_y

		let scatterProgress = (this.startLife - this.life)*0.8
		this.x += this.scatter_x*easeOutQuint(scatterProgress)
		this.y += this.scatter_y*easeOutQuint(scatterProgress)

		let magnetizeProgress = (this.startLife - this.life)/this.startLife
		this.x += (this.dest_x-this.x)*easeInQuint(magnetizeProgress)
		this.y += (this.dest_y-this.y)*easeInQuint(magnetizeProgress)

		if (this.startLife - this.life < 0.1) {
			this.size = normalize01((this.startLife - this.life)/0.1)
		}
		if (this.life < 0.05) {
			this.size = normalize01(this.life/0.05)
		}

		if (this.life <= 0) {
			this.updateLast()
		}
	}

	draw() {
		ctx.save();
		ctx.translate(this.x, this.y);
		ctx.rotate(this.r);
		ctx.drawImage(gemImg, -16*this.size, -16*this.size, 32*this.size, 32*this.size);
		ctx.restore();
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


