import IScene from "../Interfaces/IScene";
import ISceneManager from "../Interfaces/ISceneManager";

export class SceneManager implements ISceneManager {
  private _scenes: Array<IScene> = [];
  private _currentScene: null | IScene = null;

  constructor() {}

  getCurrentScene(): null | IScene {
    return this._currentScene;
  }

  addScene(scene: IScene) {
    this._scenes.push(scene);
  }

  loadScene(name: string) {
    this.closeCurrentScene();

    this._currentScene = this._scenes.find((s) => s.getName() === name) || null;

    if (this._currentScene)
      if (this._currentScene.onLoad) this._currentScene.onLoad();
  }

  closeCurrentScene(): void {
    if (this._currentScene) {
      if (this._currentScene.onDestroy) this._currentScene.onDestroy();

      this._currentScene = null;
    }
  }
}
