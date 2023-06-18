import TankAbstraction from "../Abstractions/TankAbstraction";
import IActor from "../Interfaces/IActor";

export default class Tank extends TankAbstraction {
  private _turret: null | IActor = null;

  constructor() {
    super();
  }

  setTurret(turret: IActor): void {
    this._turret = turret;
  }

  update(timeStep: number): void {
    if (this._acceleration) {
      this._acceleration.setForce(1000);
    }
  }

  fire(): void {}

  moveTo(): void {}

  rotateTo(): void {}
}
