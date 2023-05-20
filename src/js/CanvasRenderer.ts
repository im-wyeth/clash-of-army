import IRenderer from "./Interfaces/IRenderer";

export default class CanvasRenderer implements IRenderer {
  private readonly _canvas: HTMLCanvasElement;
  private readonly _ctx: CanvasRenderingContext2D;

  constructor(canvas: HTMLCanvasElement) {
    this._canvas = canvas;
    this._ctx = canvas.getContext("2d");
  }

  getCanvas() {
    return this._canvas;
  }

  getCtx() {
    return this._ctx;
  }

  antialiasing(val: boolean) {
    this._ctx.imageSmoothingEnabled = val;
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
    centerShiftX: number = 0,
    centerShiftY: number = 0
  ) {
    this._ctx.save();

    this._ctx.translate(x, y);
    this._ctx.rotate(r);
    this._ctx.translate(-w / 2 + centerShiftX, -h / 2 + centerShiftY);

    this._ctx.drawImage(img, sX, sY, sW, sH, 0, 0, w, h);

    this._ctx.restore();
  }

  drawRectangle(x: number, y: number, w: number, h: number, r: number) {
    this._ctx.save();

    this._ctx.translate(x, y);
    this._ctx.rotate(r);
    this._ctx.translate(-w / 2, -h / 2);

    this._ctx.fillRect(0, 0, w, h);

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
    this._ctx.save();

    this._ctx.font = `${size}px ${font}`;
    this._ctx.fillStyle = color;
    this._ctx.fillText(text, x, y);

    this._ctx.restore();
  }
}
