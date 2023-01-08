import { EFFECTS, SPRITE_SHEETS, TANKS_DATA } from "./Configs";
import FrameAnimation from "./FrameAnimation";
import Vector2 from "./Vector2";
import WorldEntity from "./WorldEntity";

export default class Turret extends WorldEntity {
  tank;

  spritePosition;

  radTo;

  rotationSpeed;

  constructor(game, tank) {
    super(game);

    this.tank = tank;

    this.spritePosition = new Vector2(0, 0);

    this.radTo = this.rad;

    this.rotating = false;
    this.rotationSpeed = 0.001;

    // test
    this.shootAnimation = new FrameAnimation(
      game,
      TANKS_DATA[this.tank.getTankId()].turret.animations.shoot,
      SPRITE_SHEETS.TANKS
    );

    this.mouseMoveHandle = this.game
      .getGameRenderer()
      .getCanvas()
      .addEventListener("mousemove", this.mouseMoveHandle.bind(this));
  }

  setSpritePosition(x, y) {
    this.spritePosition.x = x;
    this.spritePosition.y = y;
  }

  getRad() {
    return this.rad;
  }

  update(dt) {
    this.updatePositionOnTank();

    // test
    if (this.rotating && !this.shootAnimation.isPlaying()) {
      let curr = this.rad * (180 / Math.PI);
      let to = this.radTo * (180 / Math.PI);

      if (curr < 0 || curr > 360) {
        curr = (curr + 360) % 360;
      }
      if (to < 0 || to > 360) {
        to = (to + 360) % 360;
      }

      if (curr < to) {
        if (Math.abs(curr - to) < 180) {
          this.rad += this.rotationSpeed * dt;
        } else {
          this.rad -= this.rotationSpeed * dt;
        }
      } else {
        if (Math.abs(curr - to) < 180) {
          this.rad -= this.rotationSpeed * dt;
        } else {
          this.rad += this.rotationSpeed * dt;
        }
      }

      if (Math.abs(this.rad - this.radTo) <= this.rotationSpeed * dt) {
        this.rad = this.radTo;
        this.rotating = false;
      }
    }
    //

    if (this.shootAnimation.isPlaying()) {
      this.shootAnimation.update(dt);
    }
  }

  render(renderer) {
    const sprites = this.game.getResourceManager().getSprites();

    if (this.shootAnimation.isPlaying()) {
      this.shootAnimation.render(renderer);
    } else {
      renderer.drawImage(
        sprites["tanks"],
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
    }
  }

  updatePositionOnTank() {
    const pos = this.tank.getPosition();

    this.center.x = pos.x;
    this.center.y = pos.y;
  }

  shoot() {
    //test
    let effectCenter = this.tank.center.rotate(0);

    this.shootAnimation.play(effectCenter.x, effectCenter.y, this.rad);

    let dir = new Vector2(Math.cos(this.rad), Math.sin(this.rad));

    this.game
      .getEffectManager()
      .activateEffect(
        EFFECTS.TURRET_SHOOT_SMOKE,
        effectCenter.x + dir.x * 75,
        effectCenter.y + dir.y * 75,
        this.rad
      );

    // const alternateAngle = (this.rad * (180 / Math.PI) + 180) % 360;
    // const newDirRad = alternateAngle * (Math.PI / 180);
    // let dir2 = new Vector2(Math.cos(newDirRad), Math.sin(newDirRad));
  }

  mouseMoveHandle(e) {
    // test

    const canvasScaleCoefficient =
      this.game.getGameRenderer().getCanvas().clientWidth / 1200;

    const mouseX = Math.round(e.offsetX / canvasScaleCoefficient);
    const mouseY = Math.round(e.offsetY / canvasScaleCoefficient);

    const camera = this.game.getCamera();
    const worldX = mouseX + camera.center.x;
    const worldY = mouseY + camera.center.y;

    let x = worldX - this.tank.center.x;
    let y = worldY - this.tank.center.y;

    // why?
    const len = Math.sqrt(x * x + y * y);
    x = x / len;
    y = y / len;

    this.radTo = Math.atan2(y, x);

    this.rotating = true;
  }
}
