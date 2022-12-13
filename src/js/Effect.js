import FrameAnimation from "./FrameAnimation";

export default class Effect {
  name;

  constructor(name, renderer, frames) {
    this.name = name;

    this.active = false;

    this.frameAnimation = new FrameAnimation(renderer, frames);
  }

  getFrameAnimation() {
    return this.frameAnimation;
  }

  activate(x, y, rad) {
    this.active = true;

    this.frameAnimation.play(x, y, rad);
  }

  update(dt) {
    this.frameAnimation.update(dt);

    if (!this.frameAnimation.isPlaying() && this.active === true) {
      this.active = false;
    }
  }

  render(sprites) {
    this.frameAnimation.render(sprites);
  }
}
