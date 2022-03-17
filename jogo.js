// Using an Object Layer to limit movement and changing Map Tiles.
var tmap, smiley, plantsIndex;
var x, y, topY = [];

let video;

let noseX = 0;
let noseY = 0;

let initialBirdX = 100;

let tunelX = 320;

let colected1 = false, colected2 = false, colected3 = false, colected4 = false, colected5 = false;
let cursosESTG = 0;

let inicio = true;

function preload() {
	bird = loadImage("data/bird2.png");
	newFont = loadFont('fonts/dimitri.ttf');
	begin = loadImage("data/WallpaperBegin.png");
	badge = loadImage("data/badgeteste1.png");
	tunelTop = loadImage("data/Tunnel.png");
	tunelDown = loadImage("data/Tunnel2.png");
	logo = loadImage("data/logo.png");
}

function setup() {
	createCanvas(640, 480);

	video = createCapture(VIDEO);
	video.hide();

	poseNet = ml5.poseNet(video);

	poseNet.on('pose', getPoses);

	for (let i = 1; i < 25; i++) {
		topY[i] = random(-540, -440);
	}
}

function getPoses(poses) {
	if (poses.length > 0) {
		let nY = poses[0].pose.keypoints[0].position.y;

		noseY = lerp(noseY, nY, 0.5);
	}
}

function rectRect(x1, y1, w1, h1, x2, y2, w2, h2) {

	// test for collision
	if (x1 + w1 / 2 >= x2 - w2 / 2 && x1 - w1 / 2 <= x2 + w2 / 2 && y1 + h1 / 2 >= y2 - h2 / 2 && y1 - h1 / 2 <= y2 + h2 / 2) {
		return true;    // if a hit, return true
	}
	else {            // if not, return false
		return false;
	}
}

function rectBall(rx, ry, rw, rh, bx, by, d) {

	// first test the edges (this is necessary if the rectangle is larger
	// than the ball) - do this with the Pythagorean theorem

	// if ball entire width position is between rect L/R sides
	if (bx + d / 2 >= rx - rw / 2 && bx - d / 2 <= rx + rw / 2 && abs(ry - by) <= d / 2) {
		return true;
	}
	// if not, check if ball's entire height is between top/bottom of the rect
	else if (by + d / 2 >= ry - rh / 2 && by - d / 2 <= ry + rh / 2 && abs(rx - bx) <= d / 2) {
		return true;
	}

	// if that doesn't return a hit, find closest corner
	// this is really just a point, so we can test if we've hit it 
	// upper-left
	var xDist = (rx - rw / 2) - bx;  // same as ball/ball, but first value defines point, not center
	var yDist = (ry - rh / 2) - by;
	var shortestDist = sqrt((xDist * xDist) + (yDist * yDist));

	// upper-right
	xDist = (rx + rw / 2) - bx;
	yDist = (ry - rh / 2) - by;
	var distanceUR = sqrt((xDist * xDist) + (yDist * yDist));
	if (distanceUR < shortestDist) {  // if this new distance is shorter...
		shortestDist = distanceUR;      // ... update
	}

	// lower-right
	xDist = (rx + rw / 2) - bx;
	yDist = (ry + rh / 2) - by;
	var distanceLR = sqrt((xDist * xDist) + (yDist * yDist));
	if (distanceLR < shortestDist) {
		shortestDist = distanceLR;
	}

	// lower-left
	xDist = (rx - rw / 2) - bx;
	yDist = (ry + rh / 2) - by;
	var distanceLL = sqrt((xDist * xDist) + (yDist * yDist));
	if (distanceLL < shortestDist) {
		shortestDist = distanceLL;
	}

	// test for collision
	if (shortestDist < d / 2) {  // if less than radius
		return true;             // return true
	}
	else {                     // otherwise, return false
		return false;
	}
}

function draw() {
	if (inicio) {
		background('grey');
		imageMode(CORNER);
		image(begin, 0, 0);
	} else {
		background('grey');

		imageMode(CORNER);
		image(video, 0, 0);

		iniciarMapa();

		tunelX = tunelX - 2.5;

		imageMode(CENTER);
		image(bird, initialBirdX, noseY, 32, 32);

		imageMode(CORNER);
		image(logo, 25, 25, 120, 60);

		imageMode(CENTER);
		fill(55, 59, 54);
		noStroke();
		ellipse(width / 2, 55, 50, 50);
		fill(255);
		textSize(32);
		textFont(newFont);
		text(`${cursosESTG}`, width / 2 - 8, 65);
	}
}

function mouseClicked() {
	if (inicio) {
		inicio = !inicio;
	}
}


/* -- Print dos tuneis -- */
function iniciarMapa() {

	/* -- Loop do número de tuneis a mostrar -- */
	for (let i = 1; i < 25; i++) {
		
		/* -- Mostra cada tunel (cima e baixo) -- */
		image(tunelTop, tunelX + (300 * i), topY[i]);
		image(tunelDown, tunelX + (300 * i), (topY[i] + 790));

		/* -- Invoca a função das colisões, com o devido i -- */
		testarColisão(i);

	}

}


/* -- Testa a colisão com cada tunel (cima e baixo) -- */
function testarColisão(i) {

	/* -- Testa colisão com o tunel de cima -- */
	if ((initialBirdX + 16) > (tunelX + (300 * i)) && (initialBirdX - 16) < (tunelX + (300 * i) + 71) && (noseY + 16) > (topY[i]) && (noseY - 16) < (topY[i] + 640)) {
		text("TOCOU", initialBirdX - 16, noseY - 32);
	}


	/* -- Testa colisão com o tunel de baixo -- */
	if ((initialBirdX + 16) > (tunelX + (300 * i)) && (initialBirdX - 16) < (tunelX + (300 * i) + 71) && (noseY + 16) > (topY[i] + 790) && (noseY - 16) < (topY[i] + 640 + 790)) {
		text("TOCOU", initialBirdX - 16, noseY - 32);
	}

}