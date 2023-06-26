import ActorAccelerationComponent from "../ActorComponents/ActorAccelerationComponent";
import IActor from "../Interfaces/IActor";

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

  build(actor: IActor): ActorAccelerationComponent {
    const component = new ActorAccelerationComponent(actor);

    component.setMass(this._mass);

    for (const actingForce of this._actingForces) {
      component.addActingForce(actingForce);
    }

    return component;
  }
}
