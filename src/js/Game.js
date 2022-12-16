import { CANVAS_SIZE } from "./Configs";
import Renderer from "./Renderer";
import Camera from "./Camera";
import ResourceManager from "./ResourceManager";
import EffectManager from "./EffectManager";
import WorldEntityManager from "./WorldEntityManager";
import MainLoop from "./MainLoop";

export default class Game {
  constructor(canvas) {
    this.renderer = new Renderer(canvas);
    this.camera = new Camera(CANVAS_SIZE.WIDTH, CANVAS_SIZE.HEIGHT);

    this.resourceManager = new ResourceManager();
    this.effectManager = new EffectManager(this);
    this.worldEntityManager = new WorldEntityManager(this);

    this.mainLoop = new MainLoop(this, this.renderer);

    this.renderer.antialiasing(false);
  }

  getCamera() {
    return this.camera;
  }

  getResourceManager() {
    return this.resourceManager;
  }

  getEffectManager() {
    return this.effectManager;
  }

  getWorldEntityManager() {
    return this.worldEntityManager;
  }

  play() {
    this.mainLoop.start();
  }
}
