import ISpriteData from "./Engine/Interfaces/ISpriteData";
import ITankData from "./Interfaces/ITankData";
import ITankTurretData from "./Interfaces/ITankTurretData";
import { SpriteData } from "./Engine/SpriteData";
import TankData from "./TankData";
import TankTurretData from "./TankTurretData";
import IVector2Manager from "./Engine/Interfaces/IVector2Manager";

export default class WorldEntityDataConverter {
  constructor(private readonly _vector2Manager: IVector2Manager) {}

  private _spriteDataToModel(spriteData: any): ISpriteData {
    return new SpriteData(
      spriteData.sheet_name,
      this._vector2Manager.getNew(spriteData.size.x, spriteData.size.y),
      this._vector2Manager.getNew(spriteData.source.x, spriteData.source.y),
      this._vector2Manager.getNew(spriteData.origin.x, spriteData.origin.y)
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
