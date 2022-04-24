var x, y, topY = [], iconY = [], collected = [];

let video;

let noseY = 0;

let initialBirdX = 100;

/* Posição no eixo dos X dos tuneis e dos colectáveis */
let tunelX;
let iconX;

let crashou = false;

/* Pontos iniciais de cada nível */
let pontos = { estg: 0, ese: 0, esa: 0, esce: 0, esdl: 0, ess: 0 };
let recorde = 0;
let recordeRanking = [0, 0, 0];
//top 3 jogadores
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
			faseinicio();
		} else if (conquista == false && inicio == false) {
			if (niveis) {
				telaNiveis();
			} else if (screenRecorde) {
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

		if (passouNivel == true) {
			imageMode(CORNER);
			image(badgeColetado, -5, 415);
		}

		if (novaSkin == true) {
			imageMode(CORNER);
			image(skinDesbloqueada, -5, 365);
		}
		if (pontosTotal == 4 && skinsUnlocked < 1) {
			novaSkin = true;
			setTimeout(function () {
				novaSkin = false;
				skinsUnlocked = 1;
			}, 5000);
		}
		if (pontosTotal == 15 && skinsUnlocked < 2) {
			novaSkin = true;
			setTimeout(function () {
				novaSkin = false;
				skinsUnlocked = 2;
			}, 5000);
		}
	}
}

function faseinicio() {

	background('grey');
	frameRate(30);

	tunelX = 320;
	iconX = 480;


	imageMode(CORNER);
	image(begin, 0, 0);
	imageMode(CENTER);
	image(botao, width / 2, 300);



	pontosSaved = getItem('recorde');


	fill(48, 64, 43);
	textAlign(CENTER, CENTER);
	textSize(24);
	text(`recorde`, width / 2, 350);
	textSize(72);
	text(`${pontosSaved}`, width / 2, 388);


	textSize(16);
	fill(48, 64, 43);
	textFont(newFont);
	textAlign(CORNER);
	text("Trabalho realizado por:		João Pires		Nelson Dias		Tiago Silva				engenharia da computação gráfica e multimédia", textoX, textoY);
	textoX = textoX - 1.5;

	if (textoX + 880 < 0) {
		textoX = 640;
	}

	if ((noseY >= 260 && noseY <= 330) && inicio) {
		image(botaoOn, width / 2, 300, 220, 65);
		setTimeout(function() {
			if ((noseY >= 260 && noseY <= 330) && inicio) {
				for (let i = 1; i < 999; i++) {
					topY[i] = random(-540, -440);
				}
				for (let i = 1; i < 999; i++) {
					iconY[i] = random(100, 350);

					collected[i] = true;
				}

				inicio = !inicio;
				recorde = 0;
				screenRecorde = false;
				dificuldadeRecorde = 2.5;
				nivel = 7;
			}
		}, 3000);
	}

	fill(255);
	noStroke();
	ellipse(320, noseY, 16, 16);
}

function mouseClicked() {

	if ((mouseX >= width / 2 - 105 && mouseX <= width / 2 + 105 && mouseY >= 285 && mouseY <= 315) && inicio) {
		/* 	
			É feito um random para 999 posições possíveis,
			e apenas apresentado as necessárias,
			por exemplo num nível de 5 tuneis, será apenas utilizado 5 randoms
		*/
		for (let i = 1; i < 999; i++) {
			topY[i] = random(-540, -440);
		}
		for (let i = 1; i < 999; i++) {
			iconY[i] = random(100, 350);

			collected[i] = true;
		}

		inicio = !inicio;
		recorde = 0;
		screenRecorde = false;
		dificuldadeRecorde = 2.5;
		nivel = 7;
	}
}

/* 
	Explicação destas funções de nivel
*/
function recordeNivel() {
	background('white');

	imageMode(CORNER);
	image(video, 0, 0);

	// -- Quando perder o jogo (crashou == true), a movimentação dos tuneis e dos simbolos, pára
	if (crashou == false) {
		tunelX = tunelX - 1 * dificuldadeRecorde;
		iconX = iconX - 1 * dificuldadeRecorde;
	}

	// -- Velocidade sempre a crescer
	dificuldadeRecorde = dificuldadeRecorde + 0.001;

	// -- Criação do devido nivel com os respectivos valores
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