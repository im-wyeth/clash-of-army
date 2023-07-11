import { SpriteDataType } from "../Engine/Types/SpriteData.Type";
import ITankDetailData from "../Interfaces/ITankDetailData";

export type TankDataType = {
  spriteData: SpriteDataType;
  rotationSpeed: number;
  details: Array<ITankDetailData>;
};
