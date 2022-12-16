import { SPRITE_SHEETS, EFFECTS_DATA } from "./Configs";

import Effect from "./Effect";
import SpriteFrame from "./SpriteFrame";

// test
const QUANTITY_OF_EFFECTS = 10;

export default class EffectManager {
  game;

  effects;

  constructor(game) {
    this.game = game;

    this.effects = [];

    for (const effectName in EFFECTS_DATA) {
      this.addEffect(effectName, EFFECTS_DATA[effectName]);
    }
  }

  addEffect(name, effect) {
    for (let i = 0; i < QUANTITY_OF_EFFECTS; ++i) {
      const frames = this.createEffectFrames(effect.frames);

      this.effects.push(new Effect(this.game, name, frames));
    }
  }

  createEffectFrames(frames) {
    return frames.map(
      (frame) =>
        new SpriteFrame(
          frame.x,
          frame.y,
          frame.w,
          frame.h,
          SPRITE_SHEETS.EFFECTS
        )
    );
  }

  activateEffect(name, x, y, rad) {
    const effect = this.effects.find(
      (effect) => effect.name === name && !effect.active
    );

    effect.activate(x, y, rad);
  }

  loop(dt, renderer) {
    for (const effect of this.effects) {
      if (!effect.active) break;

      effect.update(dt);
      effect.render(renderer);
    }
  }
}
