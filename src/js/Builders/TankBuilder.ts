import IVector2 from "../Interfaces/IVector2";
import Vector2 from "../Engine/Vector2";
import Tank from "../WorldEntities/Tank";
import TankAbstraction from "../Abstractions/TankAbstraction";
import TankTurretAbstraction from "../Abstractions/TankTurretAbstraction";
import IVector2Manager from "../Interfaces/IVector2Manager";

export default class TankBuilder {
  private _position: IVector2 = new Vector2(0, 0);
  private _turret: null | TankTurretAbstraction = null;

  setPosition(position: IVector2): TankBuilder {
    this._position.x = position.x;
    this._position.y = position.y;

    return this;
  }

  setTurret(turret: TankTurretAbstraction): TankBuilder {
    this._turret = turret;

    return this;
  }

  build(vector2Manager: IVector2Manager): TankAbstraction {
    const tank = new Tank(vector2Manager);
    tank.setPosition(this._position);

    if (this._turret) {
      tank.setTurret(this._turret);
    }

    return tank;
  }
}
