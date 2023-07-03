import { Actor } from "../../Engine";
import { ITankDetail } from "../../Interfaces/ITankDetail";

export default class TankEngine extends Actor implements ITankDetail {
  private readonly _isDestroyed: boolean = false;

  isDestroyed(): boolean {
    return this._isDestroyed;
  }
}
