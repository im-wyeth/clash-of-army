import IVector2 from "../Engine/Interfaces/IVector2";
import { SpriteDataType } from "../Engine/Types/SpriteData.Type";

export type TankTurretDataType = {
  spriteData: SpriteDataType;
  rotationSpeed: number;
  positionOnTank: IVector2;
};
