import { Actor } from "../../Engine";

export default class TankEngine extends Actor {
  private readonly _isDestroyed: boolean = false;

  isDestroyed(): boolean {
    return this._isDestroyed;
  }
}
