import ISpriteData from "./Interfaces/ISpriteData";
import ITankTurretData from "./Interfaces/ITankTurretData";

export default class TankTurretData implements ITankTurretData {
  constructor(private readonly _spriteData: ISpriteData) {}

  getSpriteData(): ISpriteData {
    return this._spriteData;
  }
}
