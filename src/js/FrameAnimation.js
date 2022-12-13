import Vector2 from "./Vector2";

export default class FrameAnimation {
  renderer;

  rad;
  center;
  playing;

  currFrame;
  frameLength;

  currAnimationTime;
  animationTime;

  frames;

  constructor(renderer, frames) {
    this.renderer = renderer;

    this.rad = 0;
    this.center = new Vector2(0, 0);
    this.playing = false;

    this.currFrame = 0;
    this.frameLength = frames.length;

    this.currAnimationTime = 0;
    this.animationTime = 200;

    this.frames = frames;
  }

  isPlaying() {
    return this.playing;
  }

  play(x, y, rad) {
    this.playing = true;

    this.rad = rad;

    this.center.x = x;
    this.center.y = y;
  }

  stop() {
    this.playing = false;

    this.currFrame = 0;
  }

  update(dt) {
    if (this.currFrame + 1 >= this.frameLength) {
      this.stop();

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
