import IActorSpriteComponent from "./IActorSpriteComponent";
import IVector2 from "./IVector2";

export default interface IActorSpriteComponentBuilder {
  setSpriteSheetName(spriteSheetName: string): IActorSpriteComponentBuilder;

  setSize(size: IVector2): IActorSpriteComponentBuilder;

  setSource(source: IVector2): IActorSpriteComponentBuilder;

  setOrigin(origin: IVector2): IActorSpriteComponentBuilder;

  build(): IActorSpriteComponent;
}
