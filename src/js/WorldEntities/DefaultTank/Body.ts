import BodyAbstraction from "../../Abstractions/DefaultTank/BodyAbstraction";
import { ActorComponents } from "../../Engine";
import IVector2 from "../../Engine/Interfaces/IVector2";
import IVector2Manager from "../../Engine/Interfaces/IVector2Manager";
import { TANK_MOVING_STATE } from "../../Enums/TankMovingState.Enum";
import { TANK_ROTATION_STATE } from "../../Enums/TankRotationState.Enum";
import { Ammunition } from "./Ammunition";
import { Armor } from "./Armor";
import { Caterpillar } from "./Caterpillar";
import { Cistern } from "./Cistern";
import { Engine } from "./Engine";
import { Transmission } from "./Transmission";
import { Turret } from "./Turret";
import { TurretMechanism } from "./TurretMechanism";

export class Body extends BodyAbstraction {
  private _forwardForce: number = 0.22;
  private _backwardForce: number = 0.2;
  private _brakingForce: number = 0.2;
  private _rotationSpeed: number = 0.0005;

  private _movingState: TANK_MOVING_STATE = TANK_MOVING_STATE.NONE;
  private _rotationState: TANK_ROTATION_STATE = TANK_ROTATION_STATE.NONE;

  private _armors: Array<Armor> = [];

  constructor(
    private readonly _turret: Turret,
    private readonly _engine: Engine,
    private readonly _leftCaterpillar: Caterpillar,
    private readonly _rightCaterpillar: Caterpillar,
    private readonly _ammunition: Ammunition,
    private readonly _turretMechanism: TurretMechanism,
    private readonly _cistern: Cistern,
    private readonly _transmission: Transmission,
    private readonly _vector2Manager: IVector2Manager
  ) {
    super();
  }

  getTurret(): Turret {
    return this._turret;
  }

  getEngine(): Engine {
    return this._engine;
  }

  getRightCaterpillar(): Caterpillar {
    return this._rightCaterpillar;
  }

  getLeftCaterpillar(): Caterpillar {
    return this._leftCaterpillar;
  }

  getAmmunition(): Ammunition {
    return this._ammunition;
  }

  getTurretMehchanism(): TurretMechanism {
    return this._turretMechanism;
  }

  getCistern(): Cistern {
    return this._cistern;
  }

  getTransmission(): Transmission {
    return this._transmission;
  }

  getArmors(): Array<Armor> {
    return this._armors;
  }

  setRotationSpeed(speed: number): void {
    this._rotationSpeed = speed;
  }

  setArmors(armors: Array<Armor>): void {
    this._armors = armors;
  }

  update(timeStep: number): void {
    this._handleRotation(timeStep);
    this._handleMoving();
    this._updateDirection();
    this._resetMovingState();
    this._resetRotatingState();
    this._updateDetails();
  }

  private _leftTopCornerPosition(): IVector2 {
    const sprite = this.getComponent(ActorComponents.Sprite);

    const leftTopCornerPosition = this._vector2Manager.getNew(0, 0);

    if (sprite) {
      const spriteSize = sprite.getSize();
      leftTopCornerPosition.x = this._position.x - spriteSize.x / 2;
      leftTopCornerPosition.y = this._position.y - spriteSize.y / 2;
    }

    return leftTopCornerPosition;
  }

  private _handleRotation(timeStep: number): void {
    switch (this._rotationState) {
      case TANK_ROTATION_STATE.RIGHT:
        this._radians += this._rotationSpeed * timeStep;

        break;
      case TANK_ROTATION_STATE.LEFT:
        this._radians -= this._rotationSpeed * timeStep;

        break;
    }
  }

  private _handleMoving(): void {
    const acceleration = this.getComponent(ActorComponents.Acceleration);

    if (!acceleration) {
      return;
    }

    switch (this._movingState) {
      case TANK_MOVING_STATE.FORWARD_ROLLING:
      case TANK_MOVING_STATE.BACKWARD_ROLLING:
        acceleration.setAccelerationForce(0);

        if (!acceleration.getVelocity()) {
          this._movingState = TANK_MOVING_STATE.NONE;
        }
        break;
      case TANK_MOVING_STATE.FORWARD_BRAKING:
      case TANK_MOVING_STATE.BACKWARD_BRAKING:
        acceleration.setBrakingForce(this._brakingForce);

        if (!acceleration.getVelocity()) {
          acceleration.setBrakingForce(0);
          this._movingState = TANK_MOVING_STATE.NONE;
        }
        break;
    }
  }

