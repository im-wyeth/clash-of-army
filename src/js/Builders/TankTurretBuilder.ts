import IActor from "../Interfaces/IActor";
import IActorSpriteComponent from "../Interfaces/IActorSpriteComponent";
import IVector2 from "../Interfaces/IVector2";
import Vector2 from "../Engine/Vector2";
import TankTurret from "../WorldEntities/TankTurret";

export default class TankTurretBuilder {
  private _spriteComponent: null | IActorSpriteComponent = null;
  private _position: IVector2 = new Vector2(0, 0);

  setSpriteComponent(
    spriteComponent: IActorSpriteComponent
  ): TankTurretBuilder {
    this._spriteComponent = spriteComponent;

    return this;
  }

  setPosition(position: IVector2): TankTurretBuilder {
    this._position.x = position.x;
    this._position.y = position.y;

    return this;
  }

  build(): IActor {
    const tankTurret = new TankTurret();
    tankTurret.setPosition(this._position);

    if (this._spriteComponent) {
      tankTurret.setSpriteComponent(this._spriteComponent);
    }

    return tankTurret;
  }
}
