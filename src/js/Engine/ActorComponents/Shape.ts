import IActor from "../Interfaces/IActor";
import IConcreteShape from "../Interfaces/IConcreteShape";
import { BaseComponent } from "./BaseComponent";

export default class Shape extends BaseComponent {
  private readonly _concreteShape: IConcreteShape;

  constructor(actor: IActor, concreteShape: IConcreteShape) {
    super(actor);

    this._concreteShape = concreteShape;
  }

  getShape(): IConcreteShape {
    return this._concreteShape;
  }
}