  private _resetMovingState() {
    if (this._movingState === TANK_MOVING_STATE.FORWARD) {
      this._movingState = TANK_MOVING_STATE.FORWARD_ROLLING;
    } else if (this._movingState === TANK_MOVING_STATE.BACKWARD) {
      this._movingState = TANK_MOVING_STATE.BACKWARD_ROLLING;
    }
  }

  private _resetRotatingState() {
    this._rotationState = TANK_ROTATION_STATE.NONE;
  }

  private _updateDirection() {
    if (
      this._movingState === TANK_MOVING_STATE.FORWARD ||
      this._movingState === TANK_MOVING_STATE.FORWARD_ROLLING
    ) {
      this.setDirection(this._vector2Manager.fromRadians(this._radians));
    } else if (
      this._movingState === TANK_MOVING_STATE.BACKWARD ||
      this._movingState === TANK_MOVING_STATE.BACKWARD_ROLLING
    ) {
      this.setDirection(
        this._vector2Manager.fromRadians(this._radians + Math.PI)
      );
    }
  }

  private _updateDetails(): void {
    const leftTopCornerOfTank = this._leftTopCornerPosition();

    this._turret.setPosition(
      leftTopCornerOfTank.add(this._turret.getPositionOnTank())
    );

    this._engine.setPosition(
      leftTopCornerOfTank
        .add(this._engine.getPositionOnTank())
        .rotateAround(this._position, this._radians)
    );
    this._engine.setRadians(this._radians);

    this._turretMechanism.setPosition(
      leftTopCornerOfTank
        .add(this._turretMechanism.getPositionOnTank())
        .rotateAround(this._position, this._radians)
    );

    this._leftCaterpillar.setPosition(
      leftTopCornerOfTank
        .add(this._leftCaterpillar.getPositionOnTank())
        .rotateAround(this._position, this._radians)
    );
    this._leftCaterpillar.setRadians(this._radians);
    this._rightCaterpillar.setPosition(
      leftTopCornerOfTank
        .add(this._rightCaterpillar.getPositionOnTank())
        .rotateAround(this._position, this._radians)
    );
    this._rightCaterpillar.setRadians(this._radians);

    this._ammunition.setPosition(
      leftTopCornerOfTank
        .add(this._ammunition.getPositionOnTank())
        .rotateAround(this._position, this._radians)
    );
    this._ammunition.setRadians(this._radians);

    this._cistern.setPosition(
      leftTopCornerOfTank
        .add(this._cistern.getPositionOnTank())
        .rotateAround(this._position, this._radians)
    );
    this._cistern.setRadians(this._radians);

    this._transmission.setPosition(
      leftTopCornerOfTank
        .add(this._transmission.getPositionOnTank())
        .rotateAround(this._position, this._radians)
    );
    this._transmission.setRadians(this._radians);

    for (const armor of this._armors) {
      armor.setPosition(
        leftTopCornerOfTank
          .add(armor.getPositionOnTank())
          .rotateAround(this._position, this._radians)
      );
      armor.setRadians(this._radians);
    }
  }

  moveForward(): void {
    if (
      this._movingState === TANK_MOVING_STATE.BACKWARD ||
      this._movingState === TANK_MOVING_STATE.BACKWARD_ROLLING ||
      this._movingState === TANK_MOVING_STATE.BACKWARD_BRAKING
    ) {
      this._movingState = TANK_MOVING_STATE.BACKWARD_BRAKING;

      return;
    }

    const acceleration = this.getComponent(ActorComponents.Acceleration);
    if (acceleration) {
      acceleration.setAccelerationForce(this._forwardForce);
    }

    this._movingState = TANK_MOVING_STATE.FORWARD;

    this._updateDirection();
  }

  moveBackward(): void {
    if (
      this._movingState === TANK_MOVING_STATE.FORWARD ||
      this._movingState === TANK_MOVING_STATE.FORWARD_ROLLING ||
      this._movingState === TANK_MOVING_STATE.FORWARD_BRAKING
    ) {
      this._movingState = TANK_MOVING_STATE.FORWARD_BRAKING;

      return;
    }

    const acceleration = this.getComponent(ActorComponents.Acceleration);
    if (acceleration) {
      acceleration.setAccelerationForce(this._backwardForce);
    }

    this._movingState = TANK_MOVING_STATE.BACKWARD;

    this._updateDirection();
  }

  rotateRight(): void {
    this._rotationState = TANK_ROTATION_STATE.RIGHT;
  }

  rotateLeft(): void {
    this._rotationState = TANK_ROTATION_STATE.LEFT;
  }
}
