import { SPRITE_SHEETS } from "./Configs";
import FrameAnimation from "./FrameAnimation";
import { convertSpriteDataToSpriteModels } from "./Utils";
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

    this.frameAnimation = new FrameAnimation(
      convertSpriteDataToSpriteModels(frames, SPRITE_SHEETS.EFFECTS)
    );
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
