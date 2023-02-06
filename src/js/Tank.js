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

    // test
    this.gasPressed = false;

    this.maxVelocity = 28;
    this.velocity = 0;
    this.acceleration = 1.5;

    this.brakingForce = 5;
    this.braking = false;

    this.shooting = false;

    this.weight = 6600;
  }

  getId() {
    return this.id;
  }

  getTurret() {
    return this.turret;
  }

  isShooting() {
    return this.shooting;
  }

  setShooting(shooting) {
    this.shooting = shooting;
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
    this.updateDirection();

    if (this.directionState === DIRECTION.NONE) {
      return;
    }

    // test (если идет торможение и если скорость не сброшена)
    if (this.braking) {
      if (this.velocity - this.brakingForce * dt <= 0) {
        this.velocity = 0;

        this.braking = false;

        this.directionState = DIRECTION.NONE;
      } else {
        this.velocity -= this.brakingForce * dt;
      }
    }

    // test (если газ не нажат, но скорость имеется)
    if (!this.gasPressed && this.velocity > 0) {
      if (this.velocity - (this.weight / 5000) * dt <= 0) {
        this.velocity = 0;
      } else {
        this.velocity -= (this.weight / 5000) * dt;
      }
    }

    // test (если педаль газа нажата, но ускорение не максимальное)
    if (this.gasPressed && this.velocity < this.maxVelocity) {
      if (this.velocity + this.acceleration >= this.maxVelocity) {
        this.velocity = this.maxVelocity;
      } else {
        this.velocity += this.acceleration * dt;
      }
    }

    // test (если танк не стоит)
    if (this.directionState != DIRECTION.NONE || this.velocity > 0) {
      this.center.x += this.direction.x * this.velocity * dt;
      this.center.y += this.direction.y * this.velocity * dt;
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
    this.shooting = true;

    this.turret.shoot();
  }

  // test
  updateDirection() {
    if (this.directionState === DIRECTION.NONE) {
      return;
    }

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
    if (this.directionState === DIRECTION.BACKWARD && this.velocity > 0) {
      this.braking = true;
    } else {
      this.directionState = DIRECTION.FORWARD;
      this.gasPressed = true;
    }
  }

  moveBackward() {
    if (this.directionState === DIRECTION.FORWARD && this.velocity > 0) {
      this.braking = true;
    } else {
      this.directionState = DIRECTION.BACKWARD;
      this.gasPressed = true;
    }
  }

  gasPress() {
    this.gasPressed = true;
  }

  gasUnpress() {
    this.gasPressed = false;
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
