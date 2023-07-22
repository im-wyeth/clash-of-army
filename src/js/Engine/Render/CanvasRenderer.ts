import IRenderer from "../Interfaces/IRenderer";
import IVector2 from "../Interfaces/IVector2";
import IVector2Manager from "../Interfaces/IVector2Manager";
import { Vector2 } from "../Vector2";

export class CanvasRenderer implements IRenderer {
  private readonly _canvas: HTMLCanvasElement;
  private readonly _ctx: null | CanvasRenderingContext2D;

  private readonly _vector2Manager: IVector2Manager;

  private readonly _scale: IVector2 = new Vector2(1, 1);

  constructor(canvas: HTMLCanvasElement, vector2Manager: IVector2Manager) {
    this._canvas = canvas;
    this._ctx = canvas.getContext("2d");

    this._vector2Manager = vector2Manager;
  }

  setScaling(scale: IVector2): void {
    this._scale.x = scale.x;
    this._scale.y = scale.y;
  }

  start(offset: IVector2): void {
    if (!this._ctx) {
      return;
    }

    this._clear();

    this._ctx.save();

    this._ctx.scale(this._scale.x, this._scale.y);

    this._ctx.translate(-offset.x, -offset.y);
  }

  end(): void {
    if (!this._ctx) {
      return;
    }

    this._ctx.restore();
  }

  private _pivotPointFromOrigin(
    originX: number,
    originY: number,
    halfWidth: number,
    halfHeight: number,
    positionX: number,
    positionY: number
  ): IVector2 {
    return this._vector2Manager.getNew(
      positionX - halfWidth + originX,
      positionY - halfHeight + originY
    );
  }

  antialiasing(val: boolean) {
    if (this._ctx) this._ctx.imageSmoothingEnabled = val;
  }

  private _clear() {
    if (!this._ctx) return;

    this._ctx.clearRect(
      0,
      0,
      this._canvas.clientWidth,
      this._canvas.clientHeight
    );
  }

  drawImage(
    img: HTMLImageElement,
    x: number,
    y: number,
    w: number,
    h: number,
    r: number,
    sX: number,
    sY: number,
    sW: number,
    sH: number,
    originX: number,
    originY: number
  ) {
    if (!this._ctx) return;

    const halfWidth = w / 2;
    const halfHeight = h / 2;

    const pivotPoint: IVector2 = this._pivotPointFromOrigin(
      originX,
      originY,
      halfWidth,
      halfHeight,
      x,
      y
    );

    this._ctx.save();
    this._ctx.translate(pivotPoint.x, pivotPoint.y);
    this._ctx.rotate(r);
    this._ctx.translate(-pivotPoint.x, -pivotPoint.y);
    this._ctx.drawImage(
      img,
      sX,
      sY,
      sW,
      sH,
      x - halfWidth,
      y - halfHeight,
      w,
      h
    );
    this._ctx.restore();
  }

  drawRectangle(
    x: number,
    y: number,
    w: number,
    h: number,
    r: number,
    color: string,
    originX: number,
    originY: number
  ) {
    if (!this._ctx) return;

    const halfWidth = w / 2;
    const halfHeight = h / 2;

    const pivotPoint: IVector2 = this._pivotPointFromOrigin(
      originX,
      originY,
      halfWidth,
      halfHeight,
      x,
      y
    );

    this._ctx.save();
    this._ctx.fillStyle = color;
    this._ctx.translate(pivotPoint.x, pivotPoint.y);
    this._ctx.rotate(r);
    this._ctx.translate(-pivotPoint.x, -pivotPoint.y);
    this._ctx.fillRect(x - halfWidth, y - halfHeight, w, h);
    this._ctx.restore();
  }

  drawText(
    text: string,
    font: string,
    color: string,
    size: number,
    x: number,
    y: number
  ) {
    if (!this._ctx) return;

    this._ctx.save();

    this._ctx.font = `${size}px ${font}`;
    this._ctx.fillStyle = color;
    this._ctx.fillText(text, x, y);

    this._ctx.restore();
  }
}
