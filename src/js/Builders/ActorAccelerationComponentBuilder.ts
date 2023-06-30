import { ActorComponents } from "../Engine";
import IActor from "../Engine/Interfaces/IActor";

export default class ActorAccelerationComponentBuilder {
  private _mass: number = 0;

  private _actingForces: Array<number> = [];

  setMass(mass: number): ActorAccelerationComponentBuilder {
    this._mass = mass;

    return this;
  }

  addActingForce(force: number): ActorAccelerationComponentBuilder {
    this._actingForces.push(force);

    return this;
  }

  build(actor: IActor): ActorComponents.Acceleration {
    const component = new ActorComponents.Acceleration(actor);

    component.setMass(this._mass);

    for (const actingForce of this._actingForces) {
      component.addActingForce(actingForce);
    }

    return component;
  }
}
