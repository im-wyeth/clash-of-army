import DetailAbstraction from "../../Abstractions/DefaultTank/DetailAbstraction";
import IVector2 from "../../Engine/Interfaces/IVector2";

export class Detail extends DetailAbstraction {
  protected readonly _positionOnTank: IVector2;

  constructor(positionOnTank: IVector2) {
    super();

    this._positionOnTank = positionOnTank;
  }

  getPositionOnTank(): IVector2 {
    return this._positionOnTank;
  }
}
