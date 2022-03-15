// Using an Object Layer to limit movement and changing Map Tiles.
var tmap, smiley, plantsIndex, viewWalls = false;
var x, y, prevx, prevy, imageX = 100;

let video;
let poseNet;
let noseX = 0;
let noseY = 0;
let prevnoseX;
let prevnoseY;

function preload() {
	tmap = loadTiledMap("mapaNivelUm", "data");
	smiley = loadImage("data/smiley.png");
}

function setup() {
	createCanvas(640, 480);
	walls = createGraphics(640, 480);
	initializeMap();
	plantsIndex = [7];
	fill(255);

	video = createCapture(VIDEO);
	video.size(640, 480);
	video.hide();

	poseNet = ml5.poseNet(video);

	poseNet.on('pose', getPoses);
}


function getPoses(poses) {
	//console.log(poses);
	if (poses.length > 0) {
		let nX = poses[0].pose.keypoints[0].position.x;
		let nY = poses[0].pose.keypoints[0].position.y;

		noseX = lerp(noseX, nX, 0.5);
		noseY = lerp(noseY, nY, 0.5);
	}
}

function draw() {
	background(tmap.getBackgroundColor());

	image(video, width / 2, height / 2);

	tmap.draw(x, y);// Walls layer is invisible...
	if (viewWalls) {
		imageMode(CORNER);
		image(walls, 0, 0);
	}
	imageMode(CENTER);

	image(smiley, noseX, noseY);

	textSize(16);
	fill(0);
	text("Center: Map coordinates: " + round(noseX * 100) / 100 + ", " + round(noseY * 100) / 100, 10, 10);
	text("Over Color: " + color(walls.get(walls.width / 2, walls.height / 2)), 10, 30);
	text("Over Tile Index: " + tmap.getTileIndex(0, round(noseX*40/640), round(noseY*40/640)), 10, 50);

	
	if (plantsIndex.indexOf(tmap.getTileIndex(0, round(noseX*40/640), round(noseY*40/640))) >= 0) {
		tmap.setTileIndex(0, round(noseX*40/640), round(noseY*40/640), 0);
	}

	prevnoseX = noseX;
	prevnoseY = noseY;
	walls.clear();
	tmap.drawLayer(1, x, y, walls);
	// ...So we draw it on a separate canvas (and only when we need it).
	//Comparing 2 colors won't work. We compare Color Strings.
	if (color(walls.get(walls.width / 2, walls.height / 2)).toString() == tmap.getObjectsColor(1).toString()) {
		noseX = prevx;
		noseY = prevy;
	}
}

function keyPressed(){
	if(key == 'l' || key == 'L') viewWalls = !viewWalls;
  }
  

function initializeMap() {
	tmap.setPositionMode("MAP");
	tmap.setDrawMode(CENTER);
	var p = tmap.getMapSize();
	console.log(tmap.getMapSize());
	x = p.x / 2;
	y = p.y / 2;
	console.log(tmap.getTileIndex(0, 39, 29));
}
