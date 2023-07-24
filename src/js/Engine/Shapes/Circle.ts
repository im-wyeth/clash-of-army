import IActor from "../Interfaces/IActor";
import IShape from "../Interfaces/IShape";
import IRenderer from "../Interfaces/IRenderer";

export class Circle implements IShape {
  readonly type = "circle";

  constructor(private readonly _radius: number) {}

  render(
    renderer: IRenderer,
    actor: IActor,
    color: string,
    alpha?: number
  ): void {
    const position = actor.getPosition();

    renderer.drawCircle(
      position.x,
      position.y,
      this._radius,
      actor.getRadians(),
      color,
      this._radius / 2,
      this._radius / 2,
      alpha
    );
  }
}
