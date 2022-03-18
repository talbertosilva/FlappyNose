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
let nivelUm = false;
let nivelDois = false;
let nivelTres = false;
let nivelQuatro = false;
let nivelCinco = false;
let nivelSeis = false;

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

	poseNet = ml5.poseNet(video);

	poseNet.on('pose', getPoses);

	for (let i = 1; i < 12; i++) {
		topY[i] = random(-540, -440);
	}

	for (let i = 1; i < 12; i++) {
		iconY[i] = random(100, 350);

		collected[i] = true;
	}
}

function getPoses(poses) {
	if (poses.length > 0) {
		let nY = poses[0].pose.keypoints[0].position.y;

		noseY = lerp(noseY, nY, 0.5);
	}
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

		if ((mouseX >= width / 2 - 105 && mouseX <= width / 2 + 105 && mouseY >= 315 && mouseY <= 345) && inicio) {
			image(botao, width / 2, 330, 220, 35);
		}

		if ((mouseX >= width / 2 - 105 && mouseX <= width / 2 + 105 && mouseY >= 350 && mouseY <= 380) && inicio) {
			image(conquistas, width / 2, 365, 220, 35);
		}

	} else if (conquista == false && inicio == false) {
		if (niveis) {
			telaNiveis();
			console.log("Tela de escolha de niveis, iniciada com sucesso.");
		} else if (nivelUm) {
			nivelESDL();
			console.log("Nivel ESDL, iniciado com sucesso.");
		} else if (nivelDois) {
			nivelESS();
			console.log("Nivel ESS, iniciado com sucesso.");
		} else if (nivelTres) {
			nivelESE();
			console.log("Nivel ESE, iniciado com sucesso.");
		} else if (nivelQuatro) {
			nivelESCE();
			console.log("Nivel ESCE, iniciado com sucesso.");
		} else if (nivelCinco) {
			nivelESA();
			console.log(nivelCinco);
			console.log("Nivel ESA, iniciado com sucesso.");
		} else if (nivelSeis) {
			nivelESTG();
			console.log("Nivel ESTG, iniciado com sucesso.");
		} else {
			telaNiveis();
		}
	} else if (conquista && inicio == false) {
		telaConquista();
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
			niveis = false;
			nivelUm = true;
		} else if ((mouseX >= 257 && mouseX <= 380 && mouseY >= 150 && mouseY <= 270)) {
			niveis = false;
			nivelDois = true;
		} else if ((mouseX >= 400 && mouseX <= 520 && mouseY >= 150 && mouseY <= 270)) {
			niveis = false;
			nivelTres = true;
		} else if ((mouseX >= 115 && mouseX <= 240 && mouseY >= 290 && mouseY <= 410)) {
			niveis = false;
			nivelQuatro = true;
		} else if ((mouseX >= 257 && mouseX <= 380 && mouseY >= 290 && mouseY <= 410)) {
			niveis = false;
			nivelCinco = true;
		} else if ((mouseX >= 400 && mouseX <= 520 && mouseY >= 290 && mouseY <= 410)) {
			niveis = false;
			nivelSeis = true;
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

function testarColisão(i) {

	/* -- Testa colisão com o tunel de cima -- */
	if ((initialBirdX + 16) > (tunelX + (300 * i)) && (initialBirdX - 16) < (tunelX + (300 * i) + 71) && (noseY + 16) > (topY[i]) && (noseY - 16) < (topY[i] + 640)) {
		inicio = true;
	}


	/* -- Testa colisão com o tunel de baixo -- */
	if ((initialBirdX + 16) > (tunelX + (300 * i)) && (initialBirdX - 16) < (tunelX + (300 * i) + 71) && (noseY + 16) > (topY[i] + 790) && (noseY - 16) < (topY[i] + 640 + 790)) {
		inicio = true;
	}

	if ((initialBirdX + 16) > (iconX + (300 * i)) && (initialBirdX - 16) < (iconX + (300 * i) + 32) && (noseY + 16) > (iconY[i]) && (noseY - 16) < (iconY[i] + 32)) {
		if (collected[i]) {
			if (nivelUm) {
				pontos.esdl++;
			}
			if (nivelDois) {
				pontos.ess++;
			}
			if (nivelTres) {
				pontos.ese++;
			}
			if (nivelQuatro) {
				pontos.esce++;
			}
			if (nivelCinco) {
				pontos.esa++;
			}
			if (nivelSeis) {
				pontos.estg++;
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

	if (pontos.esdl == null) {
		pontos.esdl = 0;
	}
	if (pontos.ess == null) {
		pontos.ess = 0;
	}
	if (pontos.ese == null) {
		pontos.ese = 0;
	}
	if (pontos.esce == null) {
		pontos.esce = 0;
	}
	if (pontos.esa == null) {
		pontos.esa = 0;
	}
	if (pontos.estg == null) {
		pontos.estg = 0;
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
	background('grey');

	imageMode(CORNER);
	image(video, 0, 0);

	if (pontos.esdl == null) {
		pontos.esdl = 0;
	}

	if (inicio == false && nivelUm) {

		/* -- Loop do número de tuneis a mostrar -- */
		for (let i = 1; i < 2; i++) {

			/* -- Mostra cada tunel (cima e baixo) -- */
			image(tunelTop, tunelX + (300 * i), topY[i]);
			image(tunelDown, tunelX + (300 * i), (topY[i] + 790));
			if (i == 1) {
				image(end, tunelX + 300 + 300 * i, 0, 108, 480);
			}
			if ((initialBirdX + 16) > (tunelX + (300 * 2 * i)) && (initialBirdX - 16) < (tunelX + (300 * 2 * i) + 108) && (noseY + 16) > 0 && (noseY - 16) < 480) {
				nivelUm = false;
				inicio = true;
			}

			if (collected[i]) {
				image(esdlbadge, iconX + (300 * i), (iconY[i]), 32, 32);
			}

			/* -- Invoca a função das colisões, com o devido i -- */
			testarColisão(i);

		}

		tunelX = tunelX - 2.5;
		iconX = iconX - 2.5;

	}

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
	text(`${pontos.esdl}`, width / 2 - 8, 65);
}

function nivelESS() {
	background('grey');

	imageMode(CORNER);
	image(video, 0, 0);

	if (pontos.ess == null) {
		pontos.ess = 0;
	}

	if (inicio == false && nivelDois) {

		/* -- Loop do número de tuneis a mostrar -- */
		for (let i = 1; i < 3; i++) {

			/* -- Mostra cada tunel (cima e baixo) -- */
			image(tunelTop, tunelX + (300 * i), topY[i]);
			image(tunelDown, tunelX + (300 * i), (topY[i] + 790));
			if (i == 2) {
				image(end, tunelX + 300 + 300 * i, 0, 108, 480);

				if ((initialBirdX + 16) > (tunelX + + 300 + 300 * i) && (initialBirdX - 16) < (tunelX + 300 + 300 * i + 108) && (noseY + 16) > 0 && (noseY - 16) < 480) {
					nivelDois = false;
					inicio = true;
				}
			}

			if (collected[i]) {
				image(essbadge, iconX + (300 * i), (iconY[i]), 32, 32);
			}

			/* -- Invoca a função das colisões, com o devido i -- */
			testarColisão(i);

		}

		tunelX = tunelX - 2.5;
		iconX = iconX - 2.5;

	}

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
	text(`${pontos.ess}`, width / 2 - 8, 65);
}

function nivelESE() {
	background('grey');

	imageMode(CORNER);
	image(video, 0, 0);

	if (pontos.ese == null) {
		pontos.ese = 0;
	}

	if (inicio == false && nivelTres) {

		/* -- Loop do número de tuneis a mostrar -- */
		for (let i = 1; i < 4; i++) {

			/* -- Mostra cada tunel (cima e baixo) -- */
			image(tunelTop, tunelX + (300 * i), topY[i]);
			image(tunelDown, tunelX + (300 * i), (topY[i] + 790));
			if (i == 3) {
				image(end, tunelX + 300 + 300 * i, 0, 108, 480);

				if ((initialBirdX + 16) > (tunelX + + 300 + 300 * i) && (initialBirdX - 16) < (tunelX + 300 + 300 * i + 108) && (noseY + 16) > 0 && (noseY - 16) < 480) {
					nivelTres = false;
					inicio = true;
				}
			}

			if (collected[i]) {
				image(esebadge, iconX + (300 * i), (iconY[i]), 32, 32);
			}

			/* -- Invoca a função das colisões, com o devido i -- */
			testarColisão(i);

		}

		tunelX = tunelX - 2.5;
		iconX = iconX - 2.5;

	}

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
	text(`${pontos.ese}`, width / 2 - 8, 65);
}

function nivelESCE() {
	background('grey');

	imageMode(CORNER);
	image(video, 0, 0);

	if (pontos.esce == null) {
		pontos.esce = 0;
	}

	if (inicio == false) {

		/* -- Loop do número de tuneis a mostrar -- */
		for (let i = 1; i < 5; i++) {

			/* -- Mostra cada tunel (cima e baixo) -- */
			image(tunelTop, tunelX + (300 * i), topY[i]);
			image(tunelDown, tunelX + (300 * i), (topY[i] + 790));
			if (i == 4) {
				image(end, tunelX + 300 + 300 * i, 0, 108, 480);

				if ((initialBirdX + 16) > (tunelX + + 300 + (300 * i)) && (initialBirdX - 16) < (tunelX + 300 + 300 * i + 108) && (noseY + 16) > 0 && (noseY - 16) < 480) {
					nivelQuatro = false;
					inicio = true;
				}
			}

			if (collected[i]) {
				image(escebadge, iconX + (300 * i), (iconY[i]), 32, 32);
			}

			/* -- Invoca a função das colisões, com o devido i -- */
			testarColisão(i);

		}

		tunelX = tunelX - 2.5;
		iconX = iconX - 2.5;

	}

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
	text(`${pontos.esce}`, width / 2 - 8, 65);
}

function nivelESA() {
	background('grey');

	imageMode(CORNER);
	image(video, 0, 0);

	if (pontos.esa == null) {
		pontos.esa = 0;
	}

	if (inicio == false) {

		/* -- Loop do número de tuneis a mostrar -- */
		for (let i = 1; i < 6; i++) {

			/* -- Mostra cada tunel (cima e baixo) -- */
			image(tunelTop, tunelX + (300 * i), topY[i]);
			image(tunelDown, tunelX + (300 * i), (topY[i] + 790));


			if (i == 5) {
				image(end, tunelX + 300 + 300 * i, 0, 108, 480);

				if ((initialBirdX + 16) > (tunelX + + 300 + 300 * i) && (initialBirdX - 16) < (tunelX + 300 + 300 * i + 108) && (noseY + 16) > 0 && (noseY - 16) < 480) {
					nivelCinco = false;
					inicio = true;
				}
			}

			if (collected[i]) {
				image(esabadge, iconX + (300 * i), (iconY[i]), 32, 32);
			}

			/* -- Invoca a função das colisões, com o devido i -- */
			testarColisão(i);

		}

		tunelX = tunelX - 2.5;
		iconX = iconX - 2.5;

	}

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
	text(`${pontos.esa}`, width / 2 - 8, 65);
}

function nivelESTG() {
	background('grey');

	imageMode(CORNER);
	image(video, 0, 0);

	if (pontos.estg == null) {
		pontos.estg = 0;
	}

	if (inicio == false) {

		/* -- Loop do número de tuneis a mostrar -- */
		for (let i = 1; i < 12; i++) {

			/* -- Mostra cada tunel (cima e baixo) -- */
			image(tunelTop, tunelX + (300 * i), topY[i]);
			image(tunelDown, tunelX + (300 * i), (topY[i] + 790));


			if (i == 11) {
				image(end, tunelX + 300 + 300 * i, 0, 108, 480);

				if ((initialBirdX + 16) > (tunelX + + 300 + 300 * i) && (initialBirdX - 16) < (tunelX + 300 + 300 * i + 108) && (noseY + 16) > 0 && (noseY - 16) < 480) {
					nivelCinco = false;
					inicio = true;
				}
			}

			if (collected[i]) {
				image(estgbadge, iconX + (300 * i), (iconY[i]), 32, 32);
			}

			/* -- Invoca a função das colisões, com o devido i -- */
			testarColisão(i);

		}

		tunelX = tunelX - 2.5;
		iconX = iconX - 2.5;

	}

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
	text(`${pontos.estg}`, width / 2 - 8, 65);
}