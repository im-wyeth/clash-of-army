import IActor from "./IActor";
import IActorSpriteComponent from "./IActorSpriteComponent";
import IVector2 from "./IVector2";

export default interface ITankBuilder {
  setSpriteComponent(spriteComponent: IActorSpriteComponent): ITankBuilder;

  setPosition(position: IVector2): ITankBuilder;

  setTurret(turret: IActor): ITankBuilder;

  build(): IActor;
}
