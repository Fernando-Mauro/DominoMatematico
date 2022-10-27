const socket = io();

function checkSocketStatus(){
   console.log(`Estado del socket: ${socket.connected}`);
}

socket.on(`connect`, () => {
   console.log(`El socket se ha conectado: ${socket.id}` );
});

socket.on('disconnect', () => {
   console.log(`El socket se ha desconectado: ${socket.id}`);
});

socket.io.on('reconnect_attempt', () => {
   console.log('Intentando reconectarse 🤐');
});

socket.io.on('reconnect', () =>{
   console.log(`Me he reconectado 🤩`);
});

socket.on(`connect_error`, () => {
   console.log(`No pude conectarme 🥲`);
})