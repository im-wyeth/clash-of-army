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

    this.rotationSpeed = 0.011;

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
    let thisAngle = this.rad * (180 / Math.PI);
    let angleTo = this.radTo * (180 / Math.PI);

    if (thisAngle < 0 || thisAngle > 360) {
      thisAngle = (thisAngle + 360) % 360;
    }
    if (angleTo < 0 || angleTo > 360) {
      angleTo = (angleTo + 360) % 360;
    }

    if (angleTo > thisAngle) {
      this.rad += this.rotationSpeed * dt;
    } else if (angleTo < thisAngle) {
      this.rad -= this.rotationSpeed * dt;
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
    // test
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

    const alternateAngle = (this.rad * (180 / Math.PI) + 180) % 360;

    const newDirRad = alternateAngle * (Math.PI / 180);

    let dir2 = new Vector2(Math.cos(newDirRad), Math.sin(newDirRad));

    // this.center.x += dir2.x * 5;
    // this.center.y += dir2.y * 5;

    //
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

    const thisAngle = this.rad * (180 / Math.PI);
    const angleTo = this.radTo * (180 / Math.PI);
  }
}
