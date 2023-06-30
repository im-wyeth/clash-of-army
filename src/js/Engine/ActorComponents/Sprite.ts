import IActor from "../Interfaces/IActor";
import IVector2 from "../Interfaces/IVector2";
import { BaseComponent } from "./BaseComponent";

export class Sprite extends BaseComponent {
  private _sheetName: string;
  private _source: IVector2;
  private _size: IVector2;
  private _origin: IVector2;

  constructor(
    actor: IActor,
    sheetName: string,
    source: IVector2,
    size: IVector2,
    origin: IVector2
  ) {
    super(actor);

    this._sheetName = sheetName;
    this._source = source;
    this._size = size;
    this._origin = origin;
  }

  getSheetName(): string {
    return this._sheetName;
  }

  getSource(): IVector2 {
    return this._source;
  }

  getSize(): IVector2 {
    return this._size;
  }

  getOrigin(): IVector2 {
    return this._origin;
  }
}
