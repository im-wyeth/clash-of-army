import ActorAccelerationComponent from "../ActorComponents/ActorAccelerationComponent";
import IActor from "../Interfaces/IActor";

export default class ActorAccelerationComponentBuilder {
  private _velocity: number = 0;
  private _mass: number = 0;
  private _force: number = 0;

  setVelocity(velocity: number): ActorAccelerationComponentBuilder {
    this._velocity = velocity;

    return this;
  }

  setMass(mass: number): ActorAccelerationComponentBuilder {
    this._mass = mass;

    return this;
  }

  setForce(force: number): ActorAccelerationComponentBuilder {
    this._force = force;

    return this;
  }

  build(actor: IActor): ActorAccelerationComponent {
    const component = new ActorAccelerationComponent(actor);

    component.setVelocity(this._velocity);
    component.setMass(this._mass);
    component.setForce(this._force);

    return component;
  }
}
