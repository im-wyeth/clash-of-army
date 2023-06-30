import TankTurretAbstraction from "../Abstractions/TankTurretAbstraction";
import ActorRotationComponent from "../ActorComponents/ActorRotationComponent";
import IVector2 from "../Interfaces/IVector2";

export default class TankTurret extends TankTurretAbstraction {
  constructor() {
    super();
  }

  rotateTo(point: IVector2): void {
    const rotation = this.getComponent(ActorRotationComponent);

    if (rotation) {
      rotation.lookAt(point);
    }
  }
}
