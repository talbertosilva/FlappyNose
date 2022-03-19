var x, y, topY = [], iconY = [], collected = [];

let video;

let noseY = 0;

let initialBirdX = 100;

/* Posição no eixo dos X dos tuneis e dos colectáveis */
let tunelX;
let iconX;

/* Pontos iniciais de cada nível */
let pontos = { estg: 0, ese: 0, esa: 0, esce: 0, esdl: 0, ess: 0 };

/* Tela do inicio, caso seja true esta será mostrada, caso contrário não irá aparecer no ecrã */
let inicio = true;

/* Tela das conquistas, caso seja true esta será mostrada, caso contrário não irá aparecer no ecrã */
let conquista = false;

/* Tela da escolha dos niveis, caso seja true esta será mostrada, caso contrário não irá aparecer no ecrã */
let niveis = false;

/* Nível, caso seja =1, aparecerá no ecrã o nível 1, caso seja =2, aparecerá o nível 2, e por ai adiante... */
let nivel = 0;

/* Posição inicial do texto no rodapé */
let textoX = 640;
let textoY = 480 - 18;

/* Variável para verificar se a webcam carregou */
let carregou = false;

/* Variável que define a velocidade do jogo */
let facil = 2.5, medio = 4, dificil = 6;
let dificuldade = facil;

/* Função para carregar os diversos assets */
function preload() {

	// -- Imagem do pássaro
	bird = loadImage("data/bird2.png");


	// -- Tipo de letra utilizada no jogo
	newFont = loadFont('fonts/robotCrush.ttf');


	// -- Imagens para os diversos ecrãs no decorrer do jogo
	begin = loadImage("data/WallpaperBegin.png");
	conquistasIMG = loadImage("data/WallpaperConquistas.png");
	niveisIMG = loadImage("data/WallpaperNiveis.png");

	// -- Dificuldade do jogo
	speedMax = loadImage("data/speedMax.png");
	speedMed = loadImage("data/speedMed.png");
	speedMin = loadImage("data/speedMin.png");
	speedMaxOn = loadImage("data/speedMaxOn.png");
	speedMedOn = loadImage("data/speedMedOn.png");
	speedMinOn = loadImage("data/speedMinOn.png");


	// -- Imagens para a barra de terminar o jogo e barra do jogo terminado
	end = loadImage("data/endGame.png");
	terminado = loadImage("data/Terminado2.png");


	// -- Simbolos de cada escola a cores e preto & branco
	// -- Uma alterativa seria aplicar um fitro preto & branco a cada imagem a cores
	// ESTG
	estgbadge = loadImage("data/estgbadge.png");
	estgbadgeBW = loadImage("data/estgbadgeBW.png");
	// ESA
	esabadge = loadImage("data/esabadge.png");
	esabadgeBW = loadImage("data/esabadgeBW.png");
	// ESCE
	escebadge = loadImage("data/escebadge.png");
	escebadgeBW = loadImage("data/escebadgeBW.png");
	// ESDL
	esdlbadge = loadImage("data/esdlbadge.png");
	esdlbadgeBW = loadImage("data/esdlbadgeBW.png");
	// ESE
	esebadge = loadImage("data/esebadge.png");
	esebadgeBW = loadImage("data/esebadgeBW.png");
	// ESS
	essbadge = loadImage("data/essbadge.png");
	essbadgeBW = loadImage("data/essbadgeBW.png");


	// -- Imagem dos túneis
	// -- Uma alternativa seria fazer rotação de cada imagem 
	tunelTop = loadImage("data/Tunnel.png");
	tunelDown = loadImage("data/Tunnel2.png");


	// -- Logotipo do jogo
	logo = loadImage("data/logo.png");


	// -- Botões
	botao = loadImage("data/botao.png");
	conquistas = loadImage("data/conquistas.png");
	voltar = loadImage("data/voltar.png");
	resetar = loadImage("data/resetar.png");
}

/* Função para preparação do ambiente do jogo */
function setup() {
	createCanvas(640, 480);

	video = createCapture(VIDEO);
	video.hide();

	poseNet = ml5.poseNet(video, modelLoaded);

	poseNet.on('pose', getPoses);

	collectSound = loadSound('sound/collect.wav');
	hitSound = loadSound('sound/hit.wav');
	endSound = loadSound('sound/end.wav');
}

function getPoses(poses) {
	if (poses.length > 0) {
		let nY = poses[0].pose.keypoints[0].position.y;

		noseY = lerp(noseY, nY, 0.7);
	}
}

function modelLoaded() {
	carregou = true;
}

