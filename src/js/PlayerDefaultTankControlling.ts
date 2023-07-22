import BodyAbstraction from "./Abstractions/DefaultTank/BodyAbstraction";
import IInputKeyHandler from "./Engine/Interfaces/IInputKeyHandler";
import IMouseHandler from "./Engine/Interfaces/IMouseHandler";

export default class PlayerDefaultTankControlling {
  constructor(
    private readonly _tank: BodyAbstraction,
    private readonly _inputKeyHandler: IInputKeyHandler,
    private readonly _mouseHandler: IMouseHandler
  ) {}

  update() {
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

    const turret = this._tank.getTurret();

    if (turret) {
      turret.rotateTo(this._mouseHandler.getWorldCoordinates());
    }
  }
}
