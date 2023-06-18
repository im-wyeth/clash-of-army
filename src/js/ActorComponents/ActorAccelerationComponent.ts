import IActor from "../Interfaces/IActor";
import IActorAccelerationComponent from "../Interfaces/IActorAccelerationComponent";

export default class ActorAccelerationComponent
  implements IActorAccelerationComponent
{
  private readonly _actor: IActor;

  private _velocity = 0;
  private _mass = 0;
  private _force = 0;

  constructor(actor: IActor) {
    this._actor = actor;
  }

  setVelocity(v: number): void {
    this._velocity = v;
  }

  setMass(m: number): void {
    this._mass = m;
  }

  setForce(f: number): void {
    this._force = f;
  }

  increaseVelocity(timeStep: number): void {
    const acceleration = this._force / this._mass;

    this._velocity += acceleration * timeStep;
  }

  decreaseVelocity(timeStep: number): void {
    this._velocity -= timeStep;

    if (this._velocity < 0) {
      this._velocity = 0;
    }
  }

  update(timeStep: number): void {
    if (!this._force || !this._mass) {
      return;
    }

    if (!this._force && this._velocity > 0) {
      this.decreaseVelocity(timeStep);
    } else {
      this.increaseVelocity(timeStep);
    }
  }
}
