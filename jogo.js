var x, y, topY = [], iconY = [], collected = [];

let video;

let noseY = 0;

let initialBirdX = 100;

/* Posição no eixo dos X dos tuneis e dos colectáveis */
let tunelX;
let iconX;

let crashou = false;

/* Pontos iniciais de cada nível */
let pontos = { estg: 0, ese: 0, esa: 0, esce: 0, esdl: 0, ess: 0};
let recorde = 0;
let recordeRanking = [0, 0, 0];
let recordeRanking3 = [0, 0, 0];
let pontosTotal = 0;
let skinsUnlocked = 0;

/* Tela do inicio, caso seja true esta será mostrada, caso contrário não irá aparecer no ecrã */
let inicio = true;

/* Tela das conquistas, caso seja true esta será mostrada, caso contrário não irá aparecer no ecrã */
let conquista = false;

/* Tela da escolha dos niveis, caso seja true esta será mostrada, caso contrário não irá aparecer no ecrã */
let niveis = false;

/* Tela da escolha dos niveis, caso seja true esta será mostrada, caso contrário não irá aparecer no ecrã */
let screenRecorde = false;

/* Nível, caso seja =1, aparecerá no ecrã o nível 1, caso seja =2, aparecerá o nível 2, e por ai adiante... */
let nivel = 0;

/* Posição inicial do texto no rodapé */
let textoX = 640;
let textoY = 480 - 18;

/* Variável para verificar se a webcam carregou */
let carregou = false;
let meio = false;

/* Variável que define a velocidade do jogo */
let facil = 2.5, medio = 4, dificil = 6;
let dificuldade = facil;
let dificuldadeRecorde = 2.5;
let passaroCor = "vermelho";

let tamanhoLoading = 0;

let terminarRecorde = false;
let novaSkin = false;
let passouNivel = false;

/* Função para preparação do ambiente do jogo */
function setup() {
	createCanvas(640, 480);

	preload();

	video = createCapture(VIDEO);
	video.hide();

	poseNet = ml5.poseNet(video, modelLoaded);

	poseNet.on('pose', getPoses);

	collectSound = loadSound('sound/collect.wav');
	hitSound = loadSound('sound/hit.wav');
	endSound = loadSound('sound/end.wav');
}

function getPoses(poses) {
	if (poses.length > 0 && crashou == false) {
		let nY = poses[0].pose.keypoints[0].position.y;

		noseY = lerp(noseY, nY, 0.7);
	}
}

function modelLoaded() {
	meio = true;
	setTimeout(function () {
		carregou = true;
	}, 1000);
}

