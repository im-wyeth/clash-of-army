import SpriteFrame from "./SpriteFrame";
import Vector2 from "./Vector2";

export default class FrameAnimation {
  game;

  rad;
  center;
  playing;

  currFrame;
  frameLength;

  currAnimationTime;
  animationTime;

  frames;

  constructor(game, frames, spriteSheetName) {
    this.game = game;

    this.rad = 0;
    this.center = new Vector2(0, 0);
    this.playing = false;

    this.currFrame = 0;
    this.frameLength = frames.length;

    this.currAnimationTime = 0;
    this.animationTime = 150;

    this.frames = [];

    for (const frame of frames) {
      this.frames.push(
        new SpriteFrame(frame.x, frame.y, frame.w, frame.y, spriteSheetName)
      );
    }
  }

  isPlaying() {
    return this.playing;
  }

  play(x, y, rad) {
    this.playing = true;

    this.center.x = x;
    this.center.y = y;

    this.rad = rad;
  }

  stop() {
    this.playing = false;

    this.currFrame = 0;
  }

  update(dt) {
    if (this.currAnimationTime >= this.animationTime) {
      this.currFrame += 1;

      this.currAnimationTime = 0;
    } else {
      this.currAnimationTime += dt;
    }

    if (this.currFrame + 1 > this.frameLength) {
      this.stop();

      return;
    }
  }

  render(renderer) {
    const sprites = this.game.getResourceManager().getSprites();

    const frame = this.frames[this.currFrame];

    renderer.drawImage(
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
