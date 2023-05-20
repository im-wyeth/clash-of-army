export default interface ILoop {
  init(): void;

  destroy(): void;

  onUpdate(cb: Function): void;

  onRender(cb: Function): void;
}
