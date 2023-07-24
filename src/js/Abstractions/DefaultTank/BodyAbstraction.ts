import { Actor } from "../../Engine/Actor";
import { Engine, Turret, Caterpillar } from "../../WorldEntities/DefaultTank";
import { Ammunition } from "../../WorldEntities/DefaultTank/Ammunition";
import { Armor } from "../../WorldEntities/DefaultTank/Armor";
import { Cistern } from "../../WorldEntities/DefaultTank/Cistern";
import { Transmission } from "../../WorldEntities/DefaultTank/Transmission";
import { TurretMechanism } from "../../WorldEntities/DefaultTank/TurretMechanism";

export default abstract class BodyAbstraction extends Actor {
  abstract getTurret(): Turret;

  abstract getEngine(): Engine;

  abstract getRightCaterpillar(): Caterpillar;

  abstract getLeftCaterpillar(): Caterpillar;

  abstract getAmmunition(): Ammunition;

  abstract getTurretMehchanism(): TurretMechanism;

  abstract getCistern(): Cistern;

  abstract getTransmission(): Transmission;

  abstract getArmors(): Array<Armor>;

  abstract setRotationSpeed(speed: number): void;

  abstract setArmors(armors: Array<Armor>): void;

  abstract moveForward(): void;

  abstract moveBackward(): void;

  abstract rotateRight(): void;

  abstract rotateLeft(): void;
}
