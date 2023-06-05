import "./styles/styles.css";

import Engine from "./js/Engine/Engine";
import { CANVAS_SIZE, LOOP_TIME_STEP } from "./js/Configs";
import Loop from "./js/Engine/Loop";
import SceneManager from "./js/Engine/Managers/SceneManager";
import WorldScene from "./js/Scenes/WorldScene";
import MenuScene from "./js/Scenes/MenuScene";
import CanvasRenderer from "./js/CanvasRenderer";
import ActorsRenderer from "./js/Engine/ActorsRenderer";
import ResourceManager from "./js/Engine/Managers/ResourceManager";
import ImageLoader from "./js/ImageLoader";
import SpriteSheetLoadInfo from "./js/SpriteSheetLoadInfo";
import TankBuilder from "./js/Builders/TankBuilder";
import ActorSpriteComponentBuilder from "./js/Builders/ActorSpriteComponentBuilder";
import TankTurretBuilder from "./js/Builders/TankTurretBuilder";

const canvas = document.createElement("canvas");
canvas.width = CANVAS_SIZE.WIDTH;
canvas.height = CANVAS_SIZE.HEIGHT;
canvas.classList.add("canvas");

async function main() {
  const actorSpriteComponentBuilder = new ActorSpriteComponentBuilder();
  const tankTurretBuilder = new TankTurretBuilder();
  const tankBuilder = new TankBuilder();

  const turret = tankTurretBuilder
    .setPosition(165, 150)
    .setSpriteComponent(
      actorSpriteComponentBuilder
        .setSpriteSheetName("tank")
        .setSize(65, 24)
        .setSource(59, 0)
        .setOrigin(15, 24 / 2)
        .build()
    )
    .build();

  const tank = tankBuilder
    .setPosition(150, 150)
    .setSpriteComponent(
      actorSpriteComponentBuilder
        .setSpriteSheetName("tank")
        .setSize(59, 34)
        .setSource(0, 0)
        .setOrigin(59 / 2, 34 / 2)
        .build()
    )
    .setTurret(turret)
    .build();

  const resourceManager = new ResourceManager(new ImageLoader());
  await resourceManager.loadSpriteSheets([
    new SpriteSheetLoadInfo("tank", "../assets/tank.png"),
  ]);

  const canvasRenderer = new CanvasRenderer(canvas);
  const actorsRenderer = new ActorsRenderer(canvasRenderer, resourceManager);

  const menuScene = new MenuScene();
  const worldScene = new WorldScene();

  worldScene.addActor(tank);
  worldScene.addActor(turret);

  const sceneManager = new SceneManager();
  sceneManager.addScene(menuScene);
  sceneManager.addScene(worldScene);
  sceneManager.loadScene("world");

  new Engine(
    new Loop(LOOP_TIME_STEP),
    sceneManager,
    actorsRenderer,
    canvasRenderer
  );

  document.body.appendChild(canvas);
}

main();
