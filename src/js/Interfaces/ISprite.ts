import IVector2 from "./IVector2";

export default interface ISprite {
  getSpritesSheetName(): string;

  getSize(): IVector2;

  getSourceInfo(): IVector2;
}
