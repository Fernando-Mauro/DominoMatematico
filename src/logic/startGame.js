const getRandomInt = require("./getRamdonInt");

const startGame = ({ players, pieces, usedNumber, notUsed, double , turn}) => {
    // Generar las 7 fichas para cada jugador
    players.forEach((player, index) => {
        while (player.hand.length < 7) {
           let positionRandom = getRandomInt(0, 28);

           while (pieces[positionRandom].used && positionRandom < 28) {
              positionRandom = positionRandom === 27 ? 0 : positionRandom + 1;
           }
           // Si aleatoriamente se asigna la double del 6 el primer turno es del jugador con la double del 6
           if (pieces[positionRandom].first === 6 && pieces[positionRandom].second === 6) {
              turn = index;
              double = true;
           }
           player.hand.push(pieces[positionRandom]);
           pieces[positionRandom].used = true;
           usedNumber++;
        }
     });

     // Agregar al set las piezas que no se estan ocupando
     pieces.forEach(pieza => {
        if (!pieza.used) {
           notUsed.push(pieza);
        }
     });

     // Si no se repartio la double del 6
     let bandera = true;
     if (!double) {
        for (let i = 5; i >= 0; --i) {
           players.forEach((player, index) => {
              player.hand.forEach(pieza => {
                 if (pieza.first == i && pieza.second == i && bandera) {
                    turn = index;
                    bandera = false;
                    return;
                 }
              })
           })
        }
     }
}

module.exports = startGame;