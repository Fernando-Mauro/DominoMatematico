const user = prompt("Escribe tu usuaio");
const profes = ["RetaxMaster", "JuanDC", "GNDX"];
let socketNameSpace, group;

const chat = document.querySelector("#chat");
const namespace = document.querySelector("#namespace");

if(profes.includes(user)){
   socketNameSpace = io("/teachers");
   group = "teachers";
}else{
   socketNameSpace = io("/students");
   group = "students";
}
socketNameSpace.on("connect", () => {
   namespace.textContent = group;
});

// Envio de mensajes
const sendMessage = document.querySelector("#send-message");
sendMessage.addEventListener("click", () => {
   const mensaje = prompt("Escribe tu mensaje 📧: ");
   socketNameSpace.emit("send-message", {user, mensaje});
});

socketNameSpace.on("mensaje", (data) => {
   const {user, mensaje} = data;
   const li = document.createElement("li");
   const hora = new Date();
   li.textContent = `${user}:${mensaje} ${hora.getHours()}:${hora.getMinutes()}`;
   chat.appendChild(li);
})