import { SPRITE_SHEETS, EFFECTS, EFFECTS_DATA } from "./Configs";

import Effect from "./Effect";

// test
const QUANTITY_OF_EFFECTS = 10;

export default class EffectManager {
  game;

  effects;

  constructor(game) {
    this.game = game;

    this.effects = [];

    for (const effectKey in EFFECTS) {
      const effectName = EFFECTS[effectKey];

      this.addEffect(effectName, EFFECTS_DATA[effectName].frames);
    }
  }

  addEffect(name, frames) {
    for (let i = 0; i < QUANTITY_OF_EFFECTS; ++i) {
      this.effects.push(new Effect(this.game, name, frames));
    }
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
