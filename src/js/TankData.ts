import ISpriteData from "./Interfaces/ISpriteData";
import ITankData from "./Interfaces/ITankData";
import ITankTurretData from "./Interfaces/ITankTurretData";

export default class TankData implements ITankData {
  constructor(
    private readonly _spriteData: ISpriteData,
    private readonly _tankTurretData: ITankTurretData
  ) {}

  getSpriteData(): ISpriteData {
    return this._spriteData;
  }

  getTurretData(): ITankTurretData {
    return this._tankTurretData;
  }
}
