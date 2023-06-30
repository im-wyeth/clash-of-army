import ILoop from "./Interfaces/ILoop";

export class Loop implements ILoop {
  private readonly _timeStep: number;

  private _onUpdateCB: Array<Function> = [];
  private _onRenderCB: Array<Function> = [];

  private _previousTimeStemp: number;
  private _lag: number;

  private _isDestroyed: boolean;

  constructor(timeStep: number) {
    this._timeStep = timeStep;

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

      for (const cb of this._onUpdateCB) {
        cb(this._timeStep);
      }
    }

    const interpolationValue = this._lag / this._timeStep;
    for (const cb of this._onRenderCB) {
      cb(interpolationValue);
    }
  }

  onUpdate(cb: Function) {
    this._onUpdateCB.push(cb);
  }

  onRender(cb: Function) {
    this._onRenderCB.push(cb);
  }

  destroy() {
    this._isDestroyed = true;
  }
}
