import { DIRECTION, ROTATION } from "./Enums";
import MilitaryEquipment from "./MilitaryEquipment";
import Turret from "./Turret";
import { degToRad, radToVec, radToDeg } from "@nexty-org/core";

// test
const ONE_SECOND_MS = 1000;

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

    this.maxVelocityPerSecond = 28;
    this.velocityPerSecond = 100;
    this.accelerationPerSecond = 1.5;

    this.brakingForcePerSecond = 5;
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

  update(tickMs) {
    this.handleMoving(tickMs);
    this.handleRotation(tickMs);

    this.turret.setPosition(this.center.x, this.center.y);

    this.turret.update(tickMs);
  }

  render(renderer, deltaTime) {
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

  handleMoving(tickMs) {
    this.updateDirection();

    if (this.directionState === DIRECTION.NONE) {
      return;
    }

    // test (если идет торможение и если скорость не сброшена)
    if (this.braking) {
      if (this.velocityPerSecond - this.brakingForcePerSecond * tickMs <= 0) {
        this.velocityPerSecond = 0;

        this.braking = false;

        this.directionState = DIRECTION.NONE;
      } else {
        this.velocityPerSecond -= this.brakingForcePerSecond * tickMs;
      }
    }

    // test (если газ не нажат, но скорость имеется)
    if (!this.gasPressed && this.velocityPerSecond > 0) {
      if (this.velocityPerSecond - (this.weight / 5000) * tickMs <= 0) {
        this.velocityPerSecond = 0;
      } else {
        this.velocityPerSecond -= (this.weight / 5000) * tickMs;
      }
    }

    // test (если педаль газа нажата, но ускорение не максимальное)
    if (this.gasPressed && this.velocityPerSecond < this.maxVelocityPerSecond) {
      if (
        this.velocityPerSecond + this.accelerationPerSecond >=
        this.maxVelocityPerSecond
      ) {
        this.velocityPerSecond = this.maxVelocityPerSecond;
      } else {
        this.velocityPerSecond += this.accelerationPerSecond * tickMs;
      }
    }

    // test (если танк не стоит)
    if (this.directionState != DIRECTION.NONE || this.velocityPerSecond > 0) {
      this.center.x +=
        this.direction.x * ((this.velocityPerSecond / ONE_SECOND_MS) * tickMs);
      this.center.y +=
        this.direction.y * ((this.velocityPerSecond / ONE_SECOND_MS) * tickMs);
    }
  }

  handleRotation(tickMs) {
    if (this.rotationState === ROTATION.LEFT) {
      this.rad -= (this.rotationRadSpeedPerSecond / ONE_SECOND_MS) * tickMs;
    } else if (this.rotationState === ROTATION.RIGHT) {
      this.rad += (this.rotationRadSpeedPerSecond / ONE_SECOND_MS) * tickMs;
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
