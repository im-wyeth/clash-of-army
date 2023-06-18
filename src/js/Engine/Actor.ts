import IActor from "../Interfaces/IActor";
import IActorAccelerationComponent from "../Interfaces/IActorAccelerationComponent";
import IActorComponent from "../Interfaces/IActorComponent";
import IActorSpriteComponent from "../Interfaces/IActorSpriteComponent";
import IVector2 from "../Interfaces/IVector2";
import Vector2 from "./Vector2";

export default abstract class Actor implements IActor {
  protected readonly _position: IVector2 = new Vector2(0, 0);

  protected _sprite: null | IActorSpriteComponent = null;
  protected _acceleration: null | IActorAccelerationComponent = null;

  protected _radians: number = 0;

  constructor() {}

  getPosition(): IVector2 {
    return this._position;
  }

  getSpriteComponent(): null | IActorSpriteComponent {
    return this._sprite;
  }

  getAccelerationComponent(): null | IActorAccelerationComponent {
    return this._acceleration;
  }

  getRadians(): number {
    return this._radians;
  }

  setPosition(position: IVector2): void {
    this._position.x = position.x;
    this._position.y = position.y;
  }

  setSpriteComponent(spriteComponent: IActorSpriteComponent) {
    this._sprite = spriteComponent;
  }

  setAccelerationComponent(
    accelerationComponent: IActorAccelerationComponent
  ): void {
    this._acceleration = accelerationComponent;
  }

  update(timeStep: number): void {}
}
