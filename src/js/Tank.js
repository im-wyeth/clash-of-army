import { SPRITE_SHEETS } from "./Configs";
import { DIRECTION, ROTATION } from "./Enums";
import MilitaryEquipment from "./MilitaryEquipment";
import Turret from "./Turret";
import { degToRad, radToVec, radToDeg } from "./Utils";

export default class Tank extends MilitaryEquipment {
  game;

  id;

  turret;

  constructor(game, id) {
    super();

    this.game = game;

    this.id = id;

    this.turret = new Turret(game, this);
  }

  getId() {
    return this.id;
  }

  getTurret() {
    return this.turret;
  }

  update(dt) {
    this.handleMoving(dt);
    this.handleRotation(dt);

    this.turret.setPosition(this.center.x, this.center.y);

    this.turret.update(dt);
  }

  render(renderer) {
    const sprites = this.game.getResourceManager().getSprites();

    renderer.drawImage(
      sprites[this.sprite.sheetName],
      this.center.x,
      this.center.y,
      this.size.x,
      this.size.y,
      this.rad,
      this.sprite.sourcePosition.x,
      this.sprite.sourcePosition.y,
      this.size.x,
      this.size.y
    );

    this.turret.render(renderer);
  }

  handleMoving(dt) {
    if (this.turret.isShooting()) {
      return;
    }

    // test
    if (
      this.directionState != DIRECTION.NONE &&
      this.rotationState === ROTATION.NONE
    ) {
      this.center.x += this.direction.x * 0.1 * dt;
      this.center.y += this.direction.y * 0.1 * dt;
    }
  }

  handleRotation(dt) {
    if (this.rotationState === ROTATION.LEFT) {
      this.rad -= this.rotationSpeed * dt;
    } else if (this.rotationState === ROTATION.RIGHT) {
      this.rad += this.rotationSpeed * dt;
    }
  }

  shoot() {
    this.turret.shoot();
  }

  updateDirection() {
    switch (this.directionState) {
      case DIRECTION.FORWARD:
        this.direction = radToVec(this.rad);
        break;
      case DIRECTION.BACKWARD:
        this.direction = radToVec(
          degToRad((radToDeg(this.rad) - 180 + 360) % 360)
        ).nor();
        break;
    }
  }

  moveForward() {
    this.directionState = DIRECTION.FORWARD;

    this.updateDirection();
  }

  moveBackward() {
    this.directionState = DIRECTION.BACKWARD;

    this.updateDirection();
  }

  stopMoving() {
    this.directionState = DIRECTION.NONE;
  }

  rotateRight() {
    this.rotationState = ROTATION.RIGHT;
  }

  rotateLeft() {
    this.rotationState = ROTATION.LEFT;
  }

  stopRotation() {
    this.rotationState = ROTATION.NONE;

    if (this.directionState != DIRECTION.NONE) {
      this.updateDirection();
    }
  }
}
