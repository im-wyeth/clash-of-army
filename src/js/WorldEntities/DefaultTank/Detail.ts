import DetailAbstraction from "../../Abstractions/DefaultTank/DetailAbstraction";
import IVector2 from "../../Engine/Interfaces/IVector2";

export default class Detail extends DetailAbstraction {
  private readonly _positionOnTank: IVector2;

  constructor(positionOnTank: IVector2) {
    super();

    this._positionOnTank = positionOnTank;
  }

  getPositionOnTank(): IVector2 {
    return this._positionOnTank;
  }
}
