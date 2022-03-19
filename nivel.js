class Nivel {
	constructor(cursos, tunelX, topY, iconX, iconY, badge, pontosEscola) {
		this.cursos = cursos;
		this.tunelX = tunelX;
		this.topY = topY;
		this.badge = badge;
		this.iconX = iconX;
		this.iconY = iconY;
		this.pontos = pontosEscola;
	}

	show() {
		if (carregou) {
			/* -- Loop do número de tuneis a mostrar -- */
			for (let i = 1; i < this.cursos + 1; i++) {

				/* -- Mostra cada tunel (cima e baixo) -- */
				image(tunelTop, this.tunelX + (300 * i), this.topY[i]);
				image(tunelDown, this.tunelX + (300 * i), (this.topY[i] + 790));


				if (i == this.cursos) {
					image(end, this.tunelX + 300 + 300 * i, 0, 108, 480);

					if ((initialBirdX + 16) > (this.tunelX + + 300 + 300 * i) && (initialBirdX - 16) < (this.tunelX + 300 + 300 * i + 108) && (noseY + 16) > 0 && (noseY - 16) < 480) {
						nivel = 0;
						endSound.play();
						inicio = false;
						conquista = true;
					}
				}

				if (collected[i]) {
					image(this.badge, this.iconX + (300 * i), (this.iconY[i]), 57, 40.6);
				}

				/* -- Invoca a função das colisões, com o devido i -- */
				testarColisão(i);
			}
		}
	}

	passaro() {
		if (carregou) {
			imageMode(CENTER);
			image(bird, initialBirdX, noseY, 32, 32);
		}
	}

	extras() {
		imageMode(CORNER);
		image(logo, 25, 25, 120, 60);

		imageMode(CENTER);
		fill(55, 59, 54);
		noStroke();
		ellipse(width / 2, 55, 50, 50);
		fill(255);
		textSize(32);
		textFont(newFont);
		text(`${this.pontos}`, width / 2 - 8, 65);
	}
}