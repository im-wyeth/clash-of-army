import { ActorComponents, MathUtils } from "../Engine";
import IActor from "../Engine/Interfaces/IActor";

export default class ActorRotationComponentBuilder {
  private _rotationSpeed = 0.001;

  setRotationSpeed(rotationSpeed: number): ActorRotationComponentBuilder {
    this._rotationSpeed = rotationSpeed;

    return this;
  }

  build(actor: IActor): ActorComponents.Rotation {
    const component = new ActorComponents.Rotation(actor, new MathUtils());

    component.setRotationSpeed(this._rotationSpeed);

    return component;
  }
}
