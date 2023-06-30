import { Actor } from "../Engine/Actor";
import TankTurretAbstraction from "./TankTurretAbstraction";

export default abstract class TankAbstraction extends Actor {
  abstract getTurret(): null | TankTurretAbstraction;

  abstract fire(): void;

  abstract moveForward(): void;

  abstract moveBackward(): void;

  abstract rotateRight(): void;

  abstract rotateLeft(): void;
}
