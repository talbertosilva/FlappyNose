// Using an Object Layer to limit movement and changing Map Tiles.
var tmap, tmap2, smiley, plantsIndex, viewWalls = false;
let colected1 = false, colected2 = false, colected3 = false, colected4 = false, colected5 = false;

let video, poseNet, prevnoseX, prevnoseY, xBadge, yBadge, xBird, yBird;
let noseX = 50;
let noseY = 220;
let cursosESTG = 0;

let x = 0, y = 0;
let x2 = 200, y2 = 0;
let iniciar = false;
let perdeu = false;
let ganhou = false;
let committ = true;

function preload() {
	newFont = loadFont('fonts/dimitri.ttf');
	tmap = loadTiledMap("mapaNivelUm", "data");
	tmap2 = loadTiledMap("mapaNivelUm", "data");
	smiley = loadImage("data/smiley.png");
	badge = loadImage("data/badgeteste1.png");
	bird = loadImage("data/bird2.png");
	beginScreen = loadImage("data/WallpaperBegin.png");
}

function setup() {
	createCanvas(620, 460);
	smooth();
	noStroke();

	frameRate(30);
	walls = createGraphics(620, 460);
	initializeMap(tmap);
	initializeMap(tmap2);
	video = createCapture(VIDEO);
	video.frameRate(30);
	video.hide();

	poseNet = ml5.poseNet(video);

	poseNet.on('pose', getPoses);

	image(beginScreen, 0, 0, width, height);

	xBadge = 190;
	xBadge2 = 382;
	xBadge3 = 558;
	xBadge4 = 286;
	xBadge5 = 470;

	yBadge = random(208, 258);
	yBadge2 = random(170, 220);
	yBadge3 = random(188, 238);
	yBadge4 = random(170, 220);
	yBadge5 = random(188, 238);
}


function getPoses(poses) {
	//console.log(poses);
	if (poses.length > 0) {
		let nX = poses[0].pose.keypoints[0].position.x;
		let nY = poses[0].pose.keypoints[0].position.y;

		noseY = lerp(noseY, nY, 0.5);

		if (cursosESTG < 5) {
			noseX = noseX + (width/98);
			x = x + (8*16/640);
			x2 = x2 + (8*16/640);
		} else {
			noseX = 50;
			noseY = 220;
		}
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

	if (iniciar === false) {
		noseX = 50;
		noseY = 220;
	} else {
		background(tmap.getBackgroundColor());
		

		image(video, width / 2, height / 2);

		tmap.draw(x, y);
		tmap2.draw(x2, y2);
		
		if (viewWalls) {
			imageMode(CORNER);
			image(walls, 0, 0);
		}


		imageMode(CENTER);
		if (colected1 == false) {
			image(badge, xBadge, yBadge, 32, 32);
		}
		if (colected2 == false) {
			image(badge, xBadge2, yBadge2, 32, 32);
		}
		if (colected3 == false) {
			image(badge, xBadge3, yBadge3, 32, 32);
		}
		if (colected4 == false) {
			image(badge, xBadge4, yBadge4, 32, 32);
		}
		if (colected5 == false) {
			image(badge, xBadge5, yBadge5, 32, 32);
		}

		if (rectBall(xBadge, yBadge, 28, 28, noseX, noseY, 32, 32) && colected1 !== true) {
			colected1 = true;
			cursosESTG = cursosESTG + 1;
		} else if (rectBall(xBadge2, yBadge2, 28, 28, noseX, noseY, 32, 32) && colected2 !== true) {
			colected2 = true;
			cursosESTG = cursosESTG + 1;
		} else if (rectBall(xBadge3, yBadge3, 28, 28, noseX, noseY, 32, 32) && colected3 !== true) {
			colected3 = true;
			cursosESTG = cursosESTG + 1;
		} else if (rectBall(xBadge4, yBadge4, 28, 28, noseX, noseY, 32, 32) && colected4 !== true) {
			colected4 = true;
			cursosESTG = cursosESTG + 1;
		} else if (rectBall(xBadge5, yBadge5, 28, 28, noseX, noseY, 32, 32) && colected5 !== true) {
			colected5 = true;
			cursosESTG = cursosESTG + 1;
		}

		if (cursosESTG === 5){
			iniciar = false;
			ganhou = true;
		}

		/* -- TEXTO COM INFORMAÇÕES (coordenadas do nariz, cor detetada nessa coordenada, id da textura nessa coordenada) -- */
		textFont(newFont);
		textSize(48);
		fill(255);
		text(`${cursosESTG}`, width / 2 - 24, 72);

		walls.clear();

		xBird = round(noseX * 40 / 640) + 1;

		/* -- COLISÃO > caso esteja em cima dos objetos, o X/Y serão iguais aos X/Y antes da colisão --*/
		if (tmap.getTileIndex(0, xBird, (round(noseY * 40 / 640))) !== 0 || tmap.getTileIndex(0, xBird, (round(noseY * 40 / 640) + 2 )) !== 0) {
			location.reload();
		}else{
			imageMode(CENTER);
			image(bird, noseX, noseY, 32, 32);

			prevnoseY = noseY;
		}
	}
}

function keyPressed() {
	if (key == 'l' || key == 'L') viewWalls = !viewWalls;
}

function mouseClicked() {
	if (iniciar === false) {
		iniciar = !iniciar;
		perdeu = false;
	}
	if (cursosESTG === 3) {
		cursosESTG = 0;
		iniciar = false;
		perdeu = false;
		colected1 = false;
		colected2 = false;
		colected3 = false;
	}
}

/* -- INICIA O MAPA COM O DEVIDO TAMANHO EM TILES (40 x 30), 40 * 16 = 640 = tamanho da camera -- */
function initializeMap(map) {
		map.setPositionMode("MAP");
		map.setDrawMode(CENTER);
		var p = map.getMapSize();

		if(map == tmap){
		x = p.x / 2;
		y = p.y / 2;
	}
	else{
		x2 = - p.x / 2;
		y2 = p.y / 2;
	}
}