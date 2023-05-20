import { CANVAS_SIZE } from "./Configs";
import { Camera, EventManager } from "@nexty-org/core";
import Renderer from "./CanvasRenderer";
import ResourceManager from "./ResourceManager";
import World from "./World";
import GameLoop from "./GameLoop";
import ComputerControlling from "./ComputerControlling";
import WorldEntityManager from "./WorldEntityManager";
import WorldEffectManager from "./WorldEffectManager";

export default class Game {
  constructor(gameCanvas) {
    this.gameRenderer = new Renderer(gameCanvas);
    this.camera = new Camera(CANVAS_SIZE.WIDTH, CANVAS_SIZE.HEIGHT);

    this.resourceManager = new ResourceManager();
    this.eventManager = new EventManager([
      "click",
      "mousemove",
      "keydown",
      "keyup",
    ]);

    this.world = new World(this);
    this.worldEntityManager = new WorldEntityManager(this);
    this.worldEffectManager = new WorldEffectManager(this);

    this.computerControlling = new ComputerControlling(this);

    this.gameLoop = new GameLoop(this, this.gameRenderer);
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

  getWorldEntityManager() {
    return this.worldEntityManager;
  }

  getWorldEffectManager() {
    return this.worldEffectManager;
  }

  getWorld() {
    return this.world;
  }

  getEventManager() {
    return this.eventManager;
  }

  play() {
    this.gameLoop.start();
  }
}
