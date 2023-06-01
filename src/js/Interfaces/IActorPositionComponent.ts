import IVector2 from "./IVector2";

export default interface IActorPositionComponent {
  getPosition(): IVector2;

  setPosition(newPos: IVector2): void;
}
