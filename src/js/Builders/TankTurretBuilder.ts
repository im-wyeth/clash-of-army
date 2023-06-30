import IVector2 from "../Engine/Interfaces/IVector2";
import { Vector2 } from "../Engine/Vector2";
import TankTurret from "../WorldEntities/TankTurret";
import TankTurretAbstraction from "../Abstractions/TankTurretAbstraction";

export default class TankTurretBuilder {
  private _position: IVector2 = new Vector2(0, 0);

  setPosition(position: IVector2): TankTurretBuilder {
    this._position.x = position.x;
    this._position.y = position.y;

    return this;
  }

  build(): TankTurretAbstraction {
    const tankTurret = new TankTurret();
    tankTurret.setPosition(this._position);

    return tankTurret;
  }
}
