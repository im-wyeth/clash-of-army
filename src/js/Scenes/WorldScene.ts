import IScene from "../Interfaces/IScene";

export default class WorldScene implements IScene {
  private readonly _name = "world";

  constructor() {}

  getName(): string {
    return this._name;
  }
}
