import { ActorComponents, Vector2 } from "../Engine";
import IVector2 from "../Engine/Interfaces/IVector2";
import IActor from "../Engine/Interfaces/IActor";

export default class ActorSpriteComponentBuilder {
  private _spriteSheetName: string = "";
  private _size: IVector2 = new Vector2(0, 0);
  private _source: IVector2 = new Vector2(0, 0);
  private _origin: IVector2 = new Vector2(0, 0);

  setSpriteSheetName(spriteSheetName: string): ActorSpriteComponentBuilder {
    this._spriteSheetName = spriteSheetName;

    return this;
  }

  setSize(size: IVector2): ActorSpriteComponentBuilder {
    this._size.x = size.x;
    this._size.y = size.y;

    return this;
  }

  setSource(source: IVector2): ActorSpriteComponentBuilder {
    this._source.x = source.x;
    this._source.y = source.y;

    return this;
  }

  setOrigin(origin: IVector2): ActorSpriteComponentBuilder {
    this._origin.x = origin.x;
    this._origin.y = origin.y;

    return this;
  }

  build(actor: IActor): ActorComponents.Sprite {
    const spriteComponent = new ActorComponents.Sprite(
      actor,
      this._spriteSheetName,
      new Vector2(this._source.x, this._source.y),
      new Vector2(this._size.x, this._size.y),
      new Vector2(this._origin.x, this._origin.y)
    );

    return spriteComponent;
  }
}