function draw() {
	pontosTotal = pontos.estg + pontos.ese + pontos.esa + pontos.esce + pontos.esdl + pontos.ess;



	if (carregou == false) {
		image(loading, 0, 0);
		fill(255);
		noStroke();
		rect(112, 345, tamanhoLoading, 24.5);
		if (tamanhoLoading < 364) {
			tamanhoLoading = tamanhoLoading + 6;
		}
		if (meio == true) {
			tamanhoLoading = 412;
		}
	} if (carregou == true) {

		if (inicio) {
			background('grey');

			tunelX = 320;
			iconX = 480;

			imageMode(CORNER);
			image(begin, 0, 0);
			imageMode(CENTER);
			image(botao, width / 2, 300);
			image(conquistas, width / 2, 335);

			image(speedMin, width / 2 - 72, 405);
			image(speedMed, width / 2, 405);
			image(speedMax, width / 2 + 73, 405);

			image(botaoVermelho, width / 2 - 72, 370);
			image(botaoAmareloLock, width / 2, 370);
			image(botaoAzulLock, width / 2 + 73, 370);

			switch (dificuldade) {
				case facil:
					image(speedMinOn, width / 2 - 72, 405);
					break;
				case medio:
					image(speedMedOn, width / 2, 405);
					break;
				case dificil:
					image(speedMaxOn, width / 2 + 73, 405);
					break;
				default:
					break;
			}

			if (pontosTotal >= 4) {
				image(botaoAmarelo, width / 2, 370);
			}
			if (pontosTotal >= 15) {
				image(botaoAzul, width / 2 + 73, 370);
			}

			switch (passaroCor) {
				case "vermelho":
					image(botaoVermelhoOn, width / 2 - 72, 370);
					break;
				case "amarelo":
					image(botaoAmareloOn, width / 2, 370);
					break;
				case "azul":
					image(botaoAzulOn, width / 2 + 73, 370);
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

			if ((mouseX >= width / 2 - 105 && mouseX <= width / 2 + 105 && mouseY >= 285 && mouseY <= 315) && inicio) {
				image(botaoOn, width / 2, 300, 220, 35);
			}

			if ((mouseX >= width / 2 - 105 && mouseX <= width / 2 + 105 && mouseY >= 320 && mouseY <= 350) && inicio) {
				image(conquistasOn, width / 2, 335, 220, 35);
			}

			if ((mouseY >= 390 && mouseY <= 420) && inicio) {
				if (mouseX >= 215 && mouseX <= 280) {
					if (dificuldade == facil) {
						image(speedMinOn, width / 2 - 72, 405, 70, 35);
					} else {
						image(speedMin, width / 2 - 72, 405, 70, 35);
					}
				} else if (mouseX >= 285 && mouseX <= 350) {
					if (dificuldade == medio) {
						image(speedMedOn, width / 2, 405, 70, 35);
					} else {
						image(speedMed, width / 2, 405, 70, 35);
					}
				} else if (mouseX >= 360 && mouseX <= 425) {
					if (dificuldade == dificil) {
						image(speedMaxOn, width / 2 + 73, 405, 70, 35);
					} else {
						image(speedMax, width / 2 + 73, 405, 70, 35);
					}
				}
			}

			if ((mouseY >= 355 && mouseY <= 385) && inicio) {
				if (mouseX >= 215 && mouseX <= 280) {
					if (passaroCor == "vermelho") {
						image(botaoVermelhoOn, width / 2 - 72, 370, 70, 35);
					} else {
						image(botaoVermelho, width / 2 - 72, 370, 70, 35);
					}
				} else if (mouseX >= 285 && mouseX <= 350 && pontosTotal >= 4) {
					if (passaroCor == "amarelo") {
						image(botaoAmareloOn, width / 2, 370, 70, 35);
					} else {
						image(botaoAmarelo, width / 2, 370, 70, 35);
					}
				} else if (mouseX >= 360 && mouseX <= 425 && pontosTotal >= 15) {
					if (passaroCor == "azul") {
						image(botaoAzulOn, width / 2 + 73, 370, 70, 35);
					} else {
						image(botaoAzul, width / 2 + 73, 370, 70, 35);
					}
				}
			}

		} else if (conquista == false && inicio == false) {
			if (niveis) {
				telaNiveis();
			} else if(screenRecorde){
				telaRecorde();
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
					case 7:
						recordeNivel();
						break;
					default:
						break;
				}
			}
		} else if (conquista && inicio == false) {
			telaConquista();
		}

		if(passouNivel == true){
			imageMode(CORNER);
			image(badgeColetado, -5, 415);
		}

		if(novaSkin == true){
			imageMode(CORNER);
			image(skinDesbloqueada, -5, 365);
		}
		if(pontosTotal == 4 && skinsUnlocked < 1){
			novaSkin = true;
			setTimeout(function(){
				novaSkin = false;
				skinsUnlocked = 1;
			},5000);
		}
		if(pontosTotal == 15 && skinsUnlocked < 2){
			novaSkin = true;
			setTimeout(function(){
				novaSkin = false;
				skinsUnlocked = 2;
			},5000);
		}
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
		image(essbadge, width / 2 - 45.5, 160, 91, 65)
		fill(126, 226, 116);
		text(`${pontos.ess} / 2`, width / 2, 255);
	} else {
		image(essbadgeBW, width / 2 - 45.5, 160, 91, 65)
		fill(132);
		text(`${pontos.ess} / 2`, width / 2, 255);
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
		image(esabadge, width / 2 - 45.5, 300, 91, 65)
		fill(126, 226, 116);
		text(`${pontos.esa} / 5`, width / 2, 395);
	} else {
		image(esabadgeBW, width / 2 - 45.5, 300, 91, 65)
		fill(132);
		text(`${pontos.esa} / 5`, width / 2, 395);
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

function telaNiveis() {
	background('grey');
	imageMode(CORNER);
	image(niveisIMG, 0, 0);
	image(voltar, 20, 20);
	image(avancar, 540, 380);

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

	if ((mouseX >= 540 && mouseX <= 570 && mouseY >= 380 && mouseY <= 410) && niveis) {
		image(avancar, 540, 380, 36, 36);
	}

	textSize(20);
	fill(55, 59, 54);
	textFont(newFont)
	textAlign(LEFT);
	text("escolha o nivel", 116, 135);
}

function telaRecorde() {
	background('grey');
	imageMode(CORNER);
	image(modoRecorde, 0, 0);
	image(voltar, 20, 20);
	if ((mouseX >= 20 && mouseX <= 52 && mouseY >= 20 && mouseY <= 52) && screenRecorde) {
		image(voltar, 20, 20, 36, 36);
	}

	recordeRanking.sort(function (a, b) {
		return a - b;
	});

	recordeRanking3 = recordeRanking.slice(-3);

	imageMode(CENTER);
	image(jogarModoRecorde, 320, 210);
	textAlign(CENTER);
	fill(255);
	textSize(32);
	text (`${recordeRanking3[2]}`, 190, 365);
	text (`${recordeRanking3[1]}`, 320, 365);
	text (`${recordeRanking3[0]}`, 450, 365);
	

	if ((mouseX >= 115 && mouseX <= 525 && mouseY >= 150 && mouseY <= 270) && screenRecorde) {
		image(jogarModoRecorde, 320, 210, 420, 130);
	}

	textSize(20);
	fill(55, 59, 54);
	textAlign(LEFT);
	textFont(newFont)
	text("escolha o nivel", 116, 135);
}

function mouseClicked() {
	if ((mouseX >= width / 2 - 105 && mouseX <= width / 2 + 105 && mouseY >= 320 && mouseY <= 350) && inicio) {
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
		/* Botão de avançar */
		if ((mouseX >= 540 && mouseX <= 570 && mouseY >= 380 && mouseY <= 410)) {
			inicio = false;
			niveis = false;
			conquista = false;
			screenRecorde = true;
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

	if(screenRecorde){
		if ((mouseX >= 20 && mouseX <= 52 && mouseY >= 20 && mouseY <= 52)) {
			inicio = false;
			niveis = true;
			conquista = false;
			screenRecorde = false;
		}

		if ((mouseX >= 115 && mouseX <= 525 && mouseY >= 150 && mouseY <= 270)){
			recorde = 0;
			screenRecorde = false;
			dificuldadeRecorde = 2.5;
			nivel = 7;
		}
	}

	if ((mouseX >= width / 2 - 105 && mouseX <= width / 2 + 105 && mouseY >= 285 && mouseY <= 315) && inicio) {
		/* 	Como não haverá mais do que 12 tuneis / simbolos,
		é feito um random para 12 posições possíveis,
		e apenas apresentado as necessárias,
		por exemplo num nível de 5 tuneis, será apenas utilizado 5 randoms */
		for (let i = 1; i < 999; i++) {
			topY[i] = random(-540, -440);
		}
		for (let i = 1; i < 999; i++) {
			iconY[i] = random(100, 350);

			collected[i] = true;
		}

		inicio = !inicio;
		niveis = !niveis;
	}

	if (mouseY >= 385 && mouseY <= 415) {
		if (mouseX >= 215 && mouseX <= 280) {
			dificuldade = facil;
		} else if (mouseX >= 285 && mouseX <= 350) {
			dificuldade = medio;
		} else if (mouseX >= 360 && mouseX <= 425) {
			dificuldade = dificil;
		}
	}

	if ((mouseY >= 355 && mouseY <= 385)) {
		if (mouseX >= 215 && mouseX <= 280) {
			passaroCor = "vermelho";
		} else if (mouseX >= 285 && mouseX <= 350 && pontosTotal >= 4) {
			passaroCor = "amarelo";
		} else if (mouseX >= 360 && mouseX <= 425 && pontosTotal >= 15) {
			passaroCor = "azul";
		}
	}
}

function nivelESDL() {
	background('white');

	imageMode(CORNER);
	image(video, 0, 0);

	if (crashou == false) {
		tunelX = tunelX - 1 * dificuldade;
		iconX = iconX - 1 * dificuldade;
	}

	const nivel = new Nivel(1, tunelX, topY, iconX, iconY, esdlbadge, pontos.esdl);

	nivel.show();
	switch (passaroCor) {
		case "vermelho":
			nivel.passaro(birdVermelho);
			break;
		case "amarelo":
			nivel.passaro(birdAmarelo);
			break;
		case "azul":
			nivel.passaro(birdAzul);
			break;

		default:
			break;
	}
	nivel.extras();
}

function nivelESS() {
	background('white');

	imageMode(CORNER);
	image(video, 0, 0);

	if (crashou == false) {
		tunelX = tunelX - 1 * dificuldade;
		iconX = iconX - 1 * dificuldade;
	}

	const nivel = new Nivel(2, tunelX, topY, iconX, iconY, essbadge, pontos.ess);

	nivel.show();
	switch (passaroCor) {
		case "vermelho":
			nivel.passaro(birdVermelho);
			break;
		case "amarelo":
			nivel.passaro(birdAmarelo);
			break;
		case "azul":
			nivel.passaro(birdAzul);
			break;

		default:
			break;
	}
	nivel.extras();
}

function nivelESE() {
	background('white');

	imageMode(CORNER);
	image(video, 0, 0);

	if (crashou == false) {
		tunelX = tunelX - 1 * dificuldade;
		iconX = iconX - 1 * dificuldade;
	}

	const nivel = new Nivel(3, tunelX, topY, iconX, iconY, esebadge, pontos.ese);

	nivel.show();
	switch (passaroCor) {
		case "vermelho":
			nivel.passaro(birdVermelho);
			break;
		case "amarelo":
			nivel.passaro(birdAmarelo);
			break;
		case "azul":
			nivel.passaro(birdAzul);
			break;

		default:
			break;
	}
	nivel.extras();
}

function nivelESCE() {
	background('white');

	imageMode(CORNER);
	image(video, 0, 0);

	if (crashou == false) {
		tunelX = tunelX - 1 * dificuldade;
		iconX = iconX - 1 * dificuldade;
	}

	const nivel = new Nivel(4, tunelX, topY, iconX, iconY, escebadge, pontos.esce);

	nivel.show();
	switch (passaroCor) {
		case "vermelho":
			nivel.passaro(birdVermelho);
			break;
		case "amarelo":
			nivel.passaro(birdAmarelo);
			break;
		case "azul":
			nivel.passaro(birdAzul);
			break;

		default:
			break;
	}
	nivel.extras();
}

function nivelESA() {
	background('white');

	imageMode(CORNER);
	image(video, 0, 0);

	if (crashou == false) {
		tunelX = tunelX - 1 * dificuldade;
		iconX = iconX - 1 * dificuldade;
	}

	const nivel = new Nivel(5, tunelX, topY, iconX, iconY, esabadge, pontos.esa);

	nivel.show();
	switch (passaroCor) {
		case "vermelho":
			nivel.passaro(birdVermelho);
			break;
		case "amarelo":
			nivel.passaro(birdAmarelo);
			break;
		case "azul":
			nivel.passaro(birdAzul);
			break;

		default:
			break;
	}
	nivel.extras();
}

function nivelESTG() {
	background('white');

	imageMode(CORNER);
	image(video, 0, 0);

	if (crashou == false) {
		tunelX = tunelX - 1 * dificuldade;
		iconX = iconX - 1 * dificuldade;
	}

	const nivel = new Nivel(11, tunelX, topY, iconX, iconY, estgbadge, pontos.estg);

	nivel.show();
	switch (passaroCor) {
		case "vermelho":
			nivel.passaro(birdVermelho);
			break;
		case "amarelo":
			nivel.passaro(birdAmarelo);
			break;
		case "azul":
			nivel.passaro(birdAzul);
			break;

		default:
			break;
	}
	nivel.extras();
}

function recordeNivel() {
	background('white');

	imageMode(CORNER);
	image(video, 0, 0);

	if (crashou == false) {
		tunelX = tunelX - 1 * dificuldadeRecorde;
		iconX = iconX - 1 * dificuldadeRecorde;
	}

	dificuldadeRecorde = dificuldadeRecorde + 0.001;

	const nivel = new Nivel(999, tunelX, topY, iconX, iconY, estgbadge, recorde);

	nivel.show();
	switch (passaroCor) {
		case "vermelho":
			nivel.passaro(birdVermelho);
			break;
		case "amarelo":
			nivel.passaro(birdAmarelo);
			break;
		case "azul":
			nivel.passaro(birdAzul);
			break;

		default:
			break;
	}
	nivel.extras();
}