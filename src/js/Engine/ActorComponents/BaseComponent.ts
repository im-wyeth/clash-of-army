import IActor from "../Interfaces/IActor";
import IActorComponent from "../Interfaces/IActorComponent";

export abstract class BaseComponent implements IActorComponent {
  constructor(protected readonly _actor: IActor) {}

  getActor(): IActor {
    return this._actor;
  }
}
