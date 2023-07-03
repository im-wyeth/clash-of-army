import { SpriteDataType } from "./Engine/Types/SpriteData.Type";
import { TankDataType } from "./Types/TankData.Type";
import { TankTurretDataType } from "./Types/TankTurretData.Type";

export default class TankData implements TankDataType {
  constructor(
    public readonly spriteData: SpriteDataType,
    public readonly tankTurretData: TankTurretDataType,
    public readonly rotationSpeed: number
  ) {}
}
