import Actor from "../Engine/Actor";
import IActor from "../Interfaces/IActor";

export default class Tank extends Actor {
  private _turret: null | IActor = null;

  constructor() {
    super();
  }

  setTurret(turret: IActor): void {
    this._turret = turret;
  }

  update(timeStep: number): void {}
}
