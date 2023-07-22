import IActor from "../Interfaces/IActor";
import IShape from "../Interfaces/IShape";
import { BaseComponent } from "./BaseComponent";

export class Shape extends BaseComponent {
  private readonly _concreteShape: IShape;

  private _renderable: boolean = true;

  constructor(actor: IActor, concreteShape: IShape) {
    super(actor);

    this._concreteShape = concreteShape;
  }

  getConcreteShape(): IShape {
    return this._concreteShape;
  }

  isRenderable(): boolean {
    return this._renderable;
  }

  setRenderable(value: boolean): void {
    this._renderable = value;
  }
}
