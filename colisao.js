function testarColisão(i) {

	/* -- Testa colisão com o tunel de cima -- */
	if ((initialBirdX + 16) > (tunelX + (300 * i)) && (initialBirdX - 16) < (tunelX + (300 * i) + 71) && (noseY + 16) > (topY[i]) && (noseY - 16) < (topY[i] + 640) && inicio == false && crashou == false) {
		hitSound.play();
		crashou = true;

		setTimeout(function () {
			recordeRanking.push(recorde);
			inicio = true;
			crashou = false;
		}, 750)
	}


	/* -- Testa colisão com o tunel de baixo -- */
	if ((initialBirdX + 16) > (tunelX + (300 * i)) && (initialBirdX - 16) < (tunelX + (300 * i) + 71) && (noseY + 16) > (topY[i] + 790) && (noseY - 16) < (topY[i] + 640 + 790) && inicio == false && crashou == false) {
		hitSound.play();
		crashou = true;
		terminarRecorde = true;

		setTimeout(function () {
			recordeRanking.push(recorde);
			inicio = true;
			crashou = false;
		}, 750)
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
				case 7:
					collectSound.play();
					recorde++;
					break;
				default:
					break;
			}
		}

		collected[i] = false;
	}

}