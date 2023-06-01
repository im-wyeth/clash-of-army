import IActor from "./IActor";
import IActorSpriteComponent from "./IActorSpriteComponent";

export default interface ITankBuilder {
  setSpriteComponent(spriteComponent: IActorSpriteComponent): ITankBuilder;

  setPosition(x: number, y: number): ITankBuilder;

  setTurret(turret: IActor): ITankBuilder;

  build(): IActor;
}
