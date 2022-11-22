import Vector2 from "./Vector2";
import WorldEntity from "./WorldEntity";

export default class Shell extends WorldEntity {
  direction;
  rad;

  constructor() {
    super();

    this.direction = new Vector2(0, 0);
    this.rad = 0;
  }

  setRad(rad) {
    this.rad = rad;
  }

  getDirection() {
    return this.direction;
  }
}
