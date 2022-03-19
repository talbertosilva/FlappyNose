var x, y, topY = [], iconY = [], collected = [];

let video;

let noseX = 0;
let noseY = 0;

let initialBirdX = 100;

let tunelX;
let iconX;

let pontos = [estg = 0, ese = 0, esa = 0, esce = 0, esdl = 0, ess = 0];

let inicio = true;
let conquista = false;
let niveis = false;
let nivel = 0;

let textoX = 640;
let textoY = 480 - 16;

let carregou = false;

function preload() {
	bird = loadImage("data/bird2.png");
	newFont = loadFont('fonts/robotCrush.ttf');
	begin = loadImage("data/WallpaperBegin.png");
	conquistasIMG = loadImage("data/WallpaperConquistas.png");
	niveisIMG = loadImage("data/WallpaperNiveis.png");
	end = loadImage("data/endGame.png");

	/* -- Badges das escolas -- */
	estgbadge = loadImage("data/estgbadge.png");
	estgbadgeBW = loadImage("data/estgbadgeBW.png");

	esabadge = loadImage("data/esabadge.png");
	esabadgeBW = loadImage("data/esabadgeBW.png");

	escebadge = loadImage("data/escebadge.png");
	escebadgeBW = loadImage("data/escebadgeBW.png");

	esdlbadge = loadImage("data/esdlbadge.png");
	esdlbadgeBW = loadImage("data/esdlbadgeBW.png");

	esebadge = loadImage("data/esebadge.png");
	esebadgeBW = loadImage("data/esebadgeBW.png");

	essbadge = loadImage("data/essbadge.png");
	essbadgeBW = loadImage("data/essbadgeBW.png");


	tunelTop = loadImage("data/Tunnel.png");
	tunelDown = loadImage("data/Tunnel2.png");
	logo = loadImage("data/logo.png");
	botao = loadImage("data/botao.png");
	conquistas = loadImage("data/conquistas.png");
	voltar = loadImage("data/voltar.png");
	icon = loadImage("data/smiley.png");
}

function setup() {
	createCanvas(640, 480);

	video = createCapture(VIDEO);
	video.hide();

	poseNet = ml5.poseNet(video, modelLoaded);

	poseNet.on('pose', getPoses);

	for (let i = 1; i < 12; i++) {
		topY[i] = random(-540, -440);
	}

	for (let i = 1; i < 12; i++) {
		iconY[i] = random(100, 350);

		collected[i] = true;
	}

	collectSound = loadSound('sound/collect.wav');
	hitSound = loadSound('sound/hit.wav');
	endSound = loadSound('sound/end.wav');
}

function getPoses(poses) {
	if (poses.length > 0) {
		let nY = poses[0].pose.keypoints[0].position.y;

		noseY = lerp(noseY, nY, 0.5);
	}
}

function modelLoaded() {
	carregou = true;
}

function draw() {
	if (inicio) {
		background('grey');

		tunelX = 320;
		iconX = 470;

		imageMode(CORNER);
		image(begin, 0, 0);
		imageMode(CENTER);
		image(botao, width / 2, 330);
		image(conquistas, width / 2, 365);

		textSize(16);
		fill(255);
		text("Trabalho realizado por: João Pires, Nelson Dias, Tiago Silva", textoX, textoY);
		textoX = textoX - 1.5;

		if (textoX + 480 < 0) {
			textoX = 640;
		}

		if ((mouseX >= width / 2 - 105 && mouseX <= width / 2 + 105 && mouseY >= 315 && mouseY <= 345) && inicio) {
			image(botao, width / 2, 330, 220, 35);
		}

		if ((mouseX >= width / 2 - 105 && mouseX <= width / 2 + 105 && mouseY >= 350 && mouseY <= 380) && inicio) {
			image(conquistas, width / 2, 365, 220, 35);
		}

	} else if (conquista == false && inicio == false) {
		if (niveis) {
			telaNiveis();
		} else {

			switch (nivel) {
				case 1:
					nivelESDL();
					break;
				case 2:
					nivelESS();
					break;
				case 3:
					nivelESE();
					break;
				case 4:
					nivelESCE();
					break;
				case 5:
					nivelESA();
					break;
				case 6:
					nivelESTG();
					break;
				default:
					break;
			}
		}
	} else if (conquista && inicio == false) {
		telaConquista();
	}
}

