import IVector2Manager from "../Engine/Interfaces/IVector2Manager";
import { Engine, Turret } from "../WorldEntities/DefaultTank";
import { Ammunition } from "../WorldEntities/DefaultTank/Ammunition";
import { Armor } from "../WorldEntities/DefaultTank/Armor";
import { Caterpillar } from "../WorldEntities/DefaultTank/Caterpillar";
import { Cistern } from "../WorldEntities/DefaultTank/Cistern";
import { Transmission } from "../WorldEntities/DefaultTank/Transmission";
import { TurretMechanism } from "../WorldEntities/DefaultTank/TurretMechanism";
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

  getCaterpillar(caterpillarData: any): Caterpillar {
    const caterpillar = new Caterpillar(
      this._vector2Manager.getNew(
        caterpillarData.position_on_tank.x,
        caterpillarData.position_on_tank.y
      )
    );

    caterpillar.setComponent(
      this._actorShapeComponentBuilder
        .createRectangle(
          this._vector2Manager.getNew(
            caterpillarData.rectangle.size.x,
            caterpillarData.rectangle.size.y
          )
        )
        .build(caterpillar)
    );

    return caterpillar;
  }

  getAmmunition(ammunitionData: any): Ammunition {
    const ammunition = new Ammunition(
      this._vector2Manager.getNew(
        ammunitionData.position_on_tank.x,
        ammunitionData.position_on_tank.y
      )
    );

    ammunition.setComponent(
      this._actorShapeComponentBuilder
        .createRectangle(
          this._vector2Manager.getNew(
            ammunitionData.rectangle.size.x,
            ammunitionData.rectangle.size.y
          )
        )
        .build(ammunition)
    );

    return ammunition;
  }

  getTurretMechanism(turretMechanismData: any): TurretMechanism {
    const turretMechanism = new TurretMechanism(
      this._vector2Manager.getNew(
        turretMechanismData.position_on_tank.x,
        turretMechanismData.position_on_tank.y
      )
    );

    turretMechanism.setComponent(
      this._actorShapeComponentBuilder
        .createCircle(turretMechanismData.circle.radius)
        .build(turretMechanism)
    );

    return turretMechanism;
  }

  getCistern(cisternData: any): Cistern {
    const cistern = new Cistern(
      this._vector2Manager.getNew(
        cisternData.position_on_tank.x,
        cisternData.position_on_tank.y
      )
    );

    cistern.setComponent(
      this._actorShapeComponentBuilder
        .createRectangle(
          this._vector2Manager.getNew(
            cisternData.rectangle.size.x,
            cisternData.rectangle.size.y
          )
        )
        .build(cistern)
    );

    return cistern;
  }

  getTransmission(transmissionData: any): Transmission {
    const transmission = new Transmission(
      this._vector2Manager.getNew(
        transmissionData.position_on_tank.x,
        transmissionData.position_on_tank.y
      )
    );

    transmission.setComponent(
      this._actorShapeComponentBuilder
        .createRectangle(
          this._vector2Manager.getNew(
            transmissionData.rectangle.size.x,
            transmissionData.rectangle.size.y
          )
        )
        .build(transmission)
    );

    return transmission;
  }

  getArmors(armorsData: any): Array<Armor> {
    const arr = [];

    for (const armorData of armorsData) {
      const armor = new Armor(
        this._vector2Manager.getNew(
          armorData.position_on_tank.x,
          armorData.position_on_tank.y
        )
      );

      armor.setComponent(
        this._actorShapeComponentBuilder
          .createRectangle(
            this._vector2Manager.getNew(
              armorData.rectangle.size.x,
              armorData.rectangle.size.y
            )
          )
          .build(armor)
      );

      arr.push(armor);
    }

    return arr;
  }
}
