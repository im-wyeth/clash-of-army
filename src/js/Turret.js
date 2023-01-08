import { EFFECTS, SPRITE_SHEETS, TANKS_DATA } from "./Configs";
import FrameAnimation from "./FrameAnimation";
import Vector2 from "./Vector2";
import WorldEntity from "./WorldEntity";
import { radToVec, rotateTo, vecToRad, radToDeg } from "./Utils";

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
      this.rad = rotateTo(this.rad, this.radTo, this.rotationSpeed * dt);

      if (this.rad === this.radTo) {
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
    let effectCenter = this.tank.getPosition();

    this.shootAnimation.play(effectCenter.x, effectCenter.y, this.rad);

    let dir = radToVec(this.rad);

    this.game
      .getEffectManager()
      .activateEffect(
        EFFECTS.TURRET_SHOOT_SMOKE,
        effectCenter.x + dir.x * 75,
        effectCenter.y + dir.y * 75,
        this.rad
      );
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

    let vec = new Vector2(
      worldX - this.tank.center.x,
      worldY - this.tank.center.y
    );

    this.radTo = vecToRad(vec.nor());

    this.rotating = true;
  }
}
