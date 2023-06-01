import IActorPositionComponent from "../Interfaces/IActorPositionComponent";
import IVector2 from "../Interfaces/IVector2";

export default class ActorPositionComponent implements IActorPositionComponent {
  private readonly _position: IVector2;

  constructor(position: IVector2) {
    this._position = position;
  }

  getPosition(): IVector2 {
    return this._position;
  }

  setPosition(newPos: IVector2) {
    this._position.x = newPos.x;
    this._position.y = newPos.y;
  }
}
