import "./styles/styles.css";

import Vector2 from "./js/Vector2.js";

const canvasElem = document.createElement("canvas");
canvasElem.width = window.innerWidth;
canvasElem.height = window.innerHeight;

const ctx = canvasElem.getContext("2d");
ctx.imageSmoothingEnabled = false;

const images = [
  {
    name: "основание",
    src: "../assets/tank_1/1.png",
  },
  {
    name: "двигатель_трансмиссия",
    src: "../assets/tank_1/2.png",
  },
  {
    name: "боезапас",
    src: "../assets/tank_1/3.png",
  },
  {
    name: "механизм_башни",
    src: "../assets/tank_1/4.png",
  },
  {
    name: "крышка",
    src: "../assets/tank_1/5.png",
  },
  {
    name: "turret",
    src: "../assets/tank_1/6.png",
  },
  {
    name: "shell_1",
    src: "../assets/shells/1.png",
  },
  {
    name: "shell_2",
    src: "../assets/shells/2.png",
  },
];

const loadedImages = {};

function loadResources() {
  let alreadyLoaded = 0;

  return new Promise((resolve) => {
    for (const img of images) {
      const image = new Image();
      image.src = img.src;

      image.onload = () => {
        loadedImages[img.name] = image;

        alreadyLoaded++;
        if (alreadyLoaded >= images.length) {
          resolve();
        }
      };
    }
  });
}

const rotateVec = (vec, theta) => {
  return {
    x: vec.x * Math.cos(theta) - vec.y * Math.sin(theta),
    y: vec.x * Math.sin(theta) + vec.y * Math.cos(theta),
  };
};

const getAxis = (rad, rectX, rectY) => {
  const xLine = new Vector2({ x: 1, y: 0 });
  const yLine = new Vector2({ x: 0, y: 1 });

  const RX = rotateVec(xLine, rad);
  const RY = rotateVec(yLine, rad);

  return [
    {
      origin: new Vector2({ x: rectX, y: rectY }),
      direction: new Vector2({ x: RX.x, y: RX.y }),
    },
    {
      origin: new Vector2({ x: rectX, y: rectY }),
      direction: new Vector2({ x: RY.x, y: RY.y }),
    },
  ];
};

const getCorners = (rectX, rectY, rectW, rectH, rad) => {
  const axis = getAxis(rad, rectX, rectY);

  const center = new Vector2({ x: rectX, y: rectY });

  const RX = axis[0].direction.multiply(rectW / 2);
  const RY = axis[1].direction.multiply(rectH / 2);

  return [
    center.add(RX).add(RY),
    center.add(RX).add(RY.multiply(-1)),
    center.add(RX.multiply(-1)).add(RY.multiply(-1)),
    center.add(RX.multiply(-1)).add(RY),
  ];
};

const tank = {
  x: 150,
  y: 150,
  w: 66,
  h: 33,
  turret: {
    w: 56,
    h: 19,
    x: 10,
    y: 7,
  },
  hBoxes: [
    {
      x: 4,
      y: 4,
      w: 58,
      h: 3,
      lines: null,
    },
    { x: 4, y: 25, w: 58, h: 3 },
    { x: 1, y: 7, w: 3, h: 18 },
    { x: 62, y: 7, w: 3, h: 18 },
    { x: 6, y: 11, w: 10, h: 11 },
    { x: 19, y: 10, w: 7, h: 13 },
    { x: 30, y: 11, w: 11, h: 11 },
    { x: 49, y: 12, w: 11, h: 9 },
  ],
};

tank.hBoxes[0].lines = getAxis(
  0,
  tank.x - tank.w / 2 + 4 + 58 / 2,
  tank.y - tank.h / 2 + 4 + 3 / 2
);
tank.hBoxes[0].corners = getCorners(
  tank.x - tank.w / 2 + 4 + 58 / 2,
  tank.y - tank.h / 2 + 4 + 3 / 2,
  58,
  3,
  0
);

const shells = [];

const camera = {
  x: 0,
  y: 0,
  w: canvasElem.width,
  h: canvasElem.height,
};

function mouseDataConvertToWorldData(mouseX, mouseY) {
  const worldX = mouseX / 2 - camera.x;
  const worldY = mouseY / 2 - camera.y;

  return { worldX, worldY };
}

let angleTo = 0 * (Math.PI / 180);
let currentAngle = 0;
let rotate = true;
let speed = 10;

canvasElem.addEventListener("mousemove", (e) => {
  const { worldX, worldY } = mouseDataConvertToWorldData(e.offsetX, e.offsetY);

  const x = worldX - tank.x,
    y = worldY - tank.y;

  let rad = Math.atan2(y, x);

  angleTo = rad;

  rotate = true;
});

canvasElem.addEventListener("click", (e) => {
  const { worldX, worldY } = mouseDataConvertToWorldData(e.offsetX, e.offsetY);

  let x = tank.x - worldX,
    y = tank.y - worldY;

  const len = Math.sqrt(x * x + y * y);

  x = x / len;
  y = y / len;

  let rad = Math.atan2(y, x);

  shells.push({
    x: worldX,
    y: worldY,
    r: rad,
    dir: { x: x, y: y },
    active: true,
    lines: getAxis(rad, worldX, worldY),
    corners: getCorners(
      worldX,
      worldY,
      loadedImages["shell_1"].width,
      loadedImages["shell_1"].height,
      rad
    ),
  });

  shells[0].lines.length -= 1;
});

