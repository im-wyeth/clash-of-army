import IActor from "./IActor";
import ICamera from "./ICamera";

export default interface IScene {
  getName(): string;

  getCamera(): ICamera;

  getActors(): Array<IActor>;

  addActor(actor: IActor): void;

  onLoad?(): void;

  onDestroy?(): void;
}
