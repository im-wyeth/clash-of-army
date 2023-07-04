import { SpriteDataType } from "../Engine/Types/SpriteData.Type";
import { TankDataType } from "../Types/TankData.Type";
import { TankDetailDataTypes } from "../Types/TankDetailDataTypes.Type";

export default class TankData implements TankDataType {
  constructor(
    readonly spriteData: SpriteDataType,
    readonly rotationSpeed: number,
    readonly details: Array<TankDetailDataTypes>
  ) {}
}
