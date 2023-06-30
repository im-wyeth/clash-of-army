import IVector2 from "./Interfaces/IVector2";

export class Vector2 implements IVector2 {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  get magnitude(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  nor(): IVector2 {
    const len = this.magnitude;

    if (len != 0) {
      this.x /= len;
      this.y /= len;
    }

    return this;
  }

  add(v: IVector2): IVector2 {
    return new Vector2(this.x + v.x, this.y + v.y);
  }

  minus(v: IVector2): IVector2 {
    return new Vector2(this.x - v.x, this.y - v.y);
  }

  multiply(v: IVector2): IVector2 {
    return new Vector2(this.x * v.x, this.y * v.y);
  }

  rotate(theta: number): IVector2 {
    return new Vector2(
      this.x * Math.cos(theta) - this.y * Math.sin(theta),
      this.x * Math.sin(theta) + this.y * Math.cos(theta)
    );
  }

  toRadians(): number {
    return Math.atan2(this.y, this.x);
  }

  dot(vec: IVector2): number {
    return vec.x * this.x + vec.y * this.y;
  }
}
