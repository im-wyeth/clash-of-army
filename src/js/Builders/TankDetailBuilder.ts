import IVector2Manager from "../Engine/Interfaces/IVector2Manager";
import { Engine, Turret } from "../WorldEntities/DefaultTank";
import ActorRotationComponentBuilder from "./ActorRotationComponentBuilder";
import ActorShapeComponentBuilder from "./ActorShapeComponentBuilder";
import ActorSpriteComponentBuilder from "./ActorSpriteComponentBuilder";

export class TankDetailBuilder {
  constructor(
    private readonly _vector2Manager: IVector2Manager,
    private readonly _actorSpriteComponentBuilder: ActorSpriteComponentBuilder,
    private readonly _actorShapeComponentBuilder: ActorShapeComponentBuilder,
    private readonly _actorRotationComponentBuilder: ActorRotationComponentBuilder
  ) {}

  getTurret(turretData: any): Turret {
    const turret = new Turret(
      this._vector2Manager.getNew(
        turretData.position_on_tank.x,
        turretData.position_on_tank.y
      )
    );

    turret.setComponent(
      this._actorSpriteComponentBuilder
        .setSpriteSheetName(turretData.sprite.sheet_name)
        .setOrigin(
          this._vector2Manager.getNew(
            turretData.sprite.origin.x,
            turretData.sprite.origin.y
          )
        )
        .setSize(
          this._vector2Manager.getNew(
            turretData.sprite.size.x,
            turretData.sprite.size.y
          )
        )
        .setSource(
          this._vector2Manager.getNew(
            turretData.sprite.source.x,
            turretData.sprite.source.y
          )
        )
        .build(turret)
    );

    turret.setComponent(
      this._actorRotationComponentBuilder
        .setRotationSpeed(turretData.rotation_speed)
        .build(turret)
    );

    return turret;
  }

  getEngine(engineData: any): Engine {
    const engine = new Engine(
      this._vector2Manager.getNew(
        engineData.position_on_tank.x,
        engineData.position_on_tank.y
      )
    );

    engine.setComponent(
      this._actorShapeComponentBuilder
        .createRectangle(
          this._vector2Manager.getNew(
            engineData.rectangle.size.x,
            engineData.rectangle.size.y
          )
        )
        .build(engine)
    );

    return engine;
  }
}
