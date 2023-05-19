import { DIRECTION, ROTATION } from "./Enums";
import { Vector2 } from "@nexty-org/core";
import WorldEntity from "./WorldEntity";

export default class MilitaryEquipment extends WorldEntity {
  centerShift;
  direction;

  radTo;
  rotationSpeed;

  directionState;
  rotationState;

  sprite;

  constructor() {
    super();

    this.centerShift = new Vector2(0, 0);
    this.direction = new Vector2(0, 0);

    this.radTo = this.rad;
    this.rotationRadSpeedPerSecond = 1.2;

    this.directionState = DIRECTION.NONE;
    this.rotationState = ROTATION.NONE;

    this.sprite = null;
  }

  setDirection(x, y) {
    this.direction.x = x;
    this.direction.y = y;
  }

  setSprite(sprite) {
    this.sprite = sprite;
  }
}
