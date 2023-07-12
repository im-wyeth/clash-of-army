import { Actor } from "../../Engine/Actor";
import { Turret } from "../../WorldEntities/DefaultTank";

export default abstract class BodyAbstraction extends Actor {
  abstract getTurret(): Turret;

  abstract moveForward(): void;

  abstract moveBackward(): void;

  abstract rotateRight(): void;

  abstract rotateLeft(): void;
}
