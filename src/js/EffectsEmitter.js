import Effect from "./Effect";
import SpriteFrame from "./SpriteFrame";

const QUANTITY_OF_EFFECTS = 10;

export default class EffectsEmitter {
  renderer;
  effects;

  constructor(renderer, effects) {
    this.renderer = renderer;
    this.effects = [];

    for (const effectName in effects) {
      this.addEffect(effectName, effects[effectName]);
    }
  }

  addEffect(name, effect) {
    for (let i = 0; i < QUANTITY_OF_EFFECTS; ++i) {
      const frames = this.createEffectFrames(effect.frames);

      this.effects.push(new Effect(this.renderer, name, frames));
    }
  }

  createEffectFrames(frames) {
    return frames.map(
      (frame) => new SpriteFrame(frame.x, frame.y, frame.w, frame.h, "effects")
    );
  }

  activateEffect(name, x, y, rad) {
    const effect = this.effects.find(
      (effect) => effect.name === name && !effect.active
    );

    effect.activate(x, y, rad);
  }

  update(dt) {
    for (const effect of this.effects) {
      if (effect.active) effect.update(dt);
    }
  }

  render(sprites) {
    for (const effect of this.effects) {
      if (effect.active) effect.render(sprites);
    }
  }
}
