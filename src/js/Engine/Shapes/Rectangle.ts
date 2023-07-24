import IActor from "../Interfaces/IActor";
import IShape from "../Interfaces/IShape";
import IRenderer from "../Interfaces/IRenderer";
import IVector2 from "../Interfaces/IVector2";

export class Rectangle implements IShape {
  readonly type = "rectangle";

  constructor(private readonly _size: IVector2) {}

  render(
    renderer: IRenderer,
    actor: IActor,
    color: string,
    lineColor: string,
    lineWidth: number,
    alpha?: number
  ): void {
    const position = actor.getPosition();

    renderer.drawRectangle(
      position.x,
      position.y,
      this._size.x,
      this._size.y,
      actor.getRadians(),
      color,
      this._size.x / 2,
      this._size.y / 2,
      lineColor,
      lineWidth,
      alpha
    );
  }
}
