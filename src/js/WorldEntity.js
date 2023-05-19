import { Vector2 } from "@nexty-org/core";

export default class WorldEntity {
  center;
  size;

  rad;

  constructor() {
    this.center = new Vector2(0, 0);
    this.size = new Vector2(0, 0);

    this.rad = 0;
  }

  setPosition(x, y) {
    this.center.x = x;
    this.center.y = y;
  }

  setSize(w, h) {
    this.size.x = w;
    this.size.y = h;
  }

  setRotation(rad) {
    this.rad = rad;
  }

  getPosition() {
    return this.center;
  }

  getSize() {
    return this.size;
  }

  getRad() {
    return this.rad;
  }
}
