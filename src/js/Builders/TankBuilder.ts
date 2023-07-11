import ActorAccelerationComponentBuilder from "./ActorAccelerationComponentBuilder";
import ActorSpriteComponentBuilder from "./ActorSpriteComponentBuilder";
import IVector2Manager from "../Engine/Interfaces/IVector2Manager";
import { Tank } from "../WorldEntities/Tank";

export class TankBuilder {
  constructor(
    private readonly _vector2Manager: IVector2Manager,
    private readonly _actorSpriteComponentBuilder: ActorSpriteComponentBuilder,
    private readonly _actorAccelerationComponentBuilder: ActorAccelerationComponentBuilder,
    private readonly _FRICTION_FORCE: number
  ) {}

  getTank(tankJsonData: any): Tank {
    const tank = new Tank(this._vector2Manager);

    tank.setPosition(this._vector2Manager.getNew(150, 150));
    tank.setRotationSpeed(tankJsonData.rotation_speed);

    tank.setComponent(
      this._actorSpriteComponentBuilder
        .setSpriteSheetName(tankJsonData.sprite.sheet_name)
        .setSize(tankJsonData.sprite.size)
        .setSource(tankJsonData.sprite.source)
        .setOrigin(tankJsonData.sprite.origin)
        .build(tank)
    );

    tank.setComponent(
      this._actorAccelerationComponentBuilder
        .setMass(tankJsonData.mass)
        .addActingForce(this._FRICTION_FORCE)
        .build(tank)
    );

    return tank;
  }
}