function testarColisão(i) {

	/* -- Testa colisão com o tunel de cima -- */
	if ((initialBirdX + 16) > (tunelX + (300 * i)) && (initialBirdX - 16) < (tunelX + (300 * i) + 71) && (noseY + 16) > (topY[i]) && (noseY - 16) < (topY[i] + 640)) {
		hitSound.play();
		inicio = true;
	}


	/* -- Testa colisão com o tunel de baixo -- */
	if ((initialBirdX + 16) > (tunelX + (300 * i)) && (initialBirdX - 16) < (tunelX + (300 * i) + 71) && (noseY + 16) > (topY[i] + 790) && (noseY - 16) < (topY[i] + 640 + 790)) {
		hitSound.play();
		inicio = true;
	}

	if ((initialBirdX + 16) > (iconX + (300 * i)) && (initialBirdX - 16) < (iconX + (300 * i) + 57) && (noseY + 16) > (iconY[i]) && (noseY - 16) < (iconY[i] + 40.6)) {
		if (collected[i]) {
			switch (nivel) {
				case 1:
					collectSound.play();
					pontos.esdl++;
					break;
				case 2:
					collectSound.play();
					pontos.ess++;
					break;
				case 3:
					collectSound.play();
					pontos.ese++;
					break;
				case 4:
					collectSound.play();
					pontos.esce++;
					break;
				case 5:
					collectSound.play();
					pontos.esa++;
					break;
				case 6:
					collectSound.play();
					pontos.estg++;
					break;
				default:
					break;
			}
		}

		collected[i] = false;
	}

}

function telaConquista() {
	background('grey');
	imageMode(CORNER);
	image(conquistasIMG, 0, 0);
	image(voltar, 20, 20);

	if ((mouseX >= 20 && mouseX <= 52 && mouseY >= 20 && mouseY <= 52) && conquista) {
		image(voltar, 20, 20, 36, 36);
	}

	switch (null || undefined) {
		case pontos.esdl:
			pontos.esdl = 0;
			break;
		case pontos.ess:
			pontos.ess = 0;
			break;
		case pontos.ese:
			pontos.ese = 0;
			break;
		case pontos.esce:
			pontos.esce = 0;
			break;
		case pontos.esa:
			pontos.esa = 0;
			break;
		case pontos.estg:
			pontos.estg = 0;
			break;
		default:
			break;
	}

	fill(255);
	textFont(newFont);
	textSize(24);

	if (pontos.esdl == 1) {
		image(esdlbadge, 130, 160, 91, 65)
		text(`${pontos.esdl} / 1`, 155, 255);
	} else {
		image(esdlbadgeBW, 130, 160, 91, 65)
		text(`${pontos.esdl} / 1`, 150, 255);
	}

	if (pontos.ess == 2) {
		image(essbadge, 270, 160, 91, 65)
		text(`${pontos.ess} / 2`, 295, 255);
	} else {
		image(essbadgeBW, 270, 160, 91, 65)
		text(`${pontos.ess} / 2`, 290, 255);
	}

	if (pontos.ese == 3) {
		image(esebadge, 415, 160, 91, 65)
		text(`${pontos.ese} / 3`, 435, 255);
	} else {
		image(esebadgeBW, 415, 160, 91, 65)
		text(`${pontos.ese} / 3`, 435, 255);
	}

	if (pontos.esce == 4) {
		image(escebadge, 130, 300, 91, 65)
		text(`${pontos.esce} / 4`, 155, 395);
	} else {
		image(escebadgeBW, 130, 300, 91, 65)
		text(`${pontos.esce} / 4`, 150, 395);
	}

	if (pontos.esa == 5) {
		image(esabadge, 270, 300, 91, 65)
		text(`${pontos.esa} / 5`, 295, 395);
	} else {
		image(esabadgeBW, 270, 300, 91, 65)
		text(`${pontos.esa} / 5`, 290, 395);
	}

	if (pontos.estg == 11) {
		image(estgbadge, 415, 300, 91, 65)
		text(`${pontos.estg} / 11`, 435, 395);
	} else {
		image(estgbadgeBW, 415, 300, 91, 65)
		text(`${pontos.estg} / 11`, 435, 395);
	}
}

