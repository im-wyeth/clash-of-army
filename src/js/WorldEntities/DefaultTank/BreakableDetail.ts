import DetailAbstraction from "../../Abstractions/DefaultTank/DetailAbstraction";
import IVector2 from "../../Engine/Interfaces/IVector2";
import { Detail } from "./Detail";

export class BreakableDetail extends Detail {
  private readonly _isDestroyed: boolean = false;

  constructor(positionOnTank: IVector2) {
    super(positionOnTank);
  }

  isDestroyed(): boolean {
    return this._isDestroyed;
  }

  updatePositionOnTank(
    tankPosition: IVector2,
    leftTopCornerOfTank: IVector2,
    radians: number
  ): void {
    this.setPosition(
      leftTopCornerOfTank
        .add(this._positionOnTank)
        .rotateAround(tankPosition, radians)
    );

    this._radians = radians;
  }
}
