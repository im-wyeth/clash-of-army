import { SpriteData } from "./Engine/SpriteData";
import TankData from "./TankData";
import TankTurretData from "./TankTurretData";
import IVector2Manager from "./Engine/Interfaces/IVector2Manager";
import { SpriteDataType } from "./Engine/Types/SpriteData.Type";
import { TankTurretDataType } from "./Types/TankTurretData.Type";
import { TankDataType } from "./Types/TankData.Type";

export default class WorldEntityDataConverter {
  constructor(private readonly _vector2Manager: IVector2Manager) {}

  private _spriteDataToModel(spriteData: any): SpriteDataType {
    return new SpriteData(
      spriteData.sheet_name,
      this._vector2Manager.getNew(spriteData.size.x, spriteData.size.y),
      this._vector2Manager.getNew(spriteData.source.x, spriteData.source.y),
      this._vector2Manager.getNew(spriteData.origin.x, spriteData.origin.y)
    );
  }

  private _tankTurretDataToModel(turretData: any): TankTurretDataType {
    const spriteData = this._spriteDataToModel(turretData.sprite);

    return new TankTurretData(spriteData, turretData.rotation_speed);
  }

  tankDataToModel(tankData: any): TankDataType {
    const spriteData = this._spriteDataToModel(tankData.sprite);
    const turretData = this._tankTurretDataToModel(tankData.turret);

    return new TankData(spriteData, turretData, tankData.rotation_speed);
  }
}
