import IActor from "./IActor";
import IActorSpriteComponent from "./IActorSpriteComponent";

export default interface ITankTurretBuilder {
  setSpriteComponent(
    spriteComponent: IActorSpriteComponent
  ): ITankTurretBuilder;

  setPosition(x: number, y: number): ITankTurretBuilder;

  build(): IActor;
}
