import IScene from "../Interfaces/IScene";

export default class MenuScene implements IScene {
  private readonly _name = "menu";

  constructor() {}

  getName(): string {
    return this._name;
  }
}
