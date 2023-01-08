export default class Vector2 {
  x;
  y;

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  get magnitude() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  nor() {
    const len = this.magnitude;

    if (this.magnitude != 0) {
      this.x /= len;
      this.y /= len;
    }

    return this;
  }

  add(factor) {
    const f =
      typeof factor === "object"
        ? { x: 0, y: 0, ...factor }
        : { x: factor, y: factor };

    return new Vector2(this.x + f.x, this.y + f.y);
  }

  minus(factor) {
    const f =
      typeof factor === "object"
        ? { x: 0, y: 0, ...factor }
        : { x: factor, y: factor };

    return new Vector2(this.x - f.x, this.y - f.y);
  }

  multiply(factor) {
    const f =
      typeof factor === "object"
        ? { x: 0, y: 0, ...factor }
        : { x: factor, y: factor };

    return new Vector2(this.x * f.x, this.y * f.y);
  }

  rotate(theta) {
    return new Vector2(
      this.x * Math.cos(theta) - this.y * Math.sin(theta),
      this.x * Math.sin(theta) + this.y * Math.cos(theta)
    );
  }

  dot(vec) {
    return vec.x * this.x + vec.y * this.y;
  }

  //// test
  // project(line) {
  //   let dotvalue =
  //     line.direction.x * (this.x - line.origin.x) +
  //     line.direction.y * (this.y - line.origin.y);

  //   return new Vector2(
  //     line.origin.x + line.direction.x * dotvalue,
  //     line.origin.y + line.direction.y * dotvalue
  //   );
  // }
}