let lastDt = Date.now();

const corner = tank.hBoxes[0].corners[2];

function loop() {
  const dt = Date.now() - lastDt;
  lastDt = Date.now();

  if (rotate) {
    let to = angleTo * (180 / Math.PI);
    let curr = currentAngle * (180 / Math.PI);

    const speedRad = speed * (Math.PI / 180);

    curr = curr % 360;
    to = to % 360;

    if (curr < 0) {
      curr += 360;
    }

    if (to < 0) {
      to += 360;
    }

    if (curr < to) {
      if (Math.abs(curr - to) < 180) {
        currentAngle += speedRad;
      } else {
        currentAngle -= speedRad;
      }
    } else {
      if (Math.abs(curr - to) < 180) {
        currentAngle -= speedRad;
      } else {
        currentAngle += speedRad;
      }
    }

    if (Math.abs(curr - to) <= speed) {
      currentAngle = angleTo;
      rotate = false;
    }
  }

  ctx.scale(2, 2);

  ctx.translate(camera.x, camera.y);

  ctx.fillStyle = "#333333";
  ctx.fillRect(0, 0, canvasElem.width, canvasElem.height);

  ctx.save();
  ctx.translate(tank.x - tank.w / 2, tank.y - tank.h / 2);
  ctx.drawImage(loadedImages["основание"], 0, 0, tank.w, tank.h);
  ctx.drawImage(loadedImages["двигатель_трансмиссия"], -1, 7, 61, 19);
  ctx.drawImage(loadedImages["боезапас"], 19, 10, 7, 13);
  ctx.drawImage(loadedImages["механизм_башни"], 29, 10, 13, 13);
  ctx.drawImage(loadedImages["крышка"], 1, 7, 64, 19);
  ctx.restore();

  for (const box of tank.hBoxes) {
    ctx.fillStyle = "rgba(102, 204, 102, 0.7)";

    ctx.strokeStyle = "rgba(0, 0, 0, 0.5)";
    ctx.lineWidth = 0.1;
    ctx.fillRect(
      tank.x - tank.w / 2 + box.x,
      tank.y - tank.h / 2 + box.y,
      box.w,
      box.h
    );
    ctx.strokeRect(
      tank.x - tank.w / 2 + box.x,
      tank.y - tank.h / 2 + box.y,
      box.w,
      box.h
    );

    if (box.lines) {
      const scal = 100;
      ctx.strokeStyle = "red";
      ctx.lineWidth = 0.1;
      for (const line of box.lines) {
        ctx.save();
        ctx.translate(line.origin.x, line.origin.y);
        ctx.beginPath();
        ctx.moveTo(0 - line.direction.x * scal, 0 - line.direction.y * scal);
        ctx.lineTo(line.direction.x * scal, line.direction.y * scal);
        ctx.closePath();
        ctx.stroke();
        ctx.restore();
      }
    }

    if (box.corners) {
      ctx.fillStyle = "red";
      for (const corner of box.corners) {
        ctx.save();
        ctx.translate(corner.x, corner.y);
        ctx.beginPath();
        ctx.arc(0, 0, 0.4, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
        ctx.restore();
      }
    }
  }

  for (const shell of shells) {
    if (!shell.active) {
      continue;
    }

    for (const box of tank.hBoxes) {
      const b = { ...box };

      b.x += tank.x;
      b.y += tank.y;

      // CHECK COLLISIONS

      ///////////////////
    }

    ctx.fillStyle = "red";
    for (const corner of shell.corners) {
      ctx.save();
      ctx.translate(corner.x, corner.y);
      ctx.beginPath();
      ctx.arc(0, 0, 0.4, 0, 2 * Math.PI);
      ctx.fill();
      ctx.closePath();
      ctx.restore();
    }

    // shell.x += shell.dir.x * (shellSpeed * dt);
    // shell.y += shell.dir.y * (shellSpeed * dt);

    ctx.save();
    ctx.translate(shell.x, shell.y);
    ctx.rotate(shell.r);
    ctx.drawImage(
      loadedImages["shell_1"],
      0 - loadedImages["shell_1"].width / 2,
      0 - loadedImages["shell_1"].height / 2
    );
    ctx.restore();

    ctx.lineWidth = 0.1;
    ctx.strokeStyle = "red";

    const scal = 100;
    for (const line of shell.lines) {
      ctx.save();
      ctx.translate(shell.x, shell.y);

      ctx.beginPath();
      ctx.moveTo(0 - line.direction.x * scal, 0 - line.direction.y * scal);
      ctx.lineTo(line.direction.x * scal, line.direction.y * scal);
      ctx.stroke();
      ctx.closePath();

      ctx.restore();
    }
  }

  ctx.translate(
    tank.x - tank.w / 2 + tank.w / 2,
    tank.y - tank.h / 2 + tank.h / 2
  );
  ctx.rotate(currentAngle);

  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(
    loadedImages["turret"],
    -tank.turret.w / 2 + tank.turret.x,
    -tank.turret.h / 2,
    tank.turret.w,
    tank.turret.h
  );
  ctx.imageSmoothingEnabled = false;

  ctx.setTransform(1, 0, 0, 1, 0, 0);

  requestAnimationFrame(loop);
}

async function start() {
  await loadResources();

  document.body.appendChild(canvasElem);

  requestAnimationFrame(loop);
}

start();
