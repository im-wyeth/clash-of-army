import "./styles/styles.css";

import * as Engine from "./js/Engine";

import {
  CANVAS_SIZE,
  FRICTION_FORCE,
  LOOP_TIME_STEP,
  TANKS_DATA_JSON_NAME,
  WORLD_ENTITY_DATA_PATH,
} from "./js/ClientConfig";

import WorldScene from "./js/Scenes/WorldScene";
import MenuScene from "./js/Scenes/MenuScene";
import ActorSpriteComponentBuilder from "./js/Builders/ActorSpriteComponentBuilder";
import WorldEntityDataLoader from "./js/WorldEntityDataLoader";
import PlayerDefaultTankControlling from "./js/PlayerDefaultTankControlling";
import ActorAccelerationComponentBuilder from "./js/Builders/ActorAccelerationComponentBuilder";
import ActorRotationComponentBuilder from "./js/Builders/ActorRotationComponentBuilder";
import ActorShapeComponentBuilder from "./js/Builders/ActorShapeComponentBuilder";
import DefaultTankBuilder from "./js/Builders/DefaultTankBuilder";
import { TankDetailBuilder } from "./js/Builders/TankDetailBuilder";

async function main() {
  const canvas = document.createElement("canvas");
  canvas.width = CANVAS_SIZE.WIDTH;
  canvas.height = CANVAS_SIZE.HEIGHT;
  canvas.classList.add("canvas");

  const vector2Manager = new Engine.Managers.Vector2Manager();

  const actorSpriteComponentBuilder = new ActorSpriteComponentBuilder();
  const actorAccelerationComponentBuilder =
    new ActorAccelerationComponentBuilder();
  const actorRotationComponentBuilder = new ActorRotationComponentBuilder();
  const actorShapeComponentBuilder = new ActorShapeComponentBuilder();

  const worldEntityDataLoader = new WorldEntityDataLoader(
    new Engine.Net.FetchClient(),
    WORLD_ENTITY_DATA_PATH,
    TANKS_DATA_JSON_NAME
  );

  // Camera init
  const camera = new Engine.Camera(
    vector2Manager.getNew(CANVAS_SIZE.WIDTH, CANVAS_SIZE.HEIGHT)
  );

  // Scenes init
  const sceneManager = new Engine.Managers.SceneManager();

  const menuScene = new MenuScene(camera);
  const worldScene = new WorldScene(camera);

  sceneManager.addScene(menuScene);
  sceneManager.addScene(worldScene);
  sceneManager.loadScene("world");

  // Input init
  const eventManager = new Engine.Managers.EventManager(window);
  const inputKeyHandler = new Engine.Input.InputKeyHandler(eventManager);
  const mouseHandler = new Engine.Input.MouseHandler(
    eventManager,
    worldScene.getCamera()
  );

  // Loading resources
  const resourceManager = new Engine.Managers.ResourceManager(
    new Engine.Net.ImageLoader()
  );
  await resourceManager.loadSpriteSheets([
    new Engine.SpriteSheetLoadInfo("tanks", "../assets/tanks.png"),
  ]);

  // Renderers init
  const canvasRenderer = new Engine.Render.CanvasRenderer(
    canvas,
    vector2Manager
  );
  const actorsRenderer = new Engine.Render.ActorsRenderer(
    canvasRenderer,
    resourceManager
  );

  // Init Core
  const engine = new Engine.Core(
    new Engine.Loop(LOOP_TIME_STEP),
    sceneManager,
    actorsRenderer,
    canvasRenderer
  );
  engine.getRenderer().antialiasing(false);

  // Load entity data
  const tanksData = await worldEntityDataLoader.getTanksData();

  // Creating game entities
  const tankDetailBuilder = new TankDetailBuilder(
    vector2Manager,
    actorSpriteComponentBuilder,
    actorShapeComponentBuilder,
    actorRotationComponentBuilder
  );
  const tankBuilder = new DefaultTankBuilder(
    vector2Manager,
    tankDetailBuilder,
    actorSpriteComponentBuilder,
    actorAccelerationComponentBuilder,
    FRICTION_FORCE
  );

  const playerTank = tankBuilder.getTank(tanksData[1]);

  worldScene.addActor(playerTank);
  worldScene.addActor(playerTank.getTurret());
  worldScene.addActor(playerTank.getEngine());
  worldScene.addActor(playerTank.getRightCaterpillar());
  worldScene.addActor(playerTank.getLeftCaterpillar());

  camera.setZoom(vector2Manager.getNew(10, 10));
  camera.lookAt(playerTank);

  // Init Player Controlling
  const tankControlling = new PlayerDefaultTankControlling(
    playerTank,
    inputKeyHandler,
    mouseHandler
  );
  engine.getLoop().onUpdate(tankControlling.update.bind(tankControlling));

  // Adding canvas
  document.body.appendChild(canvas);
}

main();
