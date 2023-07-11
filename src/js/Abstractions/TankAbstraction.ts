import { Actor } from "../Engine/Actor";
import TankDetailAbstraction from "./TankDetailAbstraction";

export default abstract class TankAbstraction extends Actor {
  abstract getDetail<T>(type: { new (...args: any): T }): null | T;

  abstract addDetail(detail: TankDetailAbstraction): void;

  abstract moveForward(): void;

  abstract moveBackward(): void;

  abstract rotateRight(): void;

  abstract rotateLeft(): void;
}
