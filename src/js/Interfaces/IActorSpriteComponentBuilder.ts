import IActorSpriteComponent from "./IActorSpriteComponent";

export default interface IActorSpriteComponentBuilder {
  setSpriteSheetName(spriteSheetName: string): IActorSpriteComponentBuilder;

  setSize(w: number, h: number): IActorSpriteComponentBuilder;

  setSource(x: number, y: number): IActorSpriteComponentBuilder;

  setOrigin(x: number, y: number): IActorSpriteComponentBuilder;

  build(): IActorSpriteComponent;
}
