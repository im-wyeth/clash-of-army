import IActorAccelerationComponent from "../Interfaces/IActorAccelerationComponent";
import IActorComponents from "../Interfaces/IActorComponents";
import IActorSpriteComponent from "../Interfaces/IActorSpriteComponent";

export default class ActorComponents implements IActorComponents {
  private _sprite: null | IActorSpriteComponent = null;
  private _acceleration: null | IActorAccelerationComponent = null;

  get sprite(): IActorSpriteComponent | null {
    return this._sprite;
  }

  get acceleration(): IActorAccelerationComponent | null {
    return this._acceleration;
  }

  setSprite(sprite: IActorSpriteComponent): void {
    this._sprite = sprite;
  }

  setAcceleration(acceleration: IActorAccelerationComponent): void {
    this._acceleration = acceleration;
  }
}
