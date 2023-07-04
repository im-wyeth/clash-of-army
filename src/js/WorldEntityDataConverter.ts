import { SpriteData } from "./Engine/SpriteData";
import TankData from "./DataStructures/TankData";
import IVector2Manager from "./Engine/Interfaces/IVector2Manager";
import { SpriteDataType } from "./Engine/Types/SpriteData.Type";
import { TankDataType } from "./Types/TankData.Type";
import TankEngineData from "./DataStructures/TankEngineData";
import TankTurretData from "./DataStructures/TankTurretData";
import { TankDetailDataTypes } from "./Types/TankDetailDataTypes.Type";

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

  private _getTankDetailsData(details: any): Array<TankDetailDataTypes> {
    const arr: Array<TankDetailDataTypes> = [];

    for (const detail of details) {
      switch (detail.type) {
        case "turret":
          arr.push(
            new TankTurretData(
              this._spriteDataToModel(detail.sprite),
              detail.rotation_speed,
              this._vector2Manager.getNew(
                detail.position_on_tank.x,
                detail.position_on_tank.y
              )
            )
          );
          break;
        case "engine":
          arr.push(new TankEngineData(detail.position_on_tank));
          break;
      }
    }

    return arr;
  }

  tankDataToModel(tankData: any): TankDataType {
    const spriteData = this._spriteDataToModel(tankData.sprite);

    return new TankData(
      spriteData,
      tankData.rotation_speed,
      this._getTankDetailsData(tankData.details)
    );
  }
}