function draw() {
	if (inicio) {
		background('grey');

		tunelX = 320;
		iconX = 480;

		imageMode(CORNER);
		image(begin, 0, 0);
		imageMode(CENTER);
		image(botao, width / 2, 330);
		image(conquistas, width / 2, 365);
		
		image(speedMin, width / 2 - 72, 400);
		image(speedMed, width / 2, 400);
		image(speedMax, width / 2 + 73, 400);

		switch (dificuldade) {
			case facil:
				image(speedMinOn, width / 2 - 72, 400);
				break;
			case medio:
				image(speedMedOn, width / 2, 400);
				break;
			case dificil:
				image(speedMaxOn, width / 2 + 73, 400);
				break;
			default:
				break;
		}

		textSize(16);
		fill(48, 64, 43);
		textFont(newFont);
		text("Trabalho realizado por:		João Pires		Nelson Dias		Tiago Silva", textoX, textoY);
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

		if ((mouseX >= 215 && mouseX <= 280 && mouseY >= 385 && mouseY <= 415) && inicio) {
			if (dificuldade == facil) {
				image(speedMinOn, width / 2 - 72, 400, 70, 35);
			} else {
				image(speedMin, width / 2 - 72, 400, 70, 35);
			}
		}
		if ((mouseX >= 285 && mouseX <= 350 && mouseY >= 385 && mouseY <= 415) && inicio) {
			if (dificuldade == medio) {
				image(speedMedOn, width / 2, 400, 70, 35);
			} else {
				image(speedMed, width / 2, 400, 70, 35);
			}
		}
		if ((mouseX >= 360 && mouseX <= 425 && mouseY >= 385 && mouseY <= 415) && inicio) {
			if (dificuldade == dificil) {
				image(speedMaxOn, width / 2 + 73, 400, 70, 35);
			} else {
				image(speedMax, width / 2 + 73, 400, 70, 35);
			}
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
	image(resetar, width - 52, 20);

	if ((mouseX >= 20 && mouseX <= 52 && mouseY >= 20 && mouseY <= 52) && conquista) {
		image(voltar, 20, 20, 36, 36);
	}

	if ((mouseX >= (width - 52) && mouseX <= (width - 20) && mouseY >= 20 && mouseY <= 52) && conquista) {
		image(resetar, width - 52, 20, 36, 36);
	}

	textAlign(CENTER);
	textFont(newFont);
	textSize(24);

	if (pontos.esdl == 1) {
		image(esdlbadge, 130, 160, 91, 65)
		fill(126, 226, 116);
		text(`${pontos.esdl} / 1`, 175, 255);
	} else {
		image(esdlbadgeBW, 130, 160, 91, 65)
		fill(132);
		text(`${pontos.esdl} / 1`, 175, 255);
	}

	if (pontos.ess == 2) {
		image(essbadge,  width/2-45.5, 160, 91, 65)
		fill(126, 226, 116);
		text(`${pontos.ess} / 2`, width/2, 255);
	} else {
		image(essbadgeBW,  width/2-45.5, 160, 91, 65)
		fill(132);
		text(`${pontos.ess} / 2`, width/2, 255);
	}

	if (pontos.ese == 3) {
		image(esebadge, 415, 160, 91, 65)
		fill(126, 226, 116);
		text(`${pontos.ese} / 3`, 460, 255);
	} else {
		image(esebadgeBW, 415, 160, 91, 65)
		fill(132);
		text(`${pontos.ese} / 3`, 460, 255);
	}

	if (pontos.esce == 4) {
		image(escebadge, 130, 300, 91, 65)
		fill(126, 226, 116);
		text(`${pontos.esce} / 4`, 175, 395);
	} else {
		image(escebadgeBW, 130, 300, 91, 65)
		fill(132);
		text(`${pontos.esce} / 4`, 175, 395);
	}

	if (pontos.esa == 5) {
		image(esabadge, width/2-45.5, 300, 91, 65)
		fill(126, 226, 116);
		text(`${pontos.esa} / 5`, width/2, 395);
	} else {
		image(esabadgeBW, width/2-45.5, 300, 91, 65)
		fill(132);
		text(`${pontos.esa} / 5`, width/2, 395);
	}

	if (pontos.estg == 11) {
		image(estgbadge, 415, 300, 91, 65)
		fill(126, 226, 116);
		text(`${pontos.estg} / 11`, 460, 395);
	} else {
		image(estgbadgeBW, 415, 300, 91, 65)
		fill(132);
		text(`${pontos.estg} / 11`, 460, 395);
	}

	textSize(20);
	fill(55, 59, 54);
	textFont(newFont)
	textAlign(LEFT);
	text("progresso dos niveis", 116, 135);
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
	if ((mouseX >= (width - 52) && mouseX <= (width - 20) && mouseY >= 20 && mouseY <= 52) && conquista) {
		pontos.esa = 0;
		pontos.estg = 0;
		pontos.esce = 0;
		pontos.esdl = 0;
		pontos.ese = 0;
		pontos.ess = 0;
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
		/* 	Como não haverá mais do que 12 tuneis / simbolos,
		é feito um random para 12 posições possíveis,
		e apenas apresentado as necessárias,
		por exemplo num nível de 5 tuneis, será apenas utilizado 5 randoms */
		for (let i = 1; i < 12; i++) {
			topY[i] = random(-540, -440);
		}
		for (let i = 1; i < 12; i++) {
			iconY[i] = random(100, 350);

			collected[i] = true;
		}

		inicio = !inicio;
		niveis = !niveis;
	}

	if ((mouseX >= 215 && mouseX <= 280 && mouseY >= 385 && mouseY <= 415) && inicio) {
		dificuldade = facil;
	}
	if ((mouseX >= 285 && mouseX <= 350 && mouseY >= 385 && mouseY <= 415) && inicio) {
		dificuldade = medio;
	}
	if ((mouseX >= 360 && mouseX <= 425 && mouseY >= 385 && mouseY <= 415) && inicio) {
		dificuldade = dificil;

	}
}

function telaNiveis() {
	background('grey');
	imageMode(CORNER);
	image(niveisIMG, 0, 0);
	image(voltar, 20, 20);

	if (pontos.esdl == 1) {
		image(terminado, 118, 150)
	}
	if (pontos.ess == 2) {
		image(terminado, 260, 150)
	}
	if (pontos.ese == 3) {
		image(terminado, 401, 150)
	}
	if (pontos.esce == 4) {
		image(terminado, 118, 292)
	}
	if (pontos.esa == 5) {
		image(terminado, 260, 292)
	}
	if (pontos.estg == 11) {
		image(terminado, 401, 292)
	}

	if ((mouseX >= 20 && mouseX <= 52 && mouseY >= 20 && mouseY <= 52) && niveis) {
		image(voltar, 20, 20, 36, 36);
	}
	
	textSize(20);
	fill(55, 59, 54);
	textFont(newFont)
	text("escolha o nivel", 116, 135);
}

function nivelESDL() {
	background('white');

	imageMode(CORNER);
	image(video, 0, 0);

	tunelX = tunelX - 1 * dificuldade;
	iconX = iconX - 1 * dificuldade;

	const nivel = new Nivel(1, tunelX, topY, iconX, iconY, esdlbadge, pontos.esdl);

	nivel.show();
	nivel.passaro();
	nivel.extras();
}

function nivelESS() {
	background('white');

	imageMode(CORNER);
	image(video, 0, 0);

	tunelX = tunelX - 1 * dificuldade;
	iconX = iconX - 1 * dificuldade;

	const nivel = new Nivel(2, tunelX, topY, iconX, iconY, essbadge, pontos.ess);

	nivel.show();
	nivel.passaro();
	nivel.extras();
}

function nivelESE() {
	background('white');

	imageMode(CORNER);
	image(video, 0, 0);

	tunelX = tunelX - 1 * dificuldade;
	iconX = iconX - 1 * dificuldade;

	const nivel = new Nivel(3, tunelX, topY, iconX, iconY, esebadge, pontos.ese);

	nivel.show();
	nivel.passaro();
	nivel.extras();
}

function nivelESCE() {
	background('white');

	imageMode(CORNER);
	image(video, 0, 0);

	tunelX = tunelX - 1 * dificuldade;
	iconX = iconX - 1 * dificuldade;

	const nivel = new Nivel(4, tunelX, topY, iconX, iconY, escebadge, pontos.esce);

	nivel.show();
	nivel.passaro();
	nivel.extras();
}

function nivelESA() {
	background('white');

	imageMode(CORNER);
	image(video, 0, 0);

	tunelX = tunelX - 1 * dificuldade;
	iconX = iconX - 1 * dificuldade;

	const nivel = new Nivel(5, tunelX, topY, iconX, iconY, esabadge, pontos.esa);

	nivel.show();
	nivel.passaro();
	nivel.extras();
}

function nivelESTG() {
	background('white');

	imageMode(CORNER);
	image(video, 0, 0);

	tunelX = tunelX - 1 * dificuldade;
	iconX = iconX - 1 * dificuldade;

	const nivel = new Nivel(11, tunelX, topY, iconX, iconY, estgbadge, pontos.estg);

	nivel.show();
	nivel.passaro();
	nivel.extras();
}