var x, y, topY = [], iconY = [], collected = [];

let video;
let videoFoto;
let imgVideo;
let numImg = 0;

let noseY = 0;

let initialBirdX = 100;

/* Posição no eixo dos X dos tuneis e dos colectáveis */
let tunelX;
let iconX;

let crashou = false;
let novoRecorde = false;

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

let dificuldadeRecorde = 2.5;
let passaroCor = "vermelho";

let tamanhoLoading = 0;

let terminarRecorde = false;
let novaSkin = false;
let passouNivel = false;

let segundos;
let start_time;

let tirouFoto = false;

/* Função para preparação do ambiente do jogo */
function setup() {
	createCanvas(640, 480);

	preload();

	videoFoto = createCapture(VIDEO);
	videoFoto.hide();
	video = createCapture(VIDEO);
	video.hide();

	downloadNum = getItem('numeroImagem');
	imagemCarregada = loadImage(`data/recorde-imagem(${downloadNum}).png`);

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
	segundos = millis();

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
	textSize(21);
	text(`recorde`, 373, 350);
	textSize(72);
	text(`${pontosSaved}`, 373, 388);

	if (imgVideo != null) {
		imageMode(CORNER);
		image(imgVideo, 215, 345, 100, 75);
	} else if (imgVideo == null){
		imageMode(CORNER);
		image(imagemCarregada, 215, 345, 100, 75);
	}

	imageMode(CENTER);
	textSize(16);
	fill(48, 64, 43);
	textFont(newFont);
	textAlign(CORNER, CORNER);
	text("Trabalho realizado por:		João Pires		Nelson Dias		Tiago Silva				engenharia da computação gráfica e multimédia", textoX, textoY);
	textoX = textoX - 1.5;

	if (textoX + 880 < 0) {
		textoX = 640;
	}

	if (inicio) {
		if (noseY >= 260 && noseY <= 330) {
			image(botaoOn, width / 2, 300, 220, 65);
			if (start_time == null) {
				start_time = segundos;
			}
			if (segundos - start_time >= 3000) {
				for (let i = 1; i < 999; i++) {
					topY[i] = random(-540, -440);
				}
				for (let i = 1; i < 999; i++) {
					iconY[i] = random(100, 350);

					collected[i] = true;
				}

				inicio = !inicio;
				start_time = null;
				recorde = 0;
				novoRecorde = false;
				screenRecorde = false;
				dificuldadeRecorde = 2.5;
				nivel = 7;
			}
		} else {
			start_time = null;
		}
	}

	fill(255);
	noStroke();
	ellipse(320, noseY, 16, 16);
}

/* 
	Explicação destas funções de nivel
*/
function recordeNivel() {
	background('white');

	imageMode(CORNER);
	image(videoFoto, 0, 0);
	image(video, 0, 0);

	if (millis() >= 3000 && tirouFoto == false && novoRecorde) {
		shoot();
		tirouFoto = true;
	}

	// -- Quando perder o jogo (crashou == true), a movimentação dos tuneis e dos simbolos, pára
	if (crashou == false) {
		tunelX = tunelX - 1 * dificuldadeRecorde;
		iconX = iconX - 1 * dificuldadeRecorde;
	}

	// -- Velocidade sempre a crescer
	dificuldadeRecorde = dificuldadeRecorde + 0.005;

	// -- Criação do devido nivel com os respectivos valores
	const nivel = new Nivel(999, tunelX, topY, iconX, iconY, estgbadge, recorde);
	nivel.show();
	nivel.passaro(birdVermelho);
	nivel.extras();
}

function shoot() {
	if (tirouFoto == false && novoRecorde) {
		imgVideo = videoFoto.get(0, 0, 640, 480);
		numImg+=1;
		storeItem('numeroImagem', numImg);
		localNum = getItem('numeroImagem');
		imgVideo.save(`recorde-imagem(${localNum})`, 'png')
	}
}