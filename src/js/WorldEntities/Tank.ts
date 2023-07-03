import TankAbstraction from "../Abstractions/TankAbstraction";
import TankTurretAbstraction from "../Abstractions/TankTurretAbstraction";
import { ActorComponents } from "../Engine/";
import IVector2Manager from "../Engine/Interfaces/IVector2Manager";
import { ITankDetail } from "../Interfaces/ITankDetail";

enum TANK_ROTATION_STATES {
  NONE,
  RIGHT,
  LEFT,
}

enum TANK_MOVING_STATES {
  NONE,
  FORWARD_BRAKING,
  BACKWARD_BRAKING,
  FORWARD_ROLLING,
  BACKWARD_ROLLING,
  FORWARD,
  BACKWARD,
}

export default class Tank extends TankAbstraction {
  private _turret: null | TankTurretAbstraction = null;
  private _vector2Manager: IVector2Manager;

  private _forwardForce: number = 0.22;
  private _backwardForce: number = 0.2;
  private _brakingForce: number = 0.2;
  private _rotationSpeed: number = 0.0005;

  private _movingState: TANK_MOVING_STATES = TANK_MOVING_STATES.NONE;
  private _rotationState: TANK_ROTATION_STATES = TANK_ROTATION_STATES.NONE;

  private _engine: null | ITankDetail = null;

  constructor(vector2Manager: IVector2Manager) {
    super();

    this._vector2Manager = vector2Manager;
  }

  getTurret(): null | TankTurretAbstraction {
    return this._turret;
  }

  setRotationSpeed(speed: number): void {
    this._rotationSpeed = speed;
  }

  setTurret(turret: TankTurretAbstraction): void {
    this._turret = turret;
  }

  setEngine(engine: ITankDetail): void {
    this._engine = engine;
  }

  update(timeStep: number): void {
    this._handleRotation(timeStep);
    this._handleMoving();
    this._updateDirection();
    this._resetMovingState();
    this._resetRotatingState();
    this._updateTurretPosition();
  }

  private _handleRotation(timeStep: number): void {
    switch (this._rotationState) {
      case TANK_ROTATION_STATES.RIGHT:
        this._radians += this._rotationSpeed * timeStep;

        break;
      case TANK_ROTATION_STATES.LEFT:
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
      case TANK_MOVING_STATES.FORWARD_ROLLING:
      case TANK_MOVING_STATES.BACKWARD_ROLLING:
        acceleration.setAccelerationForce(0);

        if (!acceleration.getVelocity()) {
          this._movingState = TANK_MOVING_STATES.NONE;
        }
        break;
      case TANK_MOVING_STATES.FORWARD_BRAKING:
      case TANK_MOVING_STATES.BACKWARD_BRAKING:
        acceleration.setBrakingForce(this._brakingForce);

        if (!acceleration.getVelocity()) {
          acceleration.setBrakingForce(0);
          this._movingState = TANK_MOVING_STATES.NONE;
        }
        break;
    }
  }

  private _updateTurretPosition() {
    this._turret?.setPosition(
      this._vector2Manager.getNew(this._position.x + 15, this._position.y)
    );
  }

  private _resetMovingState() {
    if (this._movingState === TANK_MOVING_STATES.FORWARD) {
      this._movingState = TANK_MOVING_STATES.FORWARD_ROLLING;
    } else if (this._movingState === TANK_MOVING_STATES.BACKWARD) {
      this._movingState = TANK_MOVING_STATES.BACKWARD_ROLLING;
    }
  }

  private _resetRotatingState() {
    this._rotationState = TANK_ROTATION_STATES.NONE;
  }

  private _updateDirection() {
    if (
      this._movingState === TANK_MOVING_STATES.FORWARD ||
      this._movingState === TANK_MOVING_STATES.FORWARD_ROLLING
    ) {
      this.setDirection(this._vector2Manager.fromRadians(this._radians));
    } else if (
      this._movingState === TANK_MOVING_STATES.BACKWARD ||
      this._movingState === TANK_MOVING_STATES.BACKWARD_ROLLING
    ) {
      this.setDirection(
        this._vector2Manager.fromRadians(this._radians + Math.PI)
      );
    }
  }

  fire(): void {}

  moveForward(): void {
    if (
      this._movingState === TANK_MOVING_STATES.BACKWARD ||
      this._movingState === TANK_MOVING_STATES.BACKWARD_ROLLING ||
      this._movingState === TANK_MOVING_STATES.BACKWARD_BRAKING
    ) {
      this._movingState = TANK_MOVING_STATES.BACKWARD_BRAKING;

      return;
    }

    const acceleration = this.getComponent(ActorComponents.Acceleration);
    if (acceleration) {
      acceleration.setAccelerationForce(this._forwardForce);
    }

    this._movingState = TANK_MOVING_STATES.FORWARD;

    this._updateDirection();
  }

  moveBackward(): void {
    if (
      this._movingState === TANK_MOVING_STATES.FORWARD ||
      this._movingState === TANK_MOVING_STATES.FORWARD_ROLLING ||
      this._movingState === TANK_MOVING_STATES.FORWARD_BRAKING
    ) {
      this._movingState = TANK_MOVING_STATES.FORWARD_BRAKING;

      return;
    }

    const acceleration = this.getComponent(ActorComponents.Acceleration);
    if (acceleration) {
      acceleration.setAccelerationForce(this._backwardForce);
    }

    this._movingState = TANK_MOVING_STATES.BACKWARD;

    this._updateDirection();
  }

  rotateRight(): void {
    this._rotationState = TANK_ROTATION_STATES.RIGHT;
  }

  rotateLeft(): void {
    this._rotationState = TANK_ROTATION_STATES.LEFT;
  }
}
