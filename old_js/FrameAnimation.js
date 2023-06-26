export default class FrameAnimation {
  playing;

  currFrame;

  currAnimationTime;
  animationTime;

  frames;

  constructor(frames) {
    this.playing = false;

    this.currFrame = 0;

    this.currAnimationTime = 0;
    this.animationTime = 100;

    this.frames = frames;
  }

  isPlaying() {
    return this.playing;
  }

  play() {
    this.playing = true;
  }

  stop() {
    this.playing = false;

    this.currFrame = 0;
  }

  update(tickMs) {
    if (this.currAnimationTime >= this.animationTime) {
      this.currFrame += 1;

      this.currAnimationTime = 0;
    } else {
      this.currAnimationTime += tickMs;
    }

    if (this.currFrame + 1 > this.frames.length) {
      this.stop();
    }
  }
}
