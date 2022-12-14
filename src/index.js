import "./styles/styles.css";

import { ANIMATIONS, CANVAS_SIZE } from "./js/Configs";

import Renderer from "./js/Renderer";
import Camera from "./js/Camera";
import EffectsEmitter from "./js/EffectsEmitter";
import Tank from "./js/Tank";

const canvasElem = document.createElement("canvas");
canvasElem.width = CANVAS_SIZE.WIDTH;
canvasElem.height = CANVAS_SIZE.HEIGHT;

const sprites = [
  {
    name: "tanks",
    src: "../assets/tank-sprites.png",
  },
  {
    name: "icons",
    src: "../assets/icon-sprites.png",
  },
  {
    name: "effects",
    src: "../assets/effect-sprites.png",
  },
];

// Примерный вид информации о танке (Будет использоваться JSON)
const tank_1_data = {
  w: 86,
  h: 52,
  img_data: {
    x: 0,
    y: 0,
  },
  turret: {
    w: 83,
    h: 36,
    img_data: {
      x: 86,
      y: 0,
    },
    animations: {
      fire: [
        { x: 0, y: 52, w: 71, h: 36 },
        { x: 71, y: 52, w: 74, h: 36 },
        { x: 145, y: 52, w: 77, h: 36 },
        { x: 222, y: 52, w: 80, h: 36 },
      ],
    },
  },
  details: [
    { type: "гусеница", x: 0, y: 0, w: 84, h: 9 },
    { type: "гусеница", x: 0, y: 260, w: 84, h: 9 },
    { type: "двигатель", x: 3, y: 12, w: 20, h: 28 },
    { type: "боеукладка", x: 23, y: 12, w: 20, h: 28 },
    { type: "механизм_башни", x: 43, y: 12, w: 20, h: 28 },
    { type: "трансмиссия", x: 63, y: 12, w: 20, h: 28 },
  ],
};

const effects_data = {
  turret_fire: {
    frames: [
      { x: 0, y: 0, w: 67, h: 25 },
      { x: 67, y: 0, w: 36, h: 25 },
      { x: 103, y: 0, w: 30, h: 25 },
      { x: 133, y: 0, w: 15, h: 25 },
    ],
  },
};

const renderer = new Renderer(canvasElem);
const effectsEmitter = new EffectsEmitter(effects_data);
const camera = new Camera(canvasElem.width, canvasElem.height);

const loadedSprites = {};
const tanks = [];

function loadSprites() {
  let alreadyLoaded = 0;

  return new Promise((resolve) => {
    for (const img of sprites) {
      const image = new Image();
      image.src = img.src;

      image.onload = () => {
        loadedSprites[img.name] = image;

        alreadyLoaded++;
        if (alreadyLoaded >= sprites.length) {
          resolve();
        }
      };
    }
  });
}

let lastDt = Date.now();

function loop() {
  const dt = Date.now() - lastDt;
  lastDt = Date.now();

  renderer.getCtx().save();
  renderer.getCtx().clearRect(0, 0, CANVAS_SIZE.WIDTH, CANVAS_SIZE.HEIGHT);
  renderer.getCtx().scale(camera.zoom, camera.zoom);

  const cameraPosition = camera.getPosition();
  renderer.getCtx().translate(-cameraPosition.x, -cameraPosition.y);

  for (const tank of tanks) {
    tank.update(dt);
    tank.render(renderer, loadedSprites);
  }

  effectsEmitter.update(dt);
  effectsEmitter.render(renderer, loadedSprites);

  camera.update(dt);
  renderer.getCtx().restore();

  requestAnimationFrame(loop);
}

async function start() {
  await loadSprites();

  renderer.antialiasing(false);

  const tank = new Tank(true, effectsEmitter);
  tank.setSize(tank_1_data.w, tank_1_data.h);
  tank.setPosition(250, 250);
  tank.getTurret().updatePositionOnTank();
  tank.setSpritePosition(tank_1_data.img_data.x, tank_1_data.img_data.y);

  tank.getTurret().setSize(tank_1_data.turret.w, tank_1_data.turret.h);
  tank
    .getTurret()
    .setSpritePosition(
      tank_1_data.turret.img_data.x,
      tank_1_data.turret.img_data.y
    );
  tank
    .getTurret()
    .addAnimation(ANIMATIONS.TURRET_FIRE, tank_1_data.turret.animations.fire);

  tanks.push(tank);

  window.addEventListener("click", () => {
    tank.fire();
  });

  camera.lookAt(tank);

  document.body.appendChild(canvasElem);

  requestAnimationFrame(loop);
}

start();
