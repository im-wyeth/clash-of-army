import IActorAccelerationComponent from "./IActorAccelerationComponent";
import IActorRotationComponent from "./IActorRotationComponent";
import IActorSpriteComponent from "./IActorSpriteComponent";
import IVector2 from "./IVector2";

export type ComponentList = [
  sprite: undefined | IActorSpriteComponent,
  acceleration: undefined | IActorAccelerationComponent,
  rotation: undefined | IActorRotationComponent
];

export default interface IActor {
  getPosition(): IVector2;

  getDirection(): IVector2;

  getComponents(): ComponentList;

  getRadians(): number;

  setPosition(position: IVector2): void;

  setDirection(direction: IVector2): void;

  update?(timeStep: number): void;
}
