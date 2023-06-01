import IVector2 from "./IVector2";

export default interface IActorSpriteComponent {
  getSpriteSheetName(): string;

  getSource(): IVector2;

  getSize(): IVector2;
}
