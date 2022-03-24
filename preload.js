/* Função para carregar os diversos assets */
function preload() {

	// -- Imagem do pássaro
	birdAzul = loadImage("data/birdAzul.png");
	birdAmarelo = loadImage("data/birdAmarelo.png");
	birdVermelho = loadImage("data/birdVermelho.png");

	botaoVermelho = loadImage("data/vermelho/botaoVermelho.png");
	botaoVermelhoOn = loadImage("data/vermelho/botaoVermelhoOn.png");
	botaoVermelhoLock = loadImage("data/vermelho/botaoVermelhoLock.png");
	botaoAmarelo = loadImage("data/amarelo/botaoAmarelo.png");
	botaoAmareloOn = loadImage("data/amarelo/botaoAmareloOn.png");
	botaoAmareloLock = loadImage("data/amarelo/botaoAmareloLock.png");
	botaoAzul = loadImage("data/azul/botaoAzul.png");
	botaoAzulOn = loadImage("data/azul/botaoAzulOn.png");
	botaoAzulLock = loadImage("data/azul/botaoAzulLock.png");


	// -- Tipo de letra utilizada no jogo
	newFont = loadFont('fonts/robotCrush.ttf');


	// -- Imagens para os diversos ecrãs no decorrer do jogo
	begin = loadImage("data/WallpaperBegin.png");
	conquistasIMG = loadImage("data/WallpaperConquistas.png");
	niveisIMG = loadImage("data/WallpaperNiveis.png");
	loading = loadImage("data/WallpaperLoading.png");
	modoRecorde = loadImage("data/modoRecorde.png");

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
	explosion = loadImage("data/explosion3.gif");


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
	botaoOn = loadImage("data/botaoOn.png");
	conquistasOn = loadImage("data/conquistasOn.png");
	voltar = loadImage("data/voltar.png");
	avancar = loadImage("data/avancar.png");
	resetar = loadImage("data/resetar.png");
	badgeColetado = loadImage("data/badgeColetado.png");
	skinDesbloqueada = loadImage("data/novaskin.png");
	jogarModoRecorde = loadImage("data/JogarModoRecorde.png");
}