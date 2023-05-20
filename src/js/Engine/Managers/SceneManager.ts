import IScene from "../../Interfaces/IScene";
import ISceneManager from "../../Interfaces/ISceneManager";

export default class SceneManager implements ISceneManager {
  private _scenes: Array<IScene>;
  private _currentScene: IScene | null;

  constructor() {
    this._scenes = [];

    this._currentScene = null;
  }

  getCurrentScene(): IScene | null {
    return this._currentScene;
  }

  addScene(scene: IScene) {
    this._scenes.push(scene);
  }

  loadScene(name: string) {
    this._currentScene = this._scenes.find((s) => s.getName() === name) || null;
  }
}
