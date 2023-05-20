import "./styles/styles.css";

import Engine from "./js/Engine/Engine";
import { CANVAS_SIZE, LOOP_TIME_STEP } from "./js/Configs";
import Loop from "./js/Engine/Loop";
import SceneManager from "./js/Engine/Managers/SceneManager";
import GameScene from "./js/Scenes/WorldScene";
import MenuScene from "./js/Scenes/MenuScene";
import CanvasRenderer from "./js/CanvasRenderer";

const canvas = document.createElement("canvas");
canvas.width = CANVAS_SIZE.WIDTH;
canvas.height = CANVAS_SIZE.HEIGHT;
canvas.classList.add("canvas");

function main() {
  const sceneManager = new SceneManager();
  sceneManager.addScene(new GameScene());
  sceneManager.addScene(new MenuScene());

  const renderer = new CanvasRenderer(canvas);

  const engine = new Engine(new Loop(LOOP_TIME_STEP), renderer, sceneManager);

  document.body.appendChild(canvas);
}

main();
