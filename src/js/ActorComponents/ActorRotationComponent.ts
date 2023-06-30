import Vector2 from "../Engine/Vector2";
import IActor from "../Interfaces/IActor";
import IMathUtils from "../Interfaces/IMathUtils";
import IVector2 from "../Interfaces/IVector2";
import ActorComponent from "./ActorComponent";
import ActorSpriteComponent from "./ActorSpriteComponent";

export default class ActorRotationComponent extends ActorComponent {
  private readonly _mathUtils: IMathUtils;

  private _rotationSpeed: number = 0.001;
  private _lookAt: IVector2 = new Vector2(0, 0);
  private _radiansTo: number = 0;

  constructor(actor: IActor, mathUtils: IMathUtils) {
    super(actor);

    this._mathUtils = mathUtils;
  }

  setRotationSpeed(speed: number): void {
    this._rotationSpeed = speed;
  }

  lookAt(point: IVector2): void {
    let actorRotationPoint = this._actor.getPosition();

    const sprite = this._actor.getComponent(ActorSpriteComponent);
    if (sprite) {
      const size = sprite.getSize();
      const origin = sprite.getOrigin();

      actorRotationPoint = new Vector2(
        actorRotationPoint.x - size.x / 2 + origin.x,
        actorRotationPoint.y - size.y / 2 + origin.y
      );
    }

    this._lookAt = point.minus(actorRotationPoint);

    this._radiansTo = this._mathUtils.normalizeRadians(
      this._lookAt.nor().toRadians()
    );
  }

  update(timeStep: number): void {
    const rad = this._mathUtils.normalizeRadians(this._actor.getRadians());
    const radTo = this._radiansTo;
    const rotationSpeed = this._rotationSpeed * timeStep;

    if (
      this._mathUtils.minDistanceBetweenRadians(rad, radTo) <= rotationSpeed
    ) {
      this._actor.setRadians(this._radiansTo);

      return;
    }

    if (rad < radTo) {
      if (Math.abs(rad - radTo) < Math.PI) {
        this._actor.setRadians(rad + rotationSpeed);
      } else {
        this._actor.setRadians(rad - rotationSpeed);
      }
    } else {
      if (Math.abs(rad - radTo) < Math.PI) {
        this._actor.setRadians(rad - rotationSpeed);
      } else {
        this._actor.setRadians(rad + rotationSpeed);
      }
    }
  }
}
