import { SpriteDataType } from "../Engine/Types/SpriteData.Type";
import { TankDetailDataTypes } from "./TankDetailDataTypes.Type";

export type TankDataType = {
  spriteData: SpriteDataType;
  rotationSpeed: number;
  details: Array<TankDetailDataTypes>;
};
