import Effect from "./Effect";
import SpriteFrame from "./SpriteFrame";

const QUANTITY_OF_EFFECTS = 10;

export default class EffectsEmitter {
  effects;

  constructor(effects) {
    this.effects = [];

    for (const effectName in effects) {
      this.addEffect(effectName, effects[effectName]);
    }
  }

  addEffect(name, effect) {
    for (let i = 0; i < QUANTITY_OF_EFFECTS; ++i) {
      const frames = this.createEffectFrames(effect.frames);

      this.effects.push(new Effect(name, frames));
    }
  }

  createEffectFrames(frames) {
    return frames.map(
      (frame) => new SpriteFrame(frame.x, frame.y, frame.w, frame.h)
    );
  }
}
