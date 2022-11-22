import Vector2 from "./Vector2";
import Line from "./Line";

export default class Rectangle {
  center;
  size;
  rad;

  constructor(x, y, w, h, rad) {
    this.center = new Vector2(x, y);
    this.size = new Vector2(w, h);
    this.rad = rad;
  }

  setRotation(rad) {
    this.rad = rad;
  }

  getRotation() {
    return this.rad;
  }

  getAxes() {
    const OX = new Vector2(1, 0);
    const OY = new Vector2(0, 1);

    const RX = OX.rotate(this.rad);
    const RY = OY.rotate(this.rad);

    return [
      new Line(this.center.x, this.center.y, RX.x, RX.y),
      new Line(this.center.x, this.center.y, RY.x, RY.y),
    ];
  }

  getCorners() {
    const axis = this.getAxes();

    const RX = axis[0].direction.multiply(this.size.x / 2);
    const RY = axis[1].direction.multiply(this.size.y / 2);

    return [
      this.center.add(RX).add(RY),
      this.center.add(RX).add(RY.multiply(-1)),
      this.center.add(RX.multiply(-1)).add(RY.multiply(-1)),
      this.center.add(RX.multiply(-1)).add(RY),
    ];
  }
}
