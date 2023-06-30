import IActor from "./Interfaces/IActor";
import ICamera from "./Interfaces/ICamera";
import IVector2 from "./Interfaces/IVector2";
import { Vector2 } from "./Vector2";

export class Camera implements ICamera {
  private readonly _position = new Vector2(0, 0);
  private readonly _viewPort = new Vector2(0, 0);

  private _zoom = 1;

  constructor(viewPort: IVector2) {
    this._viewPort.x = viewPort.x;
    this._viewPort.y = viewPort.y;
  }

  getPosition() {
    return this._position;
  }

  getViewPort(): IVector2 {
    return this._viewPort;
  }

  getLeftTopCorner(): IVector2 {
    return new Vector2(
      this._position.x - this._viewPort.x / 2,
      this._position.y - this._viewPort.y / 2
    );
  }

  setPosition(position: IVector2) {
    this._position.x = position.x;
    this._position.y = position.y;
  }

  lookAt(actor: IActor) {
    const actorPosition = actor.getPosition();

    this._position.x = actorPosition.x;
    this._position.y = actorPosition.y;
  }
}
