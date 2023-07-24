import DetailAbstraction from "../../Abstractions/DefaultTank/DetailAbstraction";
import IVector2 from "../../Engine/Interfaces/IVector2";

export class Transmission extends DetailAbstraction {
  private readonly _isDestroyed: boolean = false;

  private readonly _positionOnTank: IVector2;

  constructor(positionOnTank: IVector2) {
    super();

    this._positionOnTank = positionOnTank;
  }

  isDestroyed(): boolean {
    return this._isDestroyed;
  }

  getPositionOnTank(): IVector2 {
    return this._positionOnTank;
  }
}
