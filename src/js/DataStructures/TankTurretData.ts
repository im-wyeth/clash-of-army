import IVector2 from "../Engine/Interfaces/IVector2";
import { SpriteDataType } from "../Engine/Types/SpriteData.Type";
import { TankTurretDataType } from "../Types/TankTurretData.Type";

export default class TankTurretData implements TankTurretDataType {
  constructor(
    readonly spriteData: SpriteDataType,
    readonly rotationSpeed: number,
    readonly positionOnTank: IVector2
  ) {}
}
