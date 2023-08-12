
// arrays of particles
emojis = []
glitters = []

// screen shake
var shake = 0

class FlyingEmoji {
	constructor(x, y) {
		this.x = x
		this.y = y
		var r = randomFloat(-2*Math.PI, 0)
		var s = randomFloat(0,2)
		this.vx = Math.cos(r)*s
		this.vy = Math.sin(r)*s

		this.rotation = randomFloat(-1, 1)

		this.start_life = 100+randomInt(0, 100)
		this.life = this.start_life
		this.emoji = randomItem(['🎖️','🏆','🏅','🥇','🎖️','🏆','🏅','🥇','🎆','🎇','✨','🎈','🎉','🎀','🎯'])
	}
	update() {
		this.life -= 1
		// update position
		this.x += this.vx
		this.y += this.vy
	}
	draw() {

		var size_multiply = (1-Math.max(0, this.life-this.start_life+20)/20)*(1-Math.max(0, 20-this.life)/20)
		ctx.font = 40*size_multiply+"px Arial";

		ctx.save();
		ctx.translate(this.x+canvas.width/2, this.y+canvas.height/2);
		ctx.rotate(this.rotation + Math.cos(this.life*0.1)*0.1);
		ctx.textAlign = "center";
		ctx.fillText(this.emoji, 0, 0)
		ctx.restore();
	}
}

class Glitter {
	constructor(x, y) {
		this.x = x
		this.y = y
		var r = randomFloat(-2*Math.PI, 0)
		var s = randomFloat(0,15)
		this.vx = Math.cos(r)*s
		this.vy = Math.sin(r)*s
		this.life = 100+randomInt(0, 50)
		this.color = generateRGBArray()
	}
	update() {
		this.life -= 1
		this.vy += 0.1
		// update position
		this.x += this.vx
		this.y += this.vy
	}
	draw() {
		for (var i = 0; i < 3; i++) {
			this.color[i] += randomInt(-10, 10)*4
		}
		ctx.fillStyle = convertArrayRGB(this.color);
		drawCircle(this.x+canvas.width/2, this.y+canvas.height/2, 5);
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