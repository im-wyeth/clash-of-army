import TankAbstraction from "./Abstractions/TankAbstraction";
import IInputKeyHandler from "./Engine/Interfaces/IInputKeyHandler";
import IMouseHandler from "./Engine/Interfaces/IMouseHandler";
import * as Tank from "./WorldEntities/Tank";

export default class PlayerTankControlling {
  constructor(
    private readonly _tank: TankAbstraction,
    private readonly _inputKeyHandler: IInputKeyHandler,
    private readonly _mouseHandler: IMouseHandler
  ) {}

  update(timeStep: number) {
    if (this._inputKeyHandler.isPressed("KeyW")) {
      this._tank.moveForward();
    }

    if (this._inputKeyHandler.isPressed("KeyS")) {
      this._tank.moveBackward();
    }

    if (this._inputKeyHandler.isPressed("KeyD")) {
      this._tank.rotateRight();
    }

    if (this._inputKeyHandler.isPressed("KeyA")) {
      this._tank.rotateLeft();
    }

    const turret = this._tank.getDetail(Tank.Turret);

    if (turret) {
      turret.rotateTo(this._mouseHandler.getWorldCoordinates());
    }
  }
}
