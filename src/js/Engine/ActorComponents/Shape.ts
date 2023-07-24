import IActor from "../Interfaces/IActor";
import IShape from "../Interfaces/IShape";
import { BaseComponent } from "./BaseComponent";

export class Shape extends BaseComponent {
  private readonly _concreteShape: IShape;

  private _renderable: boolean = true;
  private _alpha: number = 1;
  private _color: string = "green";
  private _lineColor: string = "black";
  private _lineWidth: number = 1;

  constructor(actor: IActor, concreteShape: IShape) {
    super(actor);

    this._concreteShape = concreteShape;
  }

  getConcreteShape(): IShape {
    return this._concreteShape;
  }

  getAlpha(): number {
    return this._alpha;
  }

  getColor(): string {
    return this._color;
  }

  getLineColor(): string {
    return this._lineColor;
  }

  getLineWidth(): number {
    return this._lineWidth;
  }

  isRenderable(): boolean {
    return this._renderable;
  }

  setRenderable(value: boolean): void {
    this._renderable = value;
  }

  setAlpha(alpha: number): void {
    this._alpha = alpha;
  }

  setColor(color: string): void {
    this._color = color;
  }

  setLineColor(color: string): void {
    this._color = color;
  }

  setLineWidth(width: number): void {
    this._lineWidth = width;
  }
}
