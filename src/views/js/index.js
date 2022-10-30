const socket = io();

const circle = document.querySelector("#circle");

function drag(evento){
   const position = {
      top: evento.clientY + "px",
      left: evento.clientX + "px"
   };
   dragCircle(position);
   socket.emit("circle position", position);
}

function dragCircle(data) {
   circle.style.top = data.top;
   circle.style.left = data.left;
} 
socket.on("moveCircle", (data) => {
   dragCircle(data);
});

document.addEventListener("mousedown", () => {
   document.addEventListener("mousemove", drag)
});

document.addEventListener("mouseup", () => {
   document.removeEventListener("mousemove", drag);
});