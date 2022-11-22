import Vector2 from "./Vector2";
import WorldEntity from "./WorldEntity";

export default class Camera {
  center;
  size;

  followTo;

  constructor(w, h) {
    this.center = new Vector2(0, 0);
    this.size = new Vector2(w, h);

    this.followTo = false;
    this.zoom = 1;

    window.addEventListener("click", (e) => {
      this.zoom += 1;
    });
  }

  getPosition() {
    return this.center;
  }

  lookAt(entity) {
    if (entity instanceof WorldEntity) {
      this.followTo = entity;
    }
  }

  update(dt) {
    if (this.followTo) {
      const position = this.followTo.getPosition();

      this.center.x = position.x - this.size.x / 2 / this.zoom;
      this.center.y = position.y - this.size.y / 2 / this.zoom;
    }
  }
}
