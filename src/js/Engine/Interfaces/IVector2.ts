export default interface IVector2 {
  x: number;
  y: number;

  add(v: IVector2): IVector2;

  minus(v: IVector2): IVector2;

  nor(): IVector2;

  rotate(theta: number): IVector2;

  rotateAround(point: IVector2, theta: number): IVector2;

  toRadians(): number;
}
