import Vector2 from "./Vector2";

export default class Camera {
  center;
  size;

  followTo;

  constructor(w, h) {
    this.center = new Vector2(0, 0);
    this.size = new Vector2(w, h);

    this.zoom = 1;
  }

  setPosition(x, y) {
    this.center.x = x;
    this.center.y = y;
  }

  getPosition() {
    return this.center;
  }

  getZoom() {
    return this.zoom;
  }

  centerOn(x, y) {
    this.center.x = x - this.size.x / 2 / this.zoom;
    this.center.y = y - this.size.y / 2 / this.zoom;
  }
}
