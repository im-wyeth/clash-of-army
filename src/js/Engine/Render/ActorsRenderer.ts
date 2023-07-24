import { ActorComponents } from "../";
import { Engine } from "../../WorldEntities/DefaultTank";
import IActor from "../Interfaces/IActor";
import IActorRenderer from "../Interfaces/IActorsRenderer";
import IRenderer from "../Interfaces/IRenderer";
import IResourceManager from "../Interfaces/IResourceManager";

export class ActorsRenderer implements IActorRenderer {
  private readonly _renderer: IRenderer;
  private readonly _resourceManager: IResourceManager;

  constructor(renderer: IRenderer, resourceManager: IResourceManager) {
    this._renderer = renderer;
    this._resourceManager = resourceManager;
  }

  private _drawSprite(actor: IActor, sprite: ActorComponents.Sprite): void {
    const spriteSheet = this._resourceManager
      .getSpriteSheets()
      .get(sprite.getSheetName());

    if (!spriteSheet) {
      return;
    }

    const pos = actor.getPosition();
    const size = sprite.getSize();
    const source = sprite.getSource();
    const origin = sprite.getOrigin();

    this._renderer.drawImage(
      spriteSheet,
      pos.x,
      pos.y,
      size.x,
      size.y,
      actor.getRadians(),
      source.x,
      source.y,
      size.x,
      size.y,
      origin.x,
      origin.y
    );
  }

  renderActor(actor: IActor) {
    const spriteComponent = actor.getComponent(ActorComponents.Sprite);
    const shapeComponent = actor.getComponent(ActorComponents.Shape);

    if (spriteComponent) {
      this._drawSprite(actor, spriteComponent);
    }

    if (shapeComponent) {
      if (!shapeComponent.isRenderable()) {
        return;
      }

      shapeComponent
        .getConcreteShape()
        .render(
          this._renderer,
          actor,
          shapeComponent.getColor(),
          shapeComponent.getAlpha()
        );
    }
  }
}
