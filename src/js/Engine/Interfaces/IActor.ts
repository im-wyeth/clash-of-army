import IActorComponent from "./IActorComponent";
import IVector2 from "./IVector2";

export default interface IActor {
  getComponent<T>(type: { new (...args: any): T }): null | T;

  getComponents(): Array<IActorComponent>;

  getPosition(): IVector2;

  getDirection(): IVector2;

  getRadians(): number;

  setComponent(component: IActorComponent): void;

  setPosition(position: IVector2): void;

  setDirection(direction: IVector2): void;

  setRadians(radians: number): void;

  update?(timeStep: number): void;
}
