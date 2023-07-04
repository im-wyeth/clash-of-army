import IVector2 from "../Engine/Interfaces/IVector2";
import { TankEngineDataType } from "../Types/TankEngineData.Type";

export default class TankEngineData implements TankEngineDataType {
  constructor(readonly positionOnTank: IVector2) {}
}
