import ISpriteData from "./Interfaces/ISpriteData";
import IVector2 from "./Interfaces/IVector2";

export default class SpriteData implements ISpriteData {
  constructor(
    private readonly _sheetName: string,
    private readonly _size: IVector2,
    private readonly _source: IVector2,
    private readonly _origin: IVector2
  ) {}

  getSheetName(): string {
    return this._sheetName;
  }

  getSize(): IVector2 {
    return this._size;
  }

  getSource(): IVector2 {
    return this._source;
  }

  getOrigin(): IVector2 {
    return this._origin;
  }
}
