import IActor from "../Interfaces/IActor";
import { ShapeTypes } from "../Types";
import { BaseComponent } from "./BaseComponent";

export class Shape extends BaseComponent {
  private readonly _concreteShape: ShapeTypes;

  constructor(actor: IActor, concreteShape: ShapeTypes) {
    super(actor);

    this._concreteShape = concreteShape;
  }

  getConcreteShape(): ShapeTypes {
    return this._concreteShape;
  }
}
