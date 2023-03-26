let socket = new WebSocket("ws://51.250.69.80:8080");

socket.onopen = () => {
  alert("Соединение установлено");
};

socket.onclose = (event) => {
  alert(`Соединение разорвано, код: ${event.code}`);
};

const fire = document.querySelector(".fire");
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
  } else if (event.code === "Space") {
    if (fire.classList.contains("addFire")) return;
    // socket.send(`{"Move":"Fire"}`);
    fire.classList.add("addFire");
    fire.style.backgroundImage =
      "url(../img/fire.gif?random=" + Math.random() + ")";
    setTimeout(() => {
      fire.style.backgroundImage = "";
      fire.classList.remove("addFire");
    }, 800);
  }
});

socket.onmessage = (event) => {
  const dataParsed = JSON.parse(event.data);
  console.log(dataParsed);
  dataParsed.Players.forEach((player) => {
    if (!document.querySelector(`.tank${player.Id}`)) {
      const newTank = document.createElement("div");
      newTank.classList.add(`tank${player.Id}`);
      newTank.style.position = "absolute";
      newTank.style.top = `${player.X}px`;
      newTank.style.left = `${player.Y}px`;
      newTank.style.width = "100px";
      newTank.style.height = "124px";
      newTank.style.backgroundImage = "url(../img/Tank.png)";
      newTank.style.backgroundRepeat = "no-repeat";
      newTank.style.backgroundSize = "cover";
      newTank.style.transition = "left 0.3s linear, top 0.3s linear";
      newTank.style.transform = `rotate(${player.R}deg)`;
      document.body.prepend(newTank);
    } else {
      const tank = document.querySelector(`.tank${player.Id}`);
      tank.style.transform = `rotate(${player.R}deg)`;
      tank.style.left = `${player.X}px`;
      tank.style.top = `${player.Y}px`;
    }
  });
};