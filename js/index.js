let socket = new WebSocket("ws://51.250.7.241:8080");

socket.onopen = () => {
  alert("Соединение установлено");
};

socket.onclose = (event) => {
  alert(`Соединение разорвано, код: ${event.code}`);
};

const tank = document.querySelector(".tank");
const wall1 = document.querySelector(".wall-1");
const wall2 = document.querySelector(".wall-2");
const wall3 = document.querySelector(".wall-3");
const wall4 = document.querySelector(".wall-4");

document.addEventListener("keyup", (event) => {
  if (event.key === "ArrowLeft") {
    socket.send(`{"Move":"Left"}`);
  } else if (event.key === "ArrowRight") {
    socket.send(`{"Move":"Right"}`);
  } else if (event.key === "ArrowUp") {
    socket.send(`{"Move":"Up"}`);
  } else if (event.key === "ArrowDown") {
    socket.send(`{"Move":"Down"}`);
  }

  socket.onmessage = (event) => {
    const dataParsed = JSON.parse(event.data);
    console.log(dataParsed);
    const x = dataParsed.X;
    const y = dataParsed.Y;
    const rotate = dataParsed.R;
    tank.style.transform = rotate + "deg";
    tank.style.left = x + "px";
    tank.style.top = y + "px";
  };
});

const players = {
  Players: [
    { Id: 0, X: 20, Y: 40 },
    { Id: 1, X: 20, Y: 40 },
  ],
};

if (players.Players.length >= 2) {
  const tank2 = tank.cloneNode();
  tank2.classList.remove("tank");
  tank2.classList.add("tank-2");
  document.body.append(tank2);
}

socket.onmessage = (event) => {};
