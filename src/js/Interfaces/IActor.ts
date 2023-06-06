import IActorSpriteComponent from "./IActorSpriteComponent";
import IVector2 from "./IVector2";

export default interface IActor {
  getPosition(): IVector2;

  getSpriteComponent(): null | IActorSpriteComponent;

  getRadians(): number;

  setPosition(position: IVector2): void;

  setSpriteComponent(spriteComponent: IActorSpriteComponent): void;

  update?(timeStep: number): void;
}
