import IActor from "../Interfaces/IActor";
import ICamera from "../Interfaces/ICamera";
import IScene from "../Interfaces/IScene";

export default class Scene implements IScene {
  protected _name = "scene";

  protected readonly _camera: ICamera;

  protected readonly _actors: Array<IActor> = [];

  constructor(camera: ICamera) {
    this._camera = camera;
  }

  getCamera(): ICamera {
    return this._camera;
  }

  getName(): string {
    return this._name;
  }

  getActors(): IActor[] {
    return this._actors;
  }

  addActor(actor: IActor) {
    this._actors.push(actor);
  }
}
