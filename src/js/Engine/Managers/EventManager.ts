import {
  OnKeyCallback,
  IEventManager,
  OnMouseCallback,
} from "../../Interfaces/IEventManager";

export default class EventManager implements IEventManager {
  private readonly _window: Window;

  constructor(window: Window) {
    this._window = window;
  }

  onMouseMove(cb: OnMouseCallback): void {
    this._window.addEventListener("mousemove", cb);
  }

  onKeyDown(cb: OnKeyCallback): void {
    this._window.addEventListener("keydown", cb);
  }

  onKeyUp(cb: OnKeyCallback): void {
    this._window.addEventListener("keyup", cb);
  }
}
