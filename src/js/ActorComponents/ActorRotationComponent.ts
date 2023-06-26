import IActor from "../Interfaces/IActor";
import IActorRotationComponent from "../Interfaces/IActorRotationComponent";
import IVector2 from "../Interfaces/IVector2";

export default class ActorRotationComponent implements IActorRotationComponent {
  private readonly _actor: IActor;
  private _rotationSpeed: number = 0.001;

  constructor(actor: IActor) {
    this._actor = actor;
  }

  rotateToPoint(point: IVector2) {}
}
