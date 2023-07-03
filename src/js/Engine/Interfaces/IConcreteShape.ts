import IVector2 from "./IVector2";

export default interface IConcreteShape {
  getCorners(): Array<IVector2>;

  getNormals(): Array<IVector2>;
}
