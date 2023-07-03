import IConcreteShape from "../Interfaces/IConcreteShape";
import IVector2 from "../Interfaces/IVector2";

export default class Rectangle implements IConcreteShape {
  constructor(private readonly _size: IVector2) {}

  getSize() {
    return this._size;
  }

  getCorners(): IVector2[] {
    return [];
  }

  getNormals(): IVector2[] {
    return [];
  }
}
