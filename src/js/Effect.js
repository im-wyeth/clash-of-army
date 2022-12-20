import { SPRITE_SHEETS } from "./Configs";
import FrameAnimation from "./FrameAnimation";

export default class Effect {
  name;

  active;

  frameAnimation;

  constructor(game, name, frames) {
    this.game = game;

    this.name = name;

    this.active = false;

    this.frameAnimation = new FrameAnimation(
      game,
      frames,
      SPRITE_SHEETS.EFFECTS
    );
  }

  getFrameAnimation() {
    return this.frameAnimation;
  }

  activate(x, y, rad) {
    this.active = true;

    this.frameAnimation.play(x, y, rad);
  }

  update(dt) {
    if (!this.frameAnimation.isPlaying() && this.active === true) {
      this.active = false;
    }

    this.frameAnimation.update(dt);
  }

  render(renderer) {
    this.frameAnimation.render(renderer);
  }
}
