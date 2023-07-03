import { ActorComponents } from "../";
import IActor from "../Interfaces/IActor";
import IActorRenderer from "../Interfaces/IActorsRenderer";
import IRectangle from "../Interfaces/IRectangle";
import IRenderer from "../Interfaces/IRenderer";
import IResourceManager from "../Interfaces/IResourceManager";
import { isRectangle } from "../TypeGuards";

export class ActorsRenderer implements IActorRenderer {
  private readonly _renderer: IRenderer;
  private readonly _resourceManager: IResourceManager;

  constructor(renderer: IRenderer, resourceManager: IResourceManager) {
    this._renderer = renderer;
    this._resourceManager = resourceManager;
  }

  _drawSprite(actor: IActor, sprite: ActorComponents.Sprite): void {
    const spriteSheet = this._resourceManager
      .getSpriteSheets()
      .get(sprite.getSheetName());

    if (!spriteSheet) {
      return;
    }

    this._renderer.drawImage(
      spriteSheet,
      actor.getPosition().x,
      actor.getPosition().y,
      sprite.getSize().x,
      sprite.getSize().y,
      actor.getRadians(),
      sprite.getSource().x,
      sprite.getSource().y,
      sprite.getSize().x,
      sprite.getSize().y,
      sprite.getOrigin().x,
      sprite.getOrigin().y
    );
  }

  _drawShape(shapeComponent: ActorComponents.Shape): void {
    const shape = shapeComponent.getConcreteShape();

    if (isRectangle(shape)) {
      this._drawRectangle(shape);
    }
  }

  _drawRectangle(shape: IRectangle): void {}

  renderActor(actor: IActor) {
    const sprite = actor.getComponent(ActorComponents.Sprite);
    const shape = actor.getComponent(ActorComponents.Shape);

    if (sprite) {
      this._drawSprite(actor, sprite);
    }
    if (shape) {
      this._drawShape(shape);
    }
  }
}
