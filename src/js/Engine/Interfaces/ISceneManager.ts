import IScene from "./IScene";

export default interface ISceneManager {
  getCurrentScene(): null | IScene;

  addScene(scene: IScene): void;

  loadScene(name: string): void;
}
