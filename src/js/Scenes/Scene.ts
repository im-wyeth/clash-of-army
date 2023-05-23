import IActor from "../Interfaces/IActor";
import IScene from "../Interfaces/IScene";

export default class Scene implements IScene {
  protected _name = "scene";

  private readonly _actors: Array<IActor> = [];

  constructor() {}

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
