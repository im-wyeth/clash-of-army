import Vector2 from "./Vector2";

export default class Effect {
  renderer;

  name;

  rad;
  center;
  active;

  currFrame;
  frameLength;

  currAnimationTime;
  animationTime;

  frames;

  constructor(renderer, name, frames) {
    this.renderer = renderer;

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

  deactivate() {
    this.active = false;

    this.currFrame = 0;
  }

  update(dt) {
    if (this.currFrame + 1 >= this.frameLength) {
      this.deactivate();

      return;
    }

    if (this.currAnimationTime >= this.animationTime) {
      this.currFrame += 1;

      this.currAnimationTime = 0;
    } else {
      this.currAnimationTime += dt;
    }
  }

  render(sprites) {
    const frame = this.frames[this.currFrame];

    this.renderer.drawImage(
      sprites[frame.spriteSheetName],
      this.center.x,
      this.center.y,
      frame.size.x,
      frame.size.y,
      this.rad,
      frame.sourcePosition.x,
      frame.sourcePosition.y,
      frame.size.x,
      frame.size.y
    );
  }
}
