import ActorAccelerationComponentBuilder from "./ActorAccelerationComponentBuilder";
import ActorSpriteComponentBuilder from "./ActorSpriteComponentBuilder";
import IVector2Manager from "../Engine/Interfaces/IVector2Manager";
import { Body } from "../WorldEntities/DefaultTank";
import { TankDetailBuilder } from "./TankDetailBuilder";

export default class DefaultTankBuilder {
  constructor(
    private readonly _vector2Manager: IVector2Manager,
    private readonly _tankDetailBuilder: TankDetailBuilder,
    private readonly _actorSpriteComponentBuilder: ActorSpriteComponentBuilder,
    private readonly _actorAccelerationComponentBuilder: ActorAccelerationComponentBuilder,
    private readonly _FRICTION_FORCE: number
  ) {}

  getTank(tankJsonData: any): Body {
    const tankBody = new Body(
      this._tankDetailBuilder.getTurret(tankJsonData.details.turret),
      this._tankDetailBuilder.getEngine(tankJsonData.details.engine),
      this._vector2Manager
    );

    tankBody.setRotationSpeed(tankJsonData.rotation_speed);

    tankBody.setComponent(
      this._actorSpriteComponentBuilder
        .setSpriteSheetName(tankJsonData.sprite.sheet_name)
        .setSize(tankJsonData.sprite.size)
        .setSource(tankJsonData.sprite.source)
        .setOrigin(tankJsonData.sprite.origin)
        .build(tankBody)
    );

    tankBody.setComponent(
      this._actorAccelerationComponentBuilder
        .setMass(tankJsonData.mass)
        .addActingForce(this._FRICTION_FORCE)
        .build(tankBody)
    );

    return tankBody;
  }
}
