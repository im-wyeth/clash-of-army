import { Actor } from "../Engine";
import IVector2 from "../Engine/Interfaces/IVector2";

export default abstract class TankEngineAbstraction extends Actor {
  abstract isDestroyed(): boolean;

  abstract getPositionOnTank(): IVector2;
}
