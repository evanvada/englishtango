
// copies object
function jsonCopy(src) {
	return JSON.parse(JSON.stringify(src));
}

// returns random integer
function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min)
}

function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		const temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
}

// plays a random sound from an array or a single sound
function playSound(sounds, volume=1, pitch=1) {
	let cloned_sound = null
	if (Array.isArray(sounds)) {cloned_sound = randomItem(sounds).cloneNode()} else {cloned_sound = sounds.cloneNode()}
	if (pitch!=1) {
		cloned_sound.mozPreservesPitch = false;
		cloned_sound.preservesPitch = false;
		cloned_sound.playbackRate = pitch;
	}
	cloned_sound.volume = volume;
	cloned_sound.play();
}

function randomItem(arr) {
	return arr[Math.floor(Math.random()*arr.length)];
}

// returns random integer
function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min)
}

// returns random float
function randomFloat(min, max) {
	return Math.random() * (max - min) + min
}

// convert an rgb array to a color string
function convertArrayRGB(ar, a=1) {
	return "rgba("+ar[0]+", "+ar[1]+", "+ar[2]+", "+a+")";
}

function drawCircle(x, y, r) {
	ctx.beginPath();
	ctx.arc(x, y, r, 0, 2*Math.PI, false);
	ctx.fill();
}

