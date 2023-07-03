import ISpriteData from "./Engine/Interfaces/ISpriteData";
import ITankData from "./Interfaces/ITankData";
import ITankTurretData from "./Interfaces/ITankTurretData";

export default class TankData implements ITankData {
  constructor(
    private readonly _spriteData: ISpriteData,
    private readonly _tankTurretData: ITankTurretData,
    private readonly _rotationSpeed: number
  ) {}

  getSpriteData(): ISpriteData {
    return this._spriteData;
  }

  getTurretData(): ITankTurretData {
    return this._tankTurretData;
  }

  getRotationSpeed(): number {
    return this._rotationSpeed;
  }
}
