import IActorComponents from "./IActorComponents";
import IVector2 from "./IVector2";

export default interface IActor {
  getPosition(): IVector2;

  getDirection(): IVector2;

  getComponents(): IActorComponents;

  getRadians(): number;

  setPosition(position: IVector2): void;

  setDirection(direction: IVector2): void;

  update?(timeStep: number): void;
}
