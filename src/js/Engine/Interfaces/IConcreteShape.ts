import IVector2 from "./IVector2";

type ShapeType = "rectangle";

export default interface IConcreteShape {
  getCorners(): Array<IVector2>;

  getNormals(): Array<IVector2>;
}
