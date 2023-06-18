import IActor from "../Interfaces/IActor";
import IActorSpriteComponent from "../Interfaces/IActorSpriteComponent";
import IVector2 from "../Interfaces/IVector2";
import Vector2 from "../Engine/Vector2";
import Tank from "../WorldEntities/Tank";
import TankAbstraction from "../Abstractions/TankAbstraction";
import IActorAccelerationComponent from "../Interfaces/IActorAccelerationComponent";

export default class TankBuilder {
  private _spriteComponent: null | IActorSpriteComponent = null;
  private _accelerationComponent: null | IActorAccelerationComponent = null;
  private _position: IVector2 = new Vector2(0, 0);
  private _turret: null | IActor = null;

  setSpriteComponent(spriteComponent: IActorSpriteComponent): TankBuilder {
    this._spriteComponent = spriteComponent;

    return this;
  }

  setAccelerationComponent(
    accelerationComponent: IActorAccelerationComponent
  ): TankBuilder {
    this._accelerationComponent = accelerationComponent;

    return this;
  }

  setPosition(position: IVector2): TankBuilder {
    this._position.x = position.x;
    this._position.y = position.y;

    return this;
  }

  setTurret(turret: IActor): TankBuilder {
    this._turret = turret;

    return this;
  }

  build(): TankAbstraction {
    const tank = new Tank();
    tank.setPosition(this._position);

    if (this._spriteComponent) {
      tank.setSpriteComponent(this._spriteComponent);
    }

    if (this._accelerationComponent) {
      tank.setAccelerationComponent(this._accelerationComponent);
    }

    if (this._turret) {
      tank.setTurret(this._turret);
    }

    return tank;
  }
}
