import { ActorComponents } from "../../Engine";
import IVector2 from "../../Engine/Interfaces/IVector2";
import { Detail } from "./Detail";

export class Turret extends Detail {
  constructor(positionOnTank: IVector2) {
    super(positionOnTank);
  }

  rotateTo(point: IVector2): void {
    const rotation = this.getComponent(ActorComponents.Rotation);

    if (rotation) {
      rotation.lookAt(point);
    }
  }
}
