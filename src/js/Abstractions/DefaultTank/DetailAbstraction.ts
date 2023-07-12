import { Actor } from "../../Engine";
import IVector2 from "../../Engine/Interfaces/IVector2";

export default abstract class DetailAbstraction extends Actor {
  abstract getPositionOnTank(): IVector2;
}
