import { Actor } from "../Engine/Actor";
import ITankDetail from "../Engine/Interfaces/ITankDetail";

export default abstract class TankAbstraction extends Actor {
  abstract getDetail<T>(type: { new (...args: any): T }): null | T;

  abstract addDetail(detail: ITankDetail): void;

  abstract moveForward(): void;

  abstract moveBackward(): void;

  abstract rotateRight(): void;

  abstract rotateLeft(): void;
}
