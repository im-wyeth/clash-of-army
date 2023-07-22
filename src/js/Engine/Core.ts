import IActorRenderer from "./Interfaces/IActorsRenderer";
import ILoop from "./Interfaces/ILoop";
import IRenderer from "./Interfaces/IRenderer";
import ISceneManager from "./Interfaces/ISceneManager";

export class Core {
  constructor(
    private readonly _loop: ILoop,
    private readonly _sceneManager: ISceneManager,
    private readonly _actorsRenderer: IActorRenderer,
    private readonly _renderer: IRenderer
  ) {
    _sceneManager.loadScene("world");

    _loop.init();
    _loop.onUpdate(this.update.bind(this));
    _loop.onRender(this.render.bind(this));
  }

  getLoop() {
    return this._loop;
  }

  getRenderer() {
    return this._renderer;
  }

  update(timeStep: number): void {
    const currentScene = this._sceneManager.getCurrentScene();

    if (currentScene) {
      const actors = currentScene.getActors();

      for (const actor of actors) {
        const components = actor.getComponents();

        for (const component of components) {
          if (component.update) {
            component.update(timeStep);
          }
        }

        if (actor.update) actor.update(timeStep);
      }
    }
  }

  render(interpolationValue: number): void {
    const currentScene = this._sceneManager.getCurrentScene();

    if (!currentScene) {
      return;
    }

    if (this._renderer.start) {
      this._renderer.setScaling(currentScene.getCamera().getZoom());
      this._renderer.start(currentScene.getCamera().getLeftTopCorner());
    }

    const actors = currentScene.getActors();

    for (const actor of actors) {
      if (actor.isVisible()) this._actorsRenderer.renderActor(actor);
    }

    if (this._renderer.end) {
      this._renderer.end();
    }
  }
}
