import { LOOP_TIME_STEP } from "./Configs";

export default class Loop {
  constructor() {
    this._onUpdateCB = null;
    this._onRenderCB = null;

    this._previousTimeStemp = Date.now();
    this._lag = 0;

    this._isDestroyed = false;
  }

  init() {
    // cross browser change
    window.requestAnimationFrame(this.loop.bind(this));
  }

  loop() {
    if (this._isDestroyed) {
      return;
    }

    window.requestAnimationFrame(this.loop.bind(this));

    const currentTimeStemp = Date.now();
    const elapsedTime = currentTimeStemp - this._previousTimeStemp;

    this._previousTimeStemp = currentTimeStemp;
    this._lag += elapsedTime;

    while (this._lag >= LOOP_TIME_STEP) {
      this._lag -= LOOP_TIME_STEP;

      if (this._onUpdateCB) {
        this._onUpdateCB(LOOP_TIME_STEP);
      }
    }

    const interpolationValue = this.lag / LOOP_TIME_STEP;
    this._onRenderCB(interpolationValue);
  }

  onUpdate(cb) {
    this._onUpdateCB = cb;
  }

  onRender(cb) {
    this._onRenderCB = cb;
  }

  destroy() {
    this._isDestroyed = true;
  }
}
