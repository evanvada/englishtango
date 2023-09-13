
export function jsonDeepCopy(src) {
	return JSON.parse(JSON.stringify(src));
}

export function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		const temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
}

// plays a random sound from an array or a single sound
export function playSound(sounds, volume=1, pitch=1) {
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

export function randomItem(arr) {
	return arr[Math.floor(Math.random()*arr.length)];
}

export function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min)
}

export function randomFloat(min, max) {
	return Math.random() * (max - min) + min
}

export function convertRGBArrayToString(ar, a=1) {
	return "rgba("+ar[0]+", "+ar[1]+", "+ar[2]+", "+a+")";
}

export function drawCircle(ctx, x, y, r) {
	ctx.beginPath();
	ctx.arc(x, y, r, 0, 2*Math.PI, false);
	ctx.fill();
}

export function wait(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

export function distance(x1, y1, x2, y2) {
	d_x = x2-x1
	d_y = y2-y1
	d = Math.sqrt(d_x*d_x+d_y*d_y)
	return d
}

export function normalizeBetween01(x) {
	return Math.min(1, Math.max(0, x));
}

export function easeInQuint(x) {
	let X = normalizeBetween01(x);
	return X * X * X * X * X;
}

export function easeOutQuint(x) {
	let X = normalizeBetween01(x);
	return 1 - Math.pow(1 - X, 5);
}

export function easeInOutSine(x) {
	let X = normalizeBetween01(x);
	return -(Math.cos(Math.PI * X) - 1) / 2;
}



