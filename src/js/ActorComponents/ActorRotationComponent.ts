import IActor from "../Interfaces/IActor";
import IActorRotationComponent from "../Interfaces/IActorRotationComponent";
import IVector2 from "../Interfaces/IVector2";
import ActorComponent from "./ActorComponent";

export default class ActorRotationComponent extends ActorComponent {
  private _rotationSpeed: number = 0.001;

  constructor(actor: IActor) {
    super(actor);
  }

  rotateToPoint(point: IVector2) {}
}
