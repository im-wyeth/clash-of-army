import { CANVAS_SIZE } from "./Configs";
import Renderer from "./Renderer";
import Camera from "./Camera";
import ResourceManager from "./ResourceManager";
import WorldEffectManager from "./WorldEffectManager";
import WorldEntityManager from "./WorldEntityManager";
import WorldMap from "./WorldMap";
import GameLoop from "./GameLoop";
import EventManager from "./EventManager";
import ComputerControlling from "./ComputerControlling";

export default class Game {
  constructor(gameWorldCanvas, gameCanvas) {
    this.gameWorldRenderer = new Renderer(gameWorldCanvas);
    this.gameRenderer = new Renderer(gameCanvas);
    this.camera = new Camera(CANVAS_SIZE.WIDTH, CANVAS_SIZE.HEIGHT);

    this.resourceManager = new ResourceManager();
    this.worldEffectManager = new WorldEffectManager(this);
    this.worldEntityManager = new WorldEntityManager(this);

    this.eventManager = new EventManager();

    this.worldMap = new WorldMap(this);

    this.gameLoop = new GameLoop(this, this.gameRenderer);

    this.ComputerControlling = new ComputerControlling(this);
  }

  getGameRenderer() {
    return this.gameRenderer;
  }

  getCamera() {
    return this.camera;
  }

  getResourceManager() {
    return this.resourceManager;
  }

  getWorldEffectManager() {
    return this.worldEffectManager;
  }

  getWorldEntityManager() {
    return this.worldEntityManager;
  }

  getWorldMap() {
    return this.worldMap;
  }

  getEventManager() {
    return this.eventManager;
  }

  play() {
    this.worldMap.render(this.gameWorldRenderer);

    this.gameLoop.start();
  }
}
