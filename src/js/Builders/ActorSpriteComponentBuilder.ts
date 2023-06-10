import ActorSpriteComponent from "../ActorComponents/ActorSpriteComponent";
import IActorSpriteComponent from "../Interfaces/IActorSpriteComponent";
import IActorSpriteComponentBuilder from "../Interfaces/IActorSpriteComponentBuilder";
import IVector2 from "../Interfaces/IVector2";
import Vector2 from "../Engine/Vector2";

export default class ActorSpriteComponentBuilder
  implements IActorSpriteComponentBuilder
{
  private _spriteSheetName: string = "";
  private _size: IVector2 = new Vector2(0, 0);
  private _source: IVector2 = new Vector2(0, 0);
  private _origin: IVector2 = new Vector2(0, 0);

  setSpriteSheetName(spriteSheetName: string): IActorSpriteComponentBuilder {
    this._spriteSheetName = spriteSheetName;

    return this;
  }

  setSize(size: IVector2): IActorSpriteComponentBuilder {
    this._size.x = size.x;
    this._size.y = size.y;

    return this;
  }

  setSource(source: IVector2): IActorSpriteComponentBuilder {
    this._source.x = source.x;
    this._source.y = source.y;

    return this;
  }

  setOrigin(origin: IVector2): IActorSpriteComponentBuilder {
    this._origin.x = origin.x;
    this._origin.y = origin.y;

    return this;
  }

  build(): IActorSpriteComponent {
    const spriteComponent = new ActorSpriteComponent(
      this._spriteSheetName,
      new Vector2(this._source.x, this._source.y),
      new Vector2(this._size.x, this._size.y),
      new Vector2(this._origin.x, this._origin.y)
    );

    return spriteComponent;
  }
}
