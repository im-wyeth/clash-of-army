import Vector2 from "../Engine/Vector2";
import IActor from "../Interfaces/IActor";
import ActorComponent from "./ActorComponent";

export default class ActorAccelerationComponent extends ActorComponent {
  private _velocity = 0;
  private _maxVelocity = 100;
  private _mass = 0;
  private _accelerationForce = 0;
  private _brakingForce = 0;

  private _actingForces: Array<number> = [];

  constructor(actor: IActor) {
    super(actor);
  }

  getVelocity(): number {
    return this._velocity;
  }

  getMass(): number {
    return this._mass;
  }

  getAccelerationForce(): number {
    return this._accelerationForce;
  }

  setVelocity(v: number): void {
    this._velocity = v;
  }

  setMass(m: number): void {
    this._mass = m;
  }

  setAccelerationForce(f: number): void {
    this._accelerationForce = f;
  }

  setBrakingForce(f: number): void {
    this._brakingForce = f;
  }

  addActingForce(f: number): void {
    this._actingForces.push(f);
  }

  private _increaseVelocity(timeStep: number): void {
    let force = this._accelerationForce;

    if (this._brakingForce > 0) {
      force -= this._brakingForce;
    }

    for (const actingForce of this._actingForces) {
      force -= actingForce;
    }

    const acceleration = (force / this._mass) * timeStep;

    if (this._velocity + acceleration > this._maxVelocity) {
      this._velocity = this._maxVelocity;
    } else {
      this._velocity += acceleration;
    }

    if (this._velocity < 0) {
      this._velocity = 0;
    }
  }

  update(timeStep: number): void {
    this._increaseVelocity(timeStep);

    const pos = this._actor.getPosition();
    const dir = this._actor.getDirection();

    this._actor.setPosition(
      new Vector2(
        pos.x + dir.x * this._velocity * timeStep,
        pos.y + dir.y * this._velocity * timeStep
      )
    );
  }
}
