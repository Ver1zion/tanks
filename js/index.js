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
    tank.style.transform = "rotate(270deg)";
    socket.send(`{"Move":"Left"}`);
  } else if (event.key === "ArrowRight") {
    tank.style.transform = "rotate(90deg)";
    socket.send(`{"Move":"Right"}`);
  } else if (event.key === "ArrowUp") {
    tank.style.transform = "rotate(0deg)";
    socket.send(`{"Move":"Up"}`);
  } else if (event.key === "ArrowDown") {
    tank.style.transform = "rotate(180deg)";
    socket.send(`{"Move":"Down"}`);
  }

  socket.onmessage = (event) => {
    let dataParsed = JSON.parse(event.data);
    console.log(dataParsed);
    const x = dataParsed.X;
    const y = dataParsed.Y;
    tank.style.left = x + "px";
    tank.style.top = -y + "px";
  };
});
