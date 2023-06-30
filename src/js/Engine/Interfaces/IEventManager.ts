export type OnKeyCallback = (e: KeyboardEvent) => void;

export type OnMouseCallback = (e: MouseEvent) => void;

export interface IEventManager {
  onKeyDown(cb: OnKeyCallback): void;

  onKeyUp(cb: OnKeyCallback): void;

  onMouseMove(cb: OnMouseCallback): void;
}