function mouseClicked() {
	if ((mouseX >= width / 2 - 105 && mouseX <= width / 2 + 105 && mouseY >= 350 && mouseY <= 380) && inicio) {
		inicio = !inicio;
		conquista = !conquista;
	}

	if ((mouseX >= 20 && mouseX <= 52 && mouseY >= 20 && mouseY <= 52) && conquista) {
		inicio = !inicio;
		conquista = !conquista;
	}


	if (niveis) {

		/* Botão de voltar atrás */
		if ((mouseX >= 20 && mouseX <= 52 && mouseY >= 20 && mouseY <= 52)) {
			inicio = !inicio;
			niveis = !niveis;
		}


		/* Botões dos niveis */
		if ((mouseX >= 115 && mouseX <= 240 && mouseY >= 150 && mouseY <= 270)) {
			if (pontos.esdl != 1) {
				pontos.esdl = 0;
				niveis = false;
				nivel = 1;
			}
		} else if ((mouseX >= 257 && mouseX <= 380 && mouseY >= 150 && mouseY <= 270)) {
			if (pontos.ess != 2) {
				pontos.ess = 0;
				niveis = false;
				nivel = 2;
			}
		} else if ((mouseX >= 400 && mouseX <= 520 && mouseY >= 150 && mouseY <= 270)) {
			if (pontos.ese != 3) {
				pontos.ese = 0;
				niveis = false;
				nivel = 3;
			}
		} else if ((mouseX >= 115 && mouseX <= 240 && mouseY >= 290 && mouseY <= 410)) {
			if (pontos.esce != 4) {
				pontos.esce = 0;
				niveis = false;
				nivel = 4;
			}
		} else if ((mouseX >= 257 && mouseX <= 380 && mouseY >= 290 && mouseY <= 410)) {
			if (pontos.esa != 5) {
				pontos.esa = 0;
				niveis = false;
				nivel = 5;
			}
		} else if ((mouseX >= 400 && mouseX <= 520 && mouseY >= 290 && mouseY <= 410)) {
			if (pontos.estg != 11) {
				pontos.estg = 0;
				niveis = false;
				nivel = 6;
			}
		}
	}

	if ((mouseX >= width / 2 - 105 && mouseX <= width / 2 + 105 && mouseY >= 315 && mouseY <= 345) && inicio) {
		for (let i = 1; i < 24; i++) {
			iconY[i] = random(100, 350);

			collected[i] = true;
		}

		pontos.estg = 0;

		inicio = !inicio;
		niveis = !niveis;
	}
}

function telaNiveis() {
	background('grey');
	imageMode(CORNER);
	image(niveisIMG, 0, 0);
	image(voltar, 20, 20);

	if ((mouseX >= 20 && mouseX <= 52 && mouseY >= 20 && mouseY <= 52) && niveis) {
		image(voltar, 20, 20, 36, 36);
	}
}

function nivelESDL() {
	background('white');

	imageMode(CORNER);
	image(video, 0, 0);

	if (pontos.esdl == undefined) {
		pontos.esdl = 0;
	}

	tunelX = tunelX - 2.5;
	iconX = iconX - 2.5;

	const nivel = new Nivel(1, tunelX, topY, iconX, iconY, esdlbadge, pontos.esdl);

	nivel.show();
	nivel.passaro();
	nivel.extras();
}

function nivelESS() {
	background('white');

	imageMode(CORNER);
	image(video, 0, 0);

	if (pontos.ess == undefined) {
		pontos.ess = 0;
	}

	tunelX = tunelX - 2.5;
	iconX = iconX - 2.5;

	const nivel = new Nivel(2, tunelX, topY, iconX, iconY, essbadge, pontos.ess);

	nivel.show();
	nivel.passaro();
	nivel.extras();
}

function nivelESE() {
	background('white');

	imageMode(CORNER);
	image(video, 0, 0);

	if (pontos.ese == undefined) {
		pontos.ese = 0;
	}

	tunelX = tunelX - 2.5;
	iconX = iconX - 2.5;

	const nivel = new Nivel(3, tunelX, topY, iconX, iconY, esebadge, pontos.ese);

	nivel.show();
	nivel.passaro();
	nivel.extras();
}

function nivelESCE() {
	background('white');

	imageMode(CORNER);
	image(video, 0, 0);

	if (pontos.esce == undefined) {
		pontos.esce = 0;
	}

	tunelX = tunelX - 2.5;
	iconX = iconX - 2.5;

	const nivel = new Nivel(4, tunelX, topY, iconX, iconY, escebadge, pontos.esce);

	nivel.show();
	nivel.passaro();
	nivel.extras();
}

function nivelESA() {
	background('white');

	imageMode(CORNER);
	image(video, 0, 0);

	if (pontos.esa == undefined) {
		pontos.esa = 0;
	}

	tunelX = tunelX - 2.5;
	iconX = iconX - 2.5;

	const nivel = new Nivel(5, tunelX, topY, iconX, iconY, esabadge, pontos.esa);

	nivel.show();
	nivel.passaro();
	nivel.extras();
}

function nivelESTG() {
	background('white');

	imageMode(CORNER);
	image(video, 0, 0);

	if (pontos.estg == undefined) {
		pontos.estg = 0;
	}

	tunelX = tunelX - 2.5;
	iconX = iconX - 2.5;

	const nivel = new Nivel(11, tunelX, topY, iconX, iconY, estgbadge, pontos.estg);

	nivel.show();
	nivel.passaro();
	nivel.extras();
}