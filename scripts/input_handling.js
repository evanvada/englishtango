// keyboard event handling
var key = {};
var last_key = jsonCopy(key);
document.addEventListener('keyup', keyUpListener);
document.addEventListener('keydown', keyDownListener);
function keyDownListener(event) { key[event.key] = true }
function keyUpListener(event) { key[event.key] = false }

// mouse event handling
var mouse = {};
var last_mouse = jsonCopy(mouse);
document.addEventListener('mouseup', mouseUpListener);
document.addEventListener('mousedown', mouseDownListener);
document.addEventListener('mousemove', mouseMoveListener);
function mouseDownListener(event) {
	switch (event.button) {
		case 0: mouse.left = true; break;
		case 1: mouse.middle = true; break;
		case 2: mouse.right = true; break;
	}
}
function mouseUpListener(event) {
	switch (event.button) {
		case 0: mouse.left = false; break;
		case 1: mouse.middle = false; break;
		case 2: mouse.right = false; break;
	}
}
function mouseMoveListener(event) {
	var rect = canvas.getBoundingClientRect()
	mouse.x = event.pageX - rect.left
	mouse.y = event.pageY - rect.top
}