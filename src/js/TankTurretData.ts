import ISpriteData from "./Engine/Interfaces/ISpriteData";
import ITankTurretData from "./Interfaces/ITankTurretData";

export default class TankTurretData implements ITankTurretData {
  constructor(
    private readonly _spriteData: ISpriteData,
    private readonly _rotationSpeed: number
  ) {}

  getSpriteData(): ISpriteData {
    return this._spriteData;
  }

  getRotationSpeed(): number {
    return this._rotationSpeed;
  }
}
