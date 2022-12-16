import { ANIMATIONS, EFFECTS, SPRITE_SHEETS } from "./Configs";
import FrameAnimation from "./FrameAnimation";
import SpriteFrame from "./SpriteFrame";
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

    this.rotationSpeed = 0.001;

    this.shooting = false;

    // test
    this.shootAnimation = null;
  }

  setSpritePosition(x, y) {
    this.spritePosition.x = x;
    this.spritePosition.y = y;
  }

  // test
  setShootAnimation(frameAnimation) {
    this.shootAnimation = frameAnimation;
  }

  getRad() {
    return this.rad;
  }

  update(dt) {
    // for (const animation of this.animations) {
    //   if (animation.playing) {
    //     animation.update(dt);
    //     break;
    //   }
    //   if (animation.name === ANIMATIONS.TURRET_SHOOT && this.shooting) {
    //     this.shooting = false;
    //     console.log(1);
    //   }
    // }
    // Анимация выстрела лагает
    // Нужно добиться синхронности в update и render
  }

  render(renderer, sprites) {
    if (!this.shooting) {
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

    // for (const animation of this.animations) {
    //   if (animation.playing) {
    //     animation.render(renderer, sprites);
    //   }
    // }
  }

  addAnimation(name, framesData) {
    const frames = [];

    for (const frame of framesData) {
      frames.push(
        new SpriteFrame(frame.x, frame.y, frame.w, frame.h, SPRITE_SHEETS.TANKS)
      );
    }

    this.animations.push(new FrameAnimation(name, frames));
  }

  playAnimation(name, x, y, rad) {
    const frameAnimation = this.animations.find((a) => a.name === name);

    frameAnimation.play(x, y, rad);
  }

  updatePositionOnTank() {
    const pos = this.tank.getPosition();

    this.center.x = pos.x;
    this.center.y = pos.y;
  }

  shoot() {
    this.shooting = true;

    let effectCenter = this.tank.center.rotate(0);

    this.playAnimation(
      ANIMATIONS.TURRET_SHOOT,
      effectCenter.x,
      effectCenter.y,
      0
    );

    // test
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
}
