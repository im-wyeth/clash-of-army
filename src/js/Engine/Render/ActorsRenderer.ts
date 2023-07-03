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

  _drawRectangle(shape: IRectangle, actor: IActor): void {
    const position = actor.getPosition();
    const size = shape.getSize();

    this._renderer.drawRectangle(
      position.x,
      position.y,
      size.x,
      size.y,
      actor.getRadians(),
      "green",
      size.x / 2,
      size.y / 2
    );
  }

  renderActor(actor: IActor) {
    const spriteComponent = actor.getComponent(ActorComponents.Sprite);
    const shapeComponent = actor.getComponent(ActorComponents.Shape);

    if (spriteComponent) {
      this._drawSprite(actor, spriteComponent);
    }

    if (shapeComponent) {
      const shape = shapeComponent.getConcreteShape();

      if (isRectangle(shape)) {
        this._drawRectangle(shape, actor);
      }
    }
  }
}
