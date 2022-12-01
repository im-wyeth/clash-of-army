import Vector2 from "./Vector2";

export default class Effect {
  name;

  rad;
  center;
  active;

  currFrame;
  frameLength;

  currAnimationTime;
  animationTime;

  frames;

  constructor(name, frames) {
    this.name = name;

    this.rad = 0;
    this.center = new Vector2(0, 0);
    this.active = false;

    this.currFrame = 0;
    this.frameLength = frames.length;

    this.currAnimationTime = 0;
    this.animationTime = 200;

    this.frames = frames;
  }

  setAnimationTime(time) {
    this.animationTime = time;
  }

  activate(x, y, rad) {
    this.active = true;

    this.rad = rad;

    this.center.x = x;
    this.center.y = y;
  }

  update(dt) {
    if (this.currFrame + 1 >= this.frameLength) {
      this.active = false;

      return;
    }

    if (this.currAnimationTime >= this.animationTime) {
      this.currFrame += 1;

      this.currAnimationTime = 0;
    } else {
      this.currAnimationTime += dt;
    }
  }

  render(ctx, sprites) {
    const frameSize = this.frames[this.currFrame].getSize();

    ctx.save();
    ctx.translate(this.center.x, this.center.y);
    ctx.rotate(this.rad);

    this.frames[this.currFrame].render(ctx, sprites);

    ctx.restore();
  }
}
