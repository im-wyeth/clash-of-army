import { EFFECTS_DATA } from "./Configs";
import WorldEffect from "./WorldEffect";

export default class WorldEffectManager {
  effects;

  constructor(game) {
    this.game = game;

    this.effects = [];

    for (const effectKey in EFFECTS_DATA) {
      this.addEffect(effectKey, EFFECTS_DATA[effectKey].frames);
    }
  }

  getEffects() {
    return this.effects;
  }

  addEffect(name, frames) {
    // test
    const QUANTITY_OF_EFFECTS = 10;

    for (let i = 0; i < QUANTITY_OF_EFFECTS; ++i) {
      const newEffect = new WorldEffect(this.game, name, frames);
      this.effects.push(newEffect);
    }
  }

  activateEffect(name, x, y, rad) {
    const effect = this.effects.find(
      (effect) => effect.name === name && !effect.active
    );

    effect.activate(x, y, rad);
  }

  update(tickMs) {
    for (const effect of this.effects) {
      effect.update(tickMs);
    }
  }

  render(renderer, interpolationValue) {
    for (const effect of this.effects) {
      effect.render(renderer, interpolationValue);
    }
  }
}
