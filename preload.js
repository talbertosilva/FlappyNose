/* Função para carregar os diversos assets */

function preload() {

	birdVermelho = loadImage("data/birdVermelho.png");

	// -- Tipo de letra utilizada no jogo
	newFont = loadFont('fonts/robotCrush.ttf');

	// -- Imagens para os diversos ecrãs no decorrer do jogo
	begin = loadImage("data/WallpaperBegin.png");
	loading = loadImage("data/WallpaperLoading.png");
	estgbadge = loadImage("data/estgbadge.png");

	// -- Imagens para a barra de terminar o jogo e barra do jogo terminado
	end = loadImage("data/endGame.png");
	explosion = loadImage("data/explosion3.gif");


	// -- Imagem dos túneis
	// -- Uma alternativa seria fazer rotação de cada imagem 
	tunelTop = loadImage("data/Tunnel.png");
	tunelDown = loadImage("data/Tunnel2.png");


	// -- Logotipo do jogo
	logo = loadImage("data/logo.png");


	// -- Botões
	botao = loadImage("data/botao.png");
	botaoOn = loadImage("data/botaoOn.png");
}