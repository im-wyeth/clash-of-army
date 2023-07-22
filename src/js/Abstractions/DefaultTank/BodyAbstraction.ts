import { Actor } from "../../Engine/Actor";
import { Engine, Turret, Caterpillar } from "../../WorldEntities/DefaultTank";

export default abstract class BodyAbstraction extends Actor {
  abstract getTurret(): Turret;

  abstract getEngine(): Engine;

  abstract getRightCaterpillar(): Caterpillar;

  abstract getLeftCaterpillar(): Caterpillar;

  abstract moveForward(): void;

  abstract moveBackward(): void;

  abstract rotateRight(): void;

  abstract rotateLeft(): void;
}
