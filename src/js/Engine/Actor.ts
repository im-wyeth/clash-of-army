import IActor from "../Interfaces/IActor";
import IActorAction from "../Interfaces/IActorAction";
import IActorCollision from "../Interfaces/IActorCollision";
import IActorComponent from "../Interfaces/IActorComponent";

export default abstract class Actor implements IActor {
  private _components: Map<string, IActorComponent> = new Map();
  private _actions: Map<string, IActorAction> = new Map();

  private _collision: null | IActorCollision = null;

  constructor() {}

  getComponents(): Map<string, IActorComponent> {
    return this._components;
  }

  getCollision(): null | IActorCollision {
    return this._collision;
  }

  getActions(): Map<string, IActorAction> {
    return this._actions;
  }

  addComponent(name: string, component: IActorComponent): void {
    this._components.set(name, component);
  }

  addAction(name: string, action: IActorAction): void {
    this._actions.set(name, action);
  }

  setCollision(collision: IActorCollision) {
    this._collision = collision;
  }
}
