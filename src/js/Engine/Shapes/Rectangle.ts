import IRectangle from "../Interfaces/IRectangle";
import IVector2 from "../Interfaces/IVector2";

export class Rectangle implements IRectangle {
  readonly type = "rectangle";

  constructor(private readonly _size: IVector2) {}

  getSize(): IVector2 {
    return this._size;
  }
}
