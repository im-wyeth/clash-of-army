import ILoop from "../Interfaces/ILoop";

export default class Loop implements ILoop {
  private readonly _timeStep: number;

  private _onUpdateCB: null | Function;
  private _onRenderCB: null | Function;

  private _previousTimeStemp: number;
  private _lag: number;

  private _isDestroyed: boolean;

  constructor(timeStep: number) {
    this._timeStep = timeStep;

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

    while (this._lag >= this._timeStep) {
      this._lag -= this._timeStep;

      if (this._onUpdateCB) {
        this._onUpdateCB(this._timeStep);
      }
    }

    const interpolationValue = this._lag / this._timeStep;
    if (this._onRenderCB) {
      this._onRenderCB(interpolationValue);
    }
  }

  onUpdate(cb: Function) {
    this._onUpdateCB = cb;
  }

  onRender(cb: Function) {
    this._onRenderCB = cb;
  }

  destroy() {
    this._isDestroyed = true;
  }
}
