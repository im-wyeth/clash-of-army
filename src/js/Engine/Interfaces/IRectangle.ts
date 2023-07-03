import IVector2 from "./IVector2";

export default interface IRectangle {
  type: "rectangle";

  getSize(): IVector2;
}
