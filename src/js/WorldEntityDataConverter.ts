import ISpriteData from "./Interfaces/ISpriteData";
import ITankData from "./Interfaces/ITankData";
import ITankTurretData from "./Interfaces/ITankTurretData";
import SpriteData from "./SpriteData";
import TankData from "./TankData";
import TankTurretData from "./TankTurretData";
import Vector2 from "./Engine/Vector2";

export default class WorldEntityDataConverter {
  private _spriteDataToModel(spriteData: any): ISpriteData {
    return new SpriteData(
      spriteData.sheet_name,
      new Vector2(spriteData.size.x, spriteData.size.y),
      new Vector2(spriteData.source.x, spriteData.source.y),
      new Vector2(spriteData.origin.x, spriteData.origin.y)
    );
  }

  private _tankTurretDataToModel(turretData: any): ITankTurretData {
    const spriteData = this._spriteDataToModel(turretData.sprite);

    return new TankTurretData(spriteData);
  }

  tankDataToModel(tankData: any): ITankData {
    const spriteData = this._spriteDataToModel(tankData.sprite);
    const turretData = this._tankTurretDataToModel(tankData.turret);

    return new TankData(spriteData, turretData);
  }
}
