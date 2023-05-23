import IActorAction from "./IActorAction";
import IActorCollision from "./IActorCollision";
import IActorComponent from "./IActorComponent";

export default interface IActor {
  getComponents(): Map<string, IActorComponent>;

  getActions(): Map<string, IActorAction>;

  getCollision(): null | IActorCollision;

  addComponent(name: string, component: IActorComponent): void;

  addAction(name: string, action: IActorAction): void;

  setCollision(collision: IActorCollision): void;

  update?(timeStep: number): void;
}
