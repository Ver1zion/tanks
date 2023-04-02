let socket = new WebSocket("ws://localhost:8080");

socket.onopen = () => {
  alert("Соединение установлено");
};

socket.onclose = (event) => {
  alert(`Соединение разорвано, код: ${event.code}`);
};

const moveArray = ["ArrowLeft", "ArrowRight", "ArrowDown", "ArrowUp"];
const wall1 = document.querySelector(".wall-1");
const wall2 = document.querySelector(".wall-2");
const wall3 = document.querySelector(".wall-3");
const wall4 = document.querySelector(".wall-4");

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    socket.send(`{"Move":"Left"}`);
  } else if (event.key === "ArrowRight") {
    socket.send(`{"Move":"Right"}`);
  } else if (event.key === "ArrowUp") {
    socket.send(`{"Move":"Up"}`);
  } else if (event.key === "ArrowDown") {
    socket.send(`{"Move":"Down"}`);
  } else if (event.code === "Space") {
    socket.send(`{"Move":"Fire"}`);
  }
});

document.addEventListener("keyup", (event) => {
  if (moveArray.includes(event.key)) {
    socket.send(`{"Move":"Stop"}`);
  }
});

socket.onmessage = (event) => {
  const dataParsed = JSON.parse(event.data);
  console.log(dataParsed);
  dataParsed.Players.forEach((player) => {
    if (!document.querySelector(`.tank${player.Id}`)) {
      const newTank = document.createElement("div");
      const fire = document.createElement("div");
      fire.classList.add(`fire${player.Id}`);
      newTank.prepend(fire);
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
      if (player.Fired === true) {
        const fire = document.querySelector(`.fire${player.Id}`);
        fire.style.display = "block";
        fire.style.position = "absolute";
        fire.style.top = "-60px";
        fire.style.left = "30px";
        fire.style.width = "40px";
        fire.style.height = "80px";
        fire.style.backgroundRepeat = "no-repeat";
        fire.style.backgroundSize = "cover";
        fire.style.transform = "rotate(90deg)";
        fire.style.zIndex = "10";
        fire.classList.add(`bullet${player.Id}`);
        if (fire.classList.contains(`addFire${player.Id}`)) return;
        fire.classList.add(`addFire${player.Id}`);
        fire.style.backgroundImage =
          "url(../img/fire.gif?random=" + Math.random() + ")";
        setTimeout(() => {
          fire.style.backgroundImage = "";
          fire.classList.remove(`addFire${player.Id}`);
        }, 800);
      }
    }
  });
};
