import Actor from "../Engine/Actor";
import IVector2 from "../Interfaces/IVector2";

export default abstract class TurretAbstraction extends Actor {
  abstract rotateTo(point: IVector2): void;
}
