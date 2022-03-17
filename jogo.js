// Using an Object Layer to limit movement and changing Map Tiles.
var tmap, smiley, plantsIndex;
var x, y;

let video;

let noseX = 0;
let noseY = 0;

let smileyX = 620 / 2;

let morto = true;

let colected1 = false, colected2 = false, colected3 = false, colected4 = false, colected5 = false;
let cursosESTG = 0;


function preload() {
	tmap = loadTiledMap("mapaNivelUm", "data");
	bird = loadImage("data/bird2.png");
	newFont = loadFont('fonts/dimitri.ttf');
	begin = loadImage("data/WallpaperBegin.png");
	badge = loadImage("data/badgeteste1.png");
}

function setup() {
	createCanvas(620, 460);
	initializeMap();
	fill(255);

	video = createCapture(VIDEO);
	video.hide();

	plantsIndex = [3];

	poseNet = ml5.poseNet(video);

	poseNet.on('pose', getPoses);
}

function getPoses(poses) {
	//console.log(poses);
	if (poses.length > 0) {
		let nX = poses[0].pose.keypoints[0].position.x;
		let nY = poses[0].pose.keypoints[0].position.y;

		if (cursosESTG < 10) {
			noseX = noseX + 0.75;
		} else {
			noseX = 0;
			noseY = 0;
		}
		noseY = lerp(noseY, nY, 0.75);
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
	if (morto) {
		imageMode(CORNER);
		image(begin, 0, 0, 620, 460);
	} else {
		background(tmap.getBackgroundColor());

		imageMode(CORNER);
		image(video, 0, 0);

		tmap.draw(x, (tmap.getMapSize().y / 2));


		imageMode(CENTER);
		image(bird, smileyX, noseY, 32, 32);

		textFont(newFont);
		textSize(48);
		fill(255);
		text(`${cursosESTG}`, width / 2 - 24, 72);

		x = noseX / 2;
		y = (noseY * 56 / 640);

		if (plantsIndex.indexOf(tmap.getTileIndex(0, round(x), round(y-4.5))) >= 0) {
			tmap.setTileIndex(0, round(x), round(y-4.5), 0);
			cursosESTG = cursosESTG + 1;
		}

		if (tmap.getTileIndex(0, round(x), round(y-4.5)) !== 0) {
			noseX = 0;
			noseY = 0;
			morto = true;
		}
	}
}

function mouseClicked(){
	if(morto = true && noseX !== 0){
		morto = !morto;
	}
}

function initializeMap() {
	tmap.setPositionMode("MAP");
	tmap.setDrawMode(CENTER);
	var p = tmap.getMapSize();
	x = p.x / 2;
	y = p.y / 2;
}