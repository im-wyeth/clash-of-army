import IActorRenderer from "../Interfaces/IActorsRenderer";
import ILoop from "../Interfaces/ILoop";
import IRenderer from "../Interfaces/IRenderer";
import ISceneManager from "../Interfaces/ISceneManager";

export default class Engine {
  constructor(
    private readonly _loop: ILoop,
    private readonly _sceneManager: ISceneManager,
    private readonly _actorsRenderer: IActorRenderer
  ) {
    _sceneManager.loadScene("world");

    _loop.init();
    _loop.onUpdate(this.update.bind(this));
    _loop.onRender(this.render.bind(this));
  }

  update(timeStep: number): void {}

  render(interpolationValue: number): void {
    const currentScene = this._sceneManager.getCurrentScene();

    if (currentScene) {
      const actors = currentScene.getActors();

      for (const actor of actors) {
        this._actorsRenderer.renderActor(actor);
      }
    }
  }
}
