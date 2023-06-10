import IInputKeyHandler from "../Interfaces/IInputKeyHandler";

enum KEY_STATE {
  PRESSED,
  UNPRESSED,
}

export default class InputKeyHandler implements IInputKeyHandler {
  private readonly _keys: Map<string, KEY_STATE> = new Map();

  constructor() {}

  isPressed(keyCode: string): boolean {
    const key = this._keys.get(keyCode);

    if (key !== undefined) {
      if (key === KEY_STATE.PRESSED) {
        return true;
      }
    }

    return false;
  }

  onKeyDown(e: KeyboardEvent): void {
    this._keys.set(e.code, KEY_STATE.PRESSED);
  }

  onKeyUp(e: KeyboardEvent): void {
    this._keys.set(e.code, KEY_STATE.UNPRESSED);
  }
}
