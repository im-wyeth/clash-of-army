import IActor from "./IActor";
import IActorSpriteComponent from "./IActorSpriteComponent";
import IVector2 from "./IVector2";

export default interface ITankTurretBuilder {
  setSpriteComponent(
    spriteComponent: IActorSpriteComponent
  ): ITankTurretBuilder;

  setPosition(position: IVector2): ITankTurretBuilder;

  build(): IActor;
}
