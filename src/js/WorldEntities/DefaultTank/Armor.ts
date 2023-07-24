import IVector2 from "../../Engine/Interfaces/IVector2";
import BreakableDetail from "./BreakableDetail";

export class Armor extends BreakableDetail {
  constructor(positionOnTank: IVector2) {
    super(positionOnTank);
  }
}
