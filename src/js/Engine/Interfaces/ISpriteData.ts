import IVector2 from "./IVector2";

export default interface ISpriteData {
  getSheetName(): string;

  getSize(): IVector2;

  getSource(): IVector2;

  getOrigin(): IVector2;
}
