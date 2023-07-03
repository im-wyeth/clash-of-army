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
import TankBuilder from "./js/Builders/TankBuilder";
import ActorSpriteComponentBuilder from "./js/Builders/ActorSpriteComponentBuilder";
import TankTurretBuilder from "./js/Builders/TankTurretBuilder";
import WorldEntityDataLoader from "./js/WorldEntityDataLoader";
import WorldEntityDataConverter from "./js/WorldEntityDataConverter";
import PlayerTankControlling from "./js/PlayerTankControlling";
import ActorAccelerationComponentBuilder from "./js/Builders/ActorAccelerationComponentBuilder";
import ActorRotationComponentBuilder from "./js/Builders/ActorRotationComponentBuilder";
import Tank from "./js/WorldEntities/Tank";
import TankTurret from "./js/WorldEntities/TankTurret";

async function main() {
  const canvas = document.createElement("canvas");
  canvas.width = CANVAS_SIZE.WIDTH;
  canvas.height = CANVAS_SIZE.HEIGHT;
  canvas.classList.add("canvas");

  const vector2Manager = new Engine.Managers.Vector2Manager();
  const mathUtils = new Engine.MathUtils();

  const actorSpriteComponentBuilder = new ActorSpriteComponentBuilder();
  const actorAccelerationComponentBuilder =
    new ActorAccelerationComponentBuilder();
  const actorRotationComponentBuilder = new ActorRotationComponentBuilder();

  // const tankTurretBuilder = new TankTurretBuilder();
  // const tankBuilder = new TankBuilder();

  const worldEntityDataLoader = new WorldEntityDataLoader(
    new Engine.Net.FetchClient(),
    WORLD_ENTITY_DATA_PATH,
    TANKS_DATA_JSON_NAME
  );
  const worldEntityDataConverter = new WorldEntityDataConverter(vector2Manager);

  const tanksData = await worldEntityDataLoader.getTanksData();

  const tankData = worldEntityDataConverter.tankDataToModel(tanksData[1]);
  const tankTurretData = tankData.getTurretData();

  const turret = new TankTurret();
  turret.setPosition(vector2Manager.getNew(165, 150));

  turret.setComponent(
    actorSpriteComponentBuilder
      .setSpriteSheetName(tankTurretData.getSpriteData().getSheetName())
      .setSize(tankTurretData.getSpriteData().getSize())
      .setSource(tankTurretData.getSpriteData().getSource())
      .setOrigin(tankTurretData.getSpriteData().getOrigin())
      .build(turret)
  );
  turret.setComponent(
    actorRotationComponentBuilder
      .setRotationSpeed(tankTurretData.getRotationSpeed())
      .build(turret)
  );

  const tank = new Tank(vector2Manager);
  tank.setPosition(vector2Manager.getNew(150, 150));
  tank.setRotationSpeed(tankData.getRotationSpeed());
  tank.setTurret(turret);

  tank.setComponent(
    actorSpriteComponentBuilder
      .setSpriteSheetName(tankData.getSpriteData().getSheetName())
      .setSize(tankData.getSpriteData().getSize())
      .setSource(tankData.getSpriteData().getSource())
      .setOrigin(tankData.getSpriteData().getOrigin())
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

  document.body.appendChild(canvas);
}

main();
