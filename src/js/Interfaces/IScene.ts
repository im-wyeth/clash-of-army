import IActor from "./IActor";

export default interface IScene {
  getName(): string;

  getActors(): Array<IActor>;

  addActor(actor: IActor): void;

  onLoad?(): void;

  onDestroy?(): void;
}
