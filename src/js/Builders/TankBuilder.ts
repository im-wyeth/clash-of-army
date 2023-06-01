import IActor from "../Interfaces/IActor";
import IActorSpriteComponent from "../Interfaces/IActorSpriteComponent";
import ITankBuilder from "../Interfaces/ITankBuilder";
import IVector2 from "../Interfaces/IVector2";
import Vector2 from "../Vector2";
import Tank from "../WorldEntities/Tank";

export default class TankBuilder implements ITankBuilder {
  private _spriteComponent: null | IActorSpriteComponent = null;
  private _position: IVector2 = new Vector2(0, 0);
  private _turret: null | IActor = null;

  setSpriteComponent(spriteComponent: IActorSpriteComponent): ITankBuilder {
    this._spriteComponent = spriteComponent;

    return this;
  }

  setPosition(x: number, y: number): ITankBuilder {
    this._position.x = x;
    this._position.y = y;

    return this;
  }

  setTurret(turret: IActor): ITankBuilder {
    this._turret = turret;

    return this;
  }

  build(): IActor {
    const tank = new Tank();
    tank.setPosition(this._position.x, this._position.y);

    if (this._spriteComponent) {
      tank.setSpriteComponent(this._spriteComponent);
    }

    if (this._turret) {
      tank.setTurret(this._turret);
    }

    return tank;
  }
}
