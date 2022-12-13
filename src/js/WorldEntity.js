import Vector2 from "./Vector2";

export default class WorldEntity {
  renderer;

  center;
  size;

  rad;

  constructor(renderer) {
    this.renderer = renderer;

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

  getPosition() {
    return this.center;
  }

  getSize() {
    return this.size;
  }
}
