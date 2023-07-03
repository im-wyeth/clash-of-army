import { SpriteDataType } from "./Engine/Types/SpriteData.Type";
import { TankTurretDataType } from "./Types/TankTurretData.Type";

export default class TankTurretData implements TankTurretDataType {
  constructor(
    public spriteData: SpriteDataType,
    public rotationSpeed: number
  ) {}
}
