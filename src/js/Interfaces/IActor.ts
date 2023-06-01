import IActorSpriteComponent from "./IActorSpriteComponent";
import IVector2 from "./IVector2";

export default interface IActor {
  getPosition(): IVector2;

  getSpriteComponent(): null | IActorSpriteComponent;

  getRadians(): number;

  setPosition(x: number, y: number): void;

  setSpriteComponent(spriteComponent: IActorSpriteComponent): void;

  update?(timeStep: number): void;
}
