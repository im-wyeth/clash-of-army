import ILoop from "../Interfaces/ILoop";
import IRenderer from "../Interfaces/IRenderer";
import ISceneManager from "../Interfaces/ISceneManager";

export default class Engine {
  constructor(
    private readonly _loop: ILoop,
    private readonly _renderer: IRenderer,
    private readonly _sceneManager: ISceneManager
  ) {
    _sceneManager.loadScene("world");

    _loop.init();
    _loop.onUpdate(this.update);
    _loop.onRender(this.render);
  }

  update(timeStep: number): void {}

  render(interpolationValue: number): void {}
}
