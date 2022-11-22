import Vector2 from "./Vector2";

export default class Line {
  origin;
  direction;

  constructor(x, y, dx, dy) {
    this.origin = new Vector2(x, y);
    this.direction = new Vector2(dx, dy);
  }
}
