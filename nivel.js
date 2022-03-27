/* Classe geral dos níveis */

class Nivel {

	// -- Constructor para as diferentes variáveis de cada nivel
	constructor(cursos, tunelX, topY, iconX, iconY, badge, pontosEscola) {
		//numero de tuneis a mostrar
		this.cursos = cursos;
		//posição dos tuneis em X
		this.tunelX = tunelX;
		//posição Y dos tuneis de cima
		this.topY = topY;
		//imagem da escola superior nos pontos
		this.badge = badge;
		//posição X de todas os pontos
		this.iconX = iconX;
		//posição Y de todos os pontos
		this.iconY = iconY;
		//numero de pontos apanhados
		this.pontos = pontosEscola;
	}

	// -- Ciclo for para estar sempre a dar print aos tuneis e aos coletáveis
	show() {
		// -- Loop do número de tuneis a mostrar
		for (let i = 1; i < this.cursos + 1; i++) {

			// -- Mostra cada tunel (cima e baixo)
			image(tunelTop, this.tunelX + (300 * i), this.topY[i]);
			image(tunelDown, this.tunelX + (300 * i), (this.topY[i] + 790));

			// -- Adiciona uma camada de terminar o nivel
			if (i == this.cursos) {
				image(end, this.tunelX + 300 + 300 * i, 0, 108, 480);
				// -- Assim que o passaro bate nessa camada, o jogo termina
				if ((initialBirdX + 16) > (this.tunelX + + 300 + 300 * i) && (initialBirdX - 16) < (this.tunelX + 300 + 300 * i + 108) && (noseY + 16) > 0 && (noseY - 16) < 480) {
					nivel = 0;
					endSound.play();
					passouNivel = true;
					setTimeout(function () {
						passouNivel = false;
					}, 5000);
					inicio = false;
					conquista = true;
				}
			}

			if (collected[i]) {
				image(this.badge, this.iconX + (300 * i), (this.iconY[i]), 57, 40.6);
			}

			// -- Invoca a função das colisões, com o devido i
			testarColisão(i);
		}
	}

	// -- Dá print ao pássaro escolhido
	passaro(passaro) {
		// -- Enquanto não perder o jogo, o passaro está sempre a aparecer
		if (crashou == false) {
			imageMode(CENTER);
			image(passaro, initialBirdX, noseY, 32, 32);
		}

		// -- Quando perder, o pássaro desaparece e aparece a animação da explosão
		if (crashou) {
			image(explosion, initialBirdX, noseY, 64, 64);
		}
	}

	// -- Extras, como o logotipo no canto, os pontos, etc...
	extras() {
		imageMode(CORNER);
		image(logo, 25, 25, 120, 60);

		imageMode(CENTER);
		fill(55, 59, 54);
		noStroke();
		ellipse(width / 2, 55, 50, 50);
		fill(255);
		textSize(32);
		textAlign(CENTER);
		textFont(newFont);
		text(`${this.pontos}`, width / 2, 65);
	}
}