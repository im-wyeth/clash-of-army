import { SpriteDataType } from "../Engine/Types/SpriteData.Type";
import { TankTurretDataType } from "./TankTurretData.Type";

export type TankDataType = {
  spriteData: SpriteDataType;
  tankTurretData: TankTurretDataType;
  rotationSpeed: number;
};
