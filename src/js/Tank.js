import { SPRITE_SHEETS } from "./Configs";
import { DIRECTION, ROTATING } from "./Enums";
import Turret from "./Turret";
import { radToVec, degToRad, radToDeg } from "./Utils";
import Vector2 from "./Vector2";
import WorldEntity from "./WorldEntity";

export default class Tank extends WorldEntity {
  tankId;

  direction;
  spritePosition;

  turret;

  isPlayer;

  constructor(game, tankId, isPlayer) {
    super(game);

    this.tankId = tankId;

    this.direction = new Vector2(0, 0);
    this.spritePosition = new Vector2(0, 0);

    // test
    this.directionState = DIRECTION.NONE;
    this.rad = degToRad(20);
    this.rotatingState = ROTATING.NONE;
    this.rotationSpeed = 0.0007;
    //

    this.isPlayer = isPlayer;

    this.turret = new Turret(game, this);

    // test
    window.addEventListener("click", this.shoot.bind(this));
    window.addEventListener("keydown", this.keyHandler.bind(this));
    window.addEventListener("keyup", this.keyHandler.bind(this));
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
    // test

    if (
      this.directionState != DIRECTION.NONE &&
      this.rotatingState == ROTATING.NONE
    ) {
      this.center.x += this.direction.x * 0.1 * dt;
      this.center.y += this.direction.y * 0.1 * dt;
    }

    if (this.rotatingState === ROTATING.LEFT) {
      this.rad -= this.rotationSpeed * dt;
    } else if (this.rotatingState === ROTATING.RIGHT) {
      this.rad += this.rotationSpeed * dt;
    }

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

  shoot() {
    // test
    this.turret.shoot();
    //
  }

  // test
  keyHandler(e) {
    switch (e.key) {
      case "w":
        if (e.type === "keydown") {
          const newDir = radToVec(this.rad).nor();

          this.direction.x = newDir.x;
          this.direction.y = newDir.y;

          this.directionState = DIRECTION.FORWARD;
        } else {
          this.directionState = DIRECTION.NONE;
        }
        break;
      case "a":
        if (this.rotatingState != ROTATING.NONE && e.type === "keyup") {
          this.rotatingState = ROTATING.NONE;

          if (this.directionState == DIRECTION.FORWARD) {
            const newDir = radToVec(this.rad).nor();

            this.direction.x = newDir.x;
            this.direction.y = newDir.y;
          } else {
            const inversedDir = radToVec(
              degToRad((radToDeg(this.rad) - 180 + 360) % 360)
            ).nor();

            this.direction.x = inversedDir.x;
            this.direction.y = inversedDir.y;
          }
        } else {
          this.rotatingState = ROTATING.LEFT;
        }

        break;
      case "s":
        if (e.type === "keydown") {
          const inversedDir = radToVec(
            degToRad((radToDeg(this.rad) - 180 + 360) % 360)
          ).nor();

          this.direction.x = inversedDir.x;
          this.direction.y = inversedDir.y;

          this.directionState = DIRECTION.BACKWARD;
        } else {
          this.directionState = DIRECTION.NONE;
        }
        break;
      case "d":
        if (this.rotatingState != ROTATING.NONE && e.type === "keyup") {
          this.rotatingState = ROTATING.NONE;

          if (this.directionState == DIRECTION.FORWARD) {
            const newDir = radToVec(this.rad).nor();

            this.direction.x = newDir.x;
            this.direction.y = newDir.y;
          } else {
            const inversedDir = radToVec(
              degToRad((radToDeg(this.rad) - 180 + 360) % 360)
            ).nor();

            this.direction.x = inversedDir.x;
            this.direction.y = inversedDir.y;
          }
        } else {
          this.rotatingState = ROTATING.RIGHT;
        }
        break;
    }
  }
}
