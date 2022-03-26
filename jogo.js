var x, y, topY = [], iconY = [], collected = [];

let video;

let noseX = 0;
let noseY = 0;

let initialBirdX = 100;

/* Posição no eixo dos X dos tuneis e dos colectáveis */
let tunelX;
let iconX;

/* Pontos iniciais de cada nível */
let pontos = { estg: 0 };
let pontosTotal = 0;

/* Tela do inicio, caso seja true esta será mostrada, caso contrário não irá aparecer no ecrã */
let inicio = true;

/* Tela da escolha dos niveis, caso seja true esta será mostrada, caso contrário não irá aparecer no ecrã */
let niveis = false;

/* Nível, caso seja =1, aparecerá no ecrã o nível 1, caso seja =2, aparecerá o nível 2, e por ai adiante... */
let nivel = 0;

/* Posição inicial do texto no rodapé */
let textoX = 640;
let textoY = 480 - 18;

/* Variável para verificar se a webcam carregou */
let carregou = false;

let dificuldade = 2.5;

let loading = 0;

/* Função para carregar os diversos assets */
function preload() {

	// -- Imagem do pássaro
	birdVermelho = loadImage("data/birdVermelho.png");

	// -- Tipo de letra utilizada no jogo
	newFont = loadFont('fonts/robotCrush.ttf');

	// -- Imagens para os diversos ecrãs no decorrer do jogo
	begin = loadImage("data/WallpaperBegin.png");

	// -- Simbolos de cada escola a cores e preto & branco
	// -- Uma alterativa seria aplicar um fitro preto & branco a cada imagem a cores
	// ESTG
	estgbadge = loadImage("data/estgbadge.png");
	estgbadgeBW = loadImage("data/estgbadgeBW.png");


	// -- Imagem dos túneis
	// -- Uma alternativa seria fazer rotação de cada imagem 
	tunelTop = loadImage("data/Tunnel.png");
	tunelDown = loadImage("data/Tunnel2.png");


	// -- Logotipo do jogo
	logo = loadImage("data/logo.png");

	// -- Botões
	botao = loadImage("data/botao.png");
	voltar = loadImage("data/voltar.png");
	resetar = loadImage("data/resetar.png");
}

/* Função para preparação do ambiente do jogo */
function setup() {
	createCanvas(640, 480);
	frameRate(60);

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
		let nX = poses[0].pose.keypoints[0].position.x;

		noseY = lerp(noseY, nY, 0.4);
		noseX = lerp(noseX, nX, 0.4);
	}
}

function modelLoaded() {
	carregou = true;
}

function draw() {
	pontosTotal = pontos.estg + pontos.ese + pontos.esa + pontos.esce + pontos.esdl + pontos.ess;

	if (inicio) {
		background('grey');

		tunelX = 320;
		iconX = 480;

		for (let i = 1; i < 399; i++) {
			topY[i] = random(-540, -440);
		}
		for (let i = 1; i < 399; i++) {
			iconY[i] = random(100, 350);

			collected[i] = true;
		}

		imageMode(CORNER);
		image(begin, 0, 0);
		imageMode(CENTER)
		image(botao, 316, 346);

		textSize(16);
		fill(48, 64, 43);
		textFont(newFont);
		text("Trabalho realizado por:		João Pires		Nelson Dias		Tiago Silva", textoX, textoY);
		textoX = textoX - 1.5;

		if (textoX + 480 < 0) {
			textoX = 640;
		}

		ellipse(noseX, noseY, 16, 16);

		if ((noseX >= 216 && noseX <= 416 && noseY >= 296 && noseY <= 396) && inicio) {
			image(botao, 316, 346, 210, 105);
		}

		var delay = (function () {
			var timer = 0;
			return function (callback, ms) {
				clearTimeout(timer);
				timer = setTimeout(callback, ms);
			};
		})();



		if (noseX >= 216 && noseX <= 416) {
			if (noseY >= 296 && noseY <= 396) {

				delay(function () {
					if (noseX >= 216 && noseX <= 416) {
						if (noseY >= 296 && noseY <= 396) {
							inicio = false;
							pontos.estg = 0;
							niveis = true;
						}
					}
				}, 3000);

			}
		}

	} else if (niveis) {
		nivelInfinito();
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
			collectSound.play();
			pontos.estg++;
		}

		collected[i] = false;
	}

}

function nivelInfinito() {
	background('white');

	imageMode(CORNER);
	image(video, 0, 0);

	imageMode(CENTER);
	image(birdVermelho, initialBirdX, noseY, 32, 32);

	tunelX = tunelX - 1 * dificuldade;
	iconX = iconX - 1 * dificuldade;

	for (let i = 1; i < 399; i++) {

		/* -- Mostra cada tunel (cima e baixo) -- */
		imageMode(CORNER);
		image(tunelTop, tunelX + (300 * i), topY[i]);
		image(tunelDown, tunelX + (300 * i), (topY[i] + 790));

		if (collected[i]) {
			image(estgbadge, iconX + (300 * i), (iconY[i]), 57, 40.6);
		}

		/* -- Invoca a função das colisões, com o devido i -- */
		testarColisão(i);
	}

	dificuldade = dificuldade + 0.002;

	imageMode(CENTER);
	fill(55, 59, 54);
	noStroke();
	ellipse(width / 2, 55, 50, 50);
	fill(255);
	textSize(32);
	textFont(newFont);
	text(`${pontos.estg}`, width / 2 - 8, 65);

	imageMode(CORNER);
	image(logo, 25, 25, 120, 60);
}