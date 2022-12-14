import { ANIMATIONS, SPRITE_SHEETS } from "./Configs";
import FrameAnimation from "./FrameAnimation";
import SpriteFrame from "./SpriteFrame";
import Vector2 from "./Vector2";
import WorldEntity from "./WorldEntity";

export default class Turret extends WorldEntity {
  tank;
  effectsEmitter;

  spritePosition;

  radTo;

  rotationSpeed;

  constructor(tank, effectsEmitter) {
    super();

    this.tank = tank;
    this.effectsEmitter = effectsEmitter;

    this.spritePosition = new Vector2(0, 0);

    this.radTo = this.rad;

    this.rotationSpeed = 0.001;

    this.animations = [];
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
    console.log(frameAnimation);
    frameAnimation.play(x, y, rad);
  }

  setSpritePosition(x, y) {
    this.spritePosition.x = x;
    this.spritePosition.y = y;
  }

  getRad() {
    return this.rad;
  }

  updatePositionOnTank() {
    const pos = this.tank.getPosition();

    this.center.x = pos.x;
    this.center.y = pos.y;
  }

  update(dt) {
    this.rad += this.rotationSpeed * dt;

    for (const animation of this.animations) {
      if (animation.playing) {
        animation.update(dt);
      }
    }
  }

  render(renderer, sprites) {
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

    for (const animation of this.animations) {
      if (animation.playing) {
        animation.render(renderer, sprites);
      }
    }
  }

  fire() {
    this.playAnimation(ANIMATIONS.TURRET_FIRE, 100, 100, 0);

    // test
    let effectCenter = this.tank.center.rotate(0);

    let dir = new Vector2(Math.cos(this.rad), Math.sin(this.rad));

    this.effectsEmitter.activateEffect(
      "turret_fire",
      effectCenter.x + dir.x * 75,
      effectCenter.y + dir.y * 75,
      this.rad
    );

    const alternateAngle = (this.rad * (180 / Math.PI) + 180) % 360;

    const newDirRad = alternateAngle * (Math.PI / 180);

    let dir2 = new Vector2(Math.cos(newDirRad), Math.sin(newDirRad));

    this.center.x += dir2.x * 5;
    this.center.y += dir2.y * 5;
    //
  }
}
