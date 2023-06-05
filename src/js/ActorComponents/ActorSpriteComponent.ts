import IActorSpriteComponent from "../Interfaces/IActorSpriteComponent";
import IVector2 from "../Interfaces/IVector2";

export default class ActorSpriteComponent implements IActorSpriteComponent {
  private _spriteSheetName: string;
  private _source: IVector2;
  private _size: IVector2;
  private _origin: IVector2;

  constructor(
    spriteSheetName: string,
    source: IVector2,
    size: IVector2,
    origin: IVector2
  ) {
    this._spriteSheetName = spriteSheetName;
    this._source = source;
    this._size = size;
    this._origin = origin;
  }

  getSpriteSheetName(): string {
    return this._spriteSheetName;
  }

  getSource(): IVector2 {
    return this._source;
  }

  getSize(): IVector2 {
    return this._size;
  }

  getOrigin(): IVector2 {
    return this._origin;
  }
}
