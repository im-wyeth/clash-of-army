import IVector2 from "./IVector2";

export default interface IVector2Manager {
  getNew(x: number, y: number): IVector2;

  fromRadians(theta: number): IVector2;
}
