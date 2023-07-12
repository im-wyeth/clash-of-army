import DetailAbstraction from "../../Abstractions/DefaultTank/DetailAbstraction";
import { ActorComponents } from "../../Engine";
import IVector2 from "../../Engine/Interfaces/IVector2";

export class Turret extends DetailAbstraction {
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
