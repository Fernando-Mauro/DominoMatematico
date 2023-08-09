const getRandomInt = require("./getRamdonInt");

function startGame (){
    // Generar las 7 fichas para cada jugador
    this.players.forEach((player, index) => {
        while (player.hand.length < 7) {
            let positionRandom = getRandomInt(0, 28);

            while (this.pieces[positionRandom].used && positionRandom < 28) {
                positionRandom = positionRandom === 27 ? 0 : positionRandom + 1;
            }
            // Si aleatoriamente se asigna la double del 6 el primer turno es del jugador con la double del 6
            if (this.pieces[positionRandom].first === 6 && this.pieces[positionRandom].second === 6) {
                this.turn = index;
                this.double = true;
            }
            player.hand.push(this.pieces[positionRandom]);
            this.pieces[positionRandom].used = true;
            this.usedNumber++;
        }
    });

    // Agregar al set las piezas que no se estan ocupando
    this.pieces.forEach(pieza => {
        if (!pieza.used) {
            this.notUsed.push(pieza);
        }
    });

    // Si no se repartio la this.double del 6
    if (!this.double) {
        for (let i = 5; i >= 0; --i) {
            this.players.forEach((player, index) => {
                player.hand.forEach(pieza => {
                    if (pieza.first == i && pieza.second == i) {
                        this.turn = index;
                        return;
                    }
                })
            })
        }
    }
}

module.exports = startGame;