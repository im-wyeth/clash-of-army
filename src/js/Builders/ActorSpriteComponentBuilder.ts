import ActorSpriteComponent from "../ActorComponents/ActorSpriteComponent";
import IActorSpriteComponent from "../Interfaces/IActorSpriteComponent";
import IActorSpriteComponentBuilder from "../Interfaces/IActorSpriteComponentBuilder";
import IVector2 from "../Interfaces/IVector2";
import Vector2 from "../Vector2";

export default class ActorSpriteComponentBuilder
  implements IActorSpriteComponentBuilder
{
  private _spriteSheetName: string = "";
  private _size: IVector2 = new Vector2(0, 0);
  private _source: IVector2 = new Vector2(0, 0);

  setSpriteSheetName(spriteSheetName: string): IActorSpriteComponentBuilder {
    this._spriteSheetName = spriteSheetName;

    return this;
  }

  setSize(w: number, h: number): IActorSpriteComponentBuilder {
    this._size.x = w;
    this._size.y = h;

    return this;
  }

  setSource(x: number, y: number): IActorSpriteComponentBuilder {
    this._source.x = x;
    this._source.y = y;

    return this;
  }

  build(): IActorSpriteComponent {
    const spriteComponent = new ActorSpriteComponent(
      this._spriteSheetName,
      new Vector2(this._source.x, this._source.y),
      new Vector2(this._size.x, this._size.y)
    );

    return spriteComponent;
  }
}
