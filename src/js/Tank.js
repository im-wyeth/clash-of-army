import { SPRITE_SHEETS } from "./Configs";
import { DIRECTION, ROTATING } from "./Enums";
import Turret from "./Turret";
import { degToRad, radToVec, radToDeg } from "./Utils";
import Vector2 from "./Vector2";
import WorldEntity from "./WorldEntity";

export default class Tank extends WorldEntity {
  tankId;

  direction;
  spritePosition;

  turret;

  isPlayer;

  constructor(game, tankId) {
    super(game);

    this.tankId = tankId;

    this.direction = new Vector2(0, 0);
    this.spritePosition = new Vector2(0, 0);

    // test
    this.directionState = DIRECTION.NONE;
    this.rad = degToRad(20);
    this.rotationState = ROTATING.NONE;
    this.rotationSpeed = 0.0007;
    //

    this.turret = new Turret(game, this);
  }

  setDirection(dx, dy) {
    this.direction.x = dx;
    this.direction.y = dy;
  }

  setSpritePosition(x, y) {
    this.spritePosition.x = x;
    this.spritePosition.y = y;
  }

  getTankId() {
    return this.tankId;
  }

  getTurret() {
    return this.turret;
  }

  update(dt) {
    this.handleMoving(dt);
    this.handleRotation(dt);

    this.turret.update(dt);
  }

  render(renderer) {
    const sprites = this.game.getResourceManager().getSprites();

    renderer.drawImage(
      sprites[SPRITE_SHEETS.TANKS],
      this.center.x,
      this.center.y,
      this.size.x,
      this.size.y,
      this.rad,
      this.spritePosition.x,
      this.spritePosition.y,
      this.size.x,
      this.size.y
    );

    this.turret.render(renderer);
  }

  handleMoving(dt) {
    // test
    if (
      this.directionState != DIRECTION.NONE &&
      this.rotationState === ROTATING.NONE
    ) {
      this.center.x += this.direction.x * 0.1 * dt;
      this.center.y += this.direction.y * 0.1 * dt;
    }
  }

  handleRotation(dt) {
    if (this.rotationState === ROTATING.LEFT) {
      this.rad -= this.rotationSpeed * dt;
    } else if (this.rotationState === ROTATING.RIGHT) {
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
    this.rotationState = ROTATING.RIGHT;
  }

  rotateLeft() {
    this.rotationState = ROTATING.LEFT;
  }

  stopRotation() {
    this.rotationState = ROTATING.NONE;

    if (this.directionState != DIRECTION.NONE) {
      this.updateDirection();
    }
  }
}
