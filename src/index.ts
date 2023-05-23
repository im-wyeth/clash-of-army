import "./styles/styles.css";

import Engine from "./js/Engine/Engine";
import { CANVAS_SIZE, LOOP_TIME_STEP } from "./js/Configs";
import Loop from "./js/Engine/Loop";
import SceneManager from "./js/Engine/Managers/SceneManager";
import WorldScene from "./js/Scenes/WorldScene";
import MenuScene from "./js/Scenes/MenuScene";
import CanvasRenderer from "./js/CanvasRenderer";
import Tank from "./js/World/Entities/Tank";
import TankTurret from "./js/World/Entities/TankTurret";

const canvas = document.createElement("canvas");
canvas.width = CANVAS_SIZE.WIDTH;
canvas.height = CANVAS_SIZE.HEIGHT;
canvas.classList.add("canvas");

function main() {
  const turret = new TankTurret();
  const tank = new Tank(turret);

  // tank.addAction("fire", new TankFireAction())
  // tank.addAction("rotate", new TankRotateAction());
  // tank.addAction("moveTo", new TankMoveToAction());

  const menuScene = new MenuScene();
  const worldScene = new WorldScene();

  worldScene.addActor(tank);

  const sceneManager = new SceneManager();
  sceneManager.addScene(menuScene);
  sceneManager.addScene(worldScene);
  sceneManager.loadScene("world");

  const renderer = new CanvasRenderer(canvas);

  new Engine(new Loop(LOOP_TIME_STEP), renderer, sceneManager);

  document.body.appendChild(canvas);
}

main();
