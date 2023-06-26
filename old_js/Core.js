import SceneManager from "./Managers/SceneManager";
import ResourceManager from "./ResourceManager";
import Renderer from "./CanvasRenderer";

import { SPRITES } from "./Configs";

export default class Core {
  constructor(canvas) {
    this._sceneManager = new SceneManager(this);
    this._resourceManager = new ResourceManager();

    this._renderer = new Renderer(canvas);
  }

  getRenderer() {
    return this._renderer;
  }

  async init() {
    await this._resourceManager.loadSprites(SPRITES);

    this._sceneManager.loadScene("menu");
  }
}
