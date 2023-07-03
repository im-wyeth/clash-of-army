import TankTurretAbstraction from "../Abstractions/TankTurretAbstraction";
import { ActorComponents } from "../Engine/";
import IVector2 from "../Engine/Interfaces/IVector2";

export default class TankTurret extends TankTurretAbstraction {
  constructor(private readonly _positionOnTank: IVector2) {
    super();
  }

  getPositionOnTank(): IVector2 {
    return this._positionOnTank;
  }

  rotateTo(point: IVector2): void {
    const rotation = this.getComponent(ActorComponents.Rotation);

    if (rotation) {
      rotation.lookAt(point);
    }
  }
}
