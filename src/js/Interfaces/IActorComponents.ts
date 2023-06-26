import IActorAccelerationComponent from "./IActorAccelerationComponent";
import IActorSpriteComponent from "./IActorSpriteComponent";

export default interface IActorComponents {
  get sprite(): null | IActorSpriteComponent;

  get acceleration(): null | IActorAccelerationComponent;

  setSprite(sprite: IActorSpriteComponent): void;

  setAcceleration(acceleration: IActorAccelerationComponent): void;
}
