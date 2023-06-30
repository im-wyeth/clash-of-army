import { Vector2 } from "../Vector2";
import IActor from "../Interfaces/IActor";
import IMathUtils from "../Interfaces/IMathUtils";
import IVector2 from "../Interfaces/IVector2";
import { BaseComponent } from "./BaseComponent";
import { Sprite } from "./Sprite";

export class Rotation extends BaseComponent {
  private readonly _mathUtils: IMathUtils;

  private _rotationSpeed: number = 0.001;
  private _lookAt: IVector2 = new Vector2(0, 0);
  private _radiansTo: number = 0;

  constructor(actor: IActor, mathUtils: IMathUtils) {
    super(actor);

    this._mathUtils = mathUtils;
  }

  getRotationSpeed(): number {
    return this._rotationSpeed;
  }

  setRotationSpeed(speed: number): void {
    this._rotationSpeed = speed;
  }

  lookAt(point: IVector2): void {
    let actorOriginOfRotation = this._actor.getPosition();

    const sprite = this._actor.getComponent(Sprite);
    if (sprite) {
      const size = sprite.getSize();
      const origin = sprite.getOrigin();

      actorOriginOfRotation = new Vector2(
        actorOriginOfRotation.x - size.x / 2 + origin.x,
        actorOriginOfRotation.y - size.y / 2 + origin.y
      );
    }

    this._lookAt = point.minus(actorOriginOfRotation);

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
