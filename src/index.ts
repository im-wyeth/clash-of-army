import "./styles/styles.css";

import * as Engine from "./js/Engine";

import {
  CANVAS_SIZE,
  LOOP_TIME_STEP,
  TANKS_DATA_JSON_NAME,
  WORLD_ENTITY_DATA_PATH,
} from "./js/ClientConfig";

import WorldScene from "./js/Scenes/WorldScene";
import MenuScene from "./js/Scenes/MenuScene";
import ActorSpriteComponentBuilder from "./js/Builders/ActorSpriteComponentBuilder";
import WorldEntityDataLoader from "./js/WorldEntityDataLoader";
import WorldEntityDataConverter from "./js/WorldEntityDataConverter";
import PlayerTankControlling from "./js/PlayerTankControlling";
import ActorAccelerationComponentBuilder from "./js/Builders/ActorAccelerationComponentBuilder";
import ActorRotationComponentBuilder from "./js/Builders/ActorRotationComponentBuilder";
import Tank from "./js/WorldEntities/Tank";
import TankTurret from "./js/WorldEntities/TankTurret";
import ActorShapeComponentBuilder from "./js/Builders/ActorShapeComponentBuilder";
import TankEngine from "./js/WorldEntities/TechnicalDetails/TankEngine";

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
  const worldEntityDataConverter = new WorldEntityDataConverter(vector2Manager);

  const tanksData = await worldEntityDataLoader.getTanksData();

  const tankData = worldEntityDataConverter.tankDataToModel(tanksData[1]);
  const tankTurretData = tankData.tankTurretData;

  const turret = new TankTurret(vector2Manager.getNew(44.5, 17));

  turret.setComponent(
    actorSpriteComponentBuilder
      .setSpriteSheetName(tankTurretData.spriteData.sheetName)
      .setSize(tankTurretData.spriteData.size)
      .setSource(tankTurretData.spriteData.source)
      .setOrigin(tankTurretData.spriteData.origin)
      .build(turret)
  );
  turret.setComponent(
    actorRotationComponentBuilder
      .setRotationSpeed(tankTurretData.rotationSpeed)
      .build(turret)
  );

  const tank = new Tank(vector2Manager);
  tank.setPosition(vector2Manager.getNew(150, 150));
  tank.setRotationSpeed(tankData.rotationSpeed);
  tank.setTurret(turret);

  const tankEngine = new TankEngine(vector2Manager.getNew(7 + 4.5, 11 + 6));
  tankEngine.setComponent(
    actorShapeComponentBuilder
      .createRectangle(vector2Manager.getNew(9, 12))
      .build(tank)
  );

  tank.setEngine(tankEngine);

  tank.setComponent(
    actorSpriteComponentBuilder
      .setSpriteSheetName(tankData.spriteData.sheetName)
      .setSize(tankData.spriteData.size)
      .setSource(tankData.spriteData.source)
      .setOrigin(tankData.spriteData.origin)
      .build(tank)
  );

  tank.setComponent(
    actorAccelerationComponentBuilder
      .setMass(3000)
      .addActingForce(0.09)
      .build(tank)
  );

  const camera = new Engine.Camera(
    vector2Manager.getNew(CANVAS_SIZE.WIDTH, CANVAS_SIZE.HEIGHT)
  );
  camera.lookAt(tank);

  const menuScene = new MenuScene(camera);
  const worldScene = new WorldScene(camera);
  worldScene.addActor(tank);
  worldScene.addActor(tankEngine);
  worldScene.addActor(turret);

  const eventManager = new Engine.Managers.EventManager(window);
  const inputKeyHandler = new Engine.Input.InputKeyHandler(eventManager);
  const mouseHandler = new Engine.Input.MouseHandler(
    eventManager,
    worldScene.getCamera()
  );

  const resourceManager = new Engine.Managers.ResourceManager(
    new Engine.Net.ImageLoader()
  );
  await resourceManager.loadSpriteSheets([
    new Engine.SpriteSheetLoadInfo("tanks", "../assets/tanks.png"),
  ]);

  const canvasRenderer = new Engine.Render.CanvasRenderer(
    canvas,
    vector2Manager
  );
  const actorsRenderer = new Engine.Render.ActorsRenderer(
    canvasRenderer,
    resourceManager
  );

  const sceneManager = new Engine.Managers.SceneManager();
  sceneManager.addScene(menuScene);
  sceneManager.addScene(worldScene);
  sceneManager.loadScene("world");

  const engine = new Engine.Core(
    new Engine.Loop(LOOP_TIME_STEP),
    sceneManager,
    actorsRenderer,
    canvasRenderer
  );

  const tankControlling = new PlayerTankControlling(
    tank,
    inputKeyHandler,
    mouseHandler
  );

  engine.getLoop().onUpdate(tankControlling.update.bind(tankControlling));
  engine.getRenderer().antialiasing(false);

  document.body.appendChild(canvas);
}

main();
