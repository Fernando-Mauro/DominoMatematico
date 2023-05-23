const socket = io();

const seeInlineGames = () => {
    socket.emit("globallyInlineGames");
}

socket.on("inLineGamesGlobally", (data) => {
    const roomList = document.querySelector("#unordered-list-inline-games");
    roomList.innerHTML = "";
    let llaves = [...data];
    console.log(llaves);
    llaves.forEach(room => {
        // Crea el elemento LI
        const li = document.createElement("li");
        li.classList.add("flex", "justify-between", "snap-center", "items-center", "py-2", "flex-col", "md:flex-row", "border-b-[1px]", "border-gray-500", "p-4", "gap-8");

        // Crea el elemento DIV para el idRoom y ownerRoom
        const typeGame = document.createElement("div");
        typeGame.classList.add("flex", "items-center", "mr-4");

        // Crea el elemento DIV para el idRoom y ownerRoom
        const idOwnerDiv = document.createElement("div");
        idOwnerDiv.classList.add("flex", "items-center", "mr-4");

        const ownerDiv = document.createElement("div");
        ownerDiv.classList.add("flex", "items-center", "mr-4",);

        // Crea el elemento SPAN para el idRoom
        const typeGameSpan = document.createElement("span");
        typeGameSpan.textContent = `Tipo: ${room.type}`;
        typeGameSpan.classList.add("font-bold", "text-black", "mr-2",);

        // Crea el elemento SPAN para el idRoom
        const idRoomSpan = document.createElement("span");
        idRoomSpan.textContent = `ID: ${room.idGame}`;
        idRoomSpan.classList.add("font-bold", "text-green-500", "mr-2",);

        // Crea el elemento SPAN para el ownerRoom
        const ownerRoomSpan = document.createElement("span");
        ownerRoomSpan.textContent = `Dueño: ${room.ownerName}`;
        ownerRoomSpan.classList.add("text-red-500");

        // Agrega los elementos SPAN al DIV idOwnerDiv
        idOwnerDiv.appendChild(idRoomSpan);
        ownerDiv.appendChild(ownerRoomSpan);
        typeGame.appendChild(typeGameSpan);
        // Crea el elemento SPAN para el numberPlayers
        const numberPlayersSpan = document.createElement("span");
        numberPlayersSpan.textContent = `Número de jugadores: ${room.numberPlayers}`;
        numberPlayersSpan.classList.add("text-yellow-500", "border-1", "border-black");

        // Crea el elemento BUTTON para unirse a la sala
        const joinButton = document.createElement("button");
        joinButton.textContent = "Unirse a esta sala";
        joinButton.classList.add("bg-blue-500", "text-white", "rounded", "px-4", "py-2");

        joinButton.addEventListener("click", () => {
            location.href=`./${room.type}.html`;
        });
        // Agrega los elementos DIV, SPAN y BUTTON al LI
        li.appendChild(typeGame);
        li.appendChild(idOwnerDiv);
        li.appendChild(ownerDiv);
        li.appendChild(numberPlayersSpan);
        li.appendChild(joinButton);
        // Agrega el LI a la lista UL
        roomList.appendChild(li);

    });

})