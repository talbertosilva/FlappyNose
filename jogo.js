// Using an Object Layer to limit movement and changing Map Tiles.
var tmap, smiley, plantsIndex, viewWalls = false;
var x, y;

let video;
let poseNet;
let noseX = 50;
let noseY = 0;
let prevnoseX;
let prevnoseY;

function preload() {
	tmap = loadTiledMap("mapaNivelUm", "data");
	smiley = loadImage("data/smiley.png");
}

function setup() {
	createCanvas(640, 480);
	frameRate(30);
	walls = createGraphics(640, 480);
	initializeMap();
	plantsIndex = [35];
	fill(255);
	video = createCapture(VIDEO);
	video.size(640, 480);
	video.hide();

	poseNet = ml5.poseNet(video);

	poseNet.on('pose', getPoses);

	smooth();
}


function getPoses(poses) {
	//console.log(poses);
	if (poses.length > 0) {
		let nY = poses[0].pose.keypoints[0].position.y;

        noseY = lerp(noseY, nY, 0.5);

		noseX = noseX + 4;
	}
}

function draw() {
	background(tmap.getBackgroundColor());

	image(video, width / 2, height / 2);

	tmap.draw(x-0.5, y-0.5);
	if (viewWalls) {
		imageMode(CORNER);
		image(walls, 0, 0);
	}


	/* -- TEXTO COM INFORMAÇÕES (coordenadas do nariz, cor detetada nessa coordenada, id da textura nessa coordenada) -- */

	// textSize(16);
	// fill(255);
	// text("Center: Map coordinates: " + round((noseX*40/640) * 100) / 100 + ", " + round((noseY*40/640) * 100) / 100, 10, 10);
	// text("Over Color: " + color(walls.get(walls.width, walls.height)), 10, 30);
	// text("Over Tile Index: " + tmap.getTileIndex(0, round(noseX*40/640), round(noseY*40/640)), 10, 50);

	/* -- CÓDIGO PARA OS COLÉTAVEIS -- */

	if (plantsIndex.indexOf(tmap.getTileIndex(0, (round(noseX*40/640)), round(noseY*40/640))) >= 0) {
	 	tmap.setTileIndex(0, round(noseX*40/640), round(noseY*40/640), 0);
	}
	
	walls.clear();
	tmap.drawLayer(1, x, y, walls);

	/* -- COLISÃO > caso esteja em cima dos objetos, o X/Y serão iguais aos X/Y antes da colisão --*/
	if (tmap.getTileIndex(0, round(noseX*40/640), round(noseY*40/640)) !== 0) {
		noseX = 50;
		noseY = prevnoseY;
	} else {
		imageMode(CENTER);
		image(smiley, noseX, noseY);
		prevnoseY = noseY;
	}
}


/* -- TECLA L PARA VER OS OBJETOS INVISIVEIS DA COLISÃO -- */
function keyPressed(){
	if(key == 'l' || key == 'L') viewWalls = !viewWalls;
  }
  
/* -- INICIA O MAPA COM O DEVIDO TAMANHO EM TILES (40 x 30), 40 * 16 = 640 = tamanho da camera -- */
function initializeMap() {
	tmap.setPositionMode("MAP");
	tmap.setDrawMode(CENTER);
	var p = tmap.getMapSize();
	x = p.x / 2;
	y = p.y / 2;
}
