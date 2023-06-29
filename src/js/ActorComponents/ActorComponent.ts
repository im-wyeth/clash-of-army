import IActor from "../Interfaces/IActor";
import IActorComponent from "../Interfaces/IActorComponent";

export default abstract class ActorComponent implements IActorComponent {
  constructor(protected readonly _actor: IActor) {}

  getActor(): IActor {
    return this._actor;
  }
}
