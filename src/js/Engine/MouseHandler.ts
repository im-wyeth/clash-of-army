import ICamera from "../Interfaces/ICamera";
import { IEventManager } from "../Interfaces/IEventManager";
import IMouseHandler from "../Interfaces/IMouseHandler";
import IVector2 from "../Interfaces/IVector2";
import Vector2 from "./Vector2";

export default class MouseHandler implements IMouseHandler {
  private readonly _mouse: IVector2;
  private readonly _world: IVector2;
  private readonly _camera: ICamera;

  constructor(eventManager: IEventManager, camera: ICamera) {
    eventManager.onMouseMove(this.onMouseMove.bind(this));

    this._mouse = new Vector2(0, 0);
    this._world = new Vector2(0, 0);

    this._camera = camera;
  }

  getMouseCoordinates(): IVector2 {
    return new Vector2(this._mouse.x, this._mouse.y);
  }

  getWorldCoordinates(): IVector2 {
    return new Vector2(this._world.x, this._world.y);
  }

  calculateWorldCoordinates() {
    const cameraViewPort = this._camera.getViewPort();
    const cameraPosition = this._camera.getPosition();

    const cameraLeftTopCorner = new Vector2(
      cameraPosition.x - cameraViewPort.x / 2,
      cameraPosition.y - cameraViewPort.y / 2
    );

    this._world.x = cameraLeftTopCorner.x + this._mouse.x;
    this._world.y = cameraLeftTopCorner.y + this._mouse.y;
  }

  onMouseMove(e: MouseEvent): void {
    this._mouse.x = e.clientX;
    this._mouse.y = e.clientY;

    this.calculateWorldCoordinates();
  }
}
