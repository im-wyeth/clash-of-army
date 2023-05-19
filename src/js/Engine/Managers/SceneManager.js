import MenuScene from "../Scenes/MenuScene";
import GameScene from "../Scenes/GameScene";

export default class SceneManager {
  constructor(core) {
    this._scenes = [new MenuScene(core), new GameScene(core)];

    this._currentScene = this._scenes[0];
  }

  loadScene(name) {
    this._currentScene =
      this._scenes.find((s) => s.getName() === name) || this._scenes[0];
  }
}
