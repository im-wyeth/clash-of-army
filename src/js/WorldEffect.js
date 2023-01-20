import { SPRITE_SHEETS } from "./Configs";
import FrameAnimation from "./FrameAnimation";
import Sprite from "./Sprite";
import WorldEntity from "./WorldEntity";

export default class WorldEffect extends WorldEntity {
  name;

  active;

  frameAnimation;

  constructor(game, name, frames) {
    super();

    this.game = game;

    this.name = name;

    this.active = false;

    const animationFrames = [];
    for (const frame of frames) {
      animationFrames.push(
        new Sprite(SPRITE_SHEETS.EFFECTS, frame.sX, frame.sY, frame.w, frame.h)
      );
    }

    this.frameAnimation = new FrameAnimation(animationFrames);
  }

  getFrameAnimation() {
    return this.frameAnimation;
  }

  activate(x, y, rad) {
    this.active = true;

    this.center.x = x;
    this.center.y = y;

    this.rad = rad;

    this.frameAnimation.play();

    console.log(this.frameAnimation.currFrame);
  }

  update(dt) {
    if (!this.active) {
      return;
    }

    if (!this.frameAnimation.isPlaying() && this.active === true) {
      this.active = false;
    }

    this.frameAnimation.update(dt);
  }

  render(renderer) {
    if (!this.frameAnimation.isPlaying()) {
      return;
    }

    const sprites = this.game.getResourceManager().getSprites();
    const sprite = this.frameAnimation.frames[this.frameAnimation.currFrame];

    renderer.drawImage(
      sprites[sprite.sheetName],
      this.center.x,
      this.center.y,
      sprite.size.x,
      sprite.size.y,
      this.rad,
      sprite.sourcePosition.x,
      sprite.sourcePosition.y,
      sprite.size.x,
      sprite.size.y
    );
  }
}
