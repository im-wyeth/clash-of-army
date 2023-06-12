import TankAbstraction from "./Abstractions/TankAbstraction";
import IInputKeyHandler from "./Interfaces/IInputKeyHandler";
import IMouseHandler from "./Interfaces/IMouseHandler";

export default class PlayerTankControlling {
  constructor(
    private readonly _tank: TankAbstraction,
    private readonly _inputKeyHandler: IInputKeyHandler,
    private readonly _mouseHandler: IMouseHandler
  ) {}

  update(timeStep: number) {
    if (this._inputKeyHandler.isPressed("Space")) {
      console.log(1);
    }
  }
}
