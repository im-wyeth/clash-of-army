import { SpriteDataType } from "../Engine/Types/SpriteData.Type";
import { TankDataType } from "../Types/TankData.Type";
import { TankTurretDataType } from "../Types/TankTurretData.Type";

export default class TankData implements TankDataType {
  constructor(
    readonly spriteData: SpriteDataType,
    readonly tankTurretData: TankTurretDataType,
    readonly rotationSpeed: number
  ) {}
}
