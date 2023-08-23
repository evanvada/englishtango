// canvas configuration & update
const canvas = document.querySelector(".canvas-overlay");
const ctx = canvas.getContext("2d");
function loop() {
	ctx.canvas.width  = window.innerWidth;
	ctx.canvas.height = window.innerHeight;
	ctx.imageSmoothingEnabled = false;
	update();
	last_key = jsonCopy(key)
	last_mouse = jsonCopy(mouse)
	requestAnimationFrame(loop)
}