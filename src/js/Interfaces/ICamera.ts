import IActor from "./IActor";
import IVector2 from "./IVector2";

export default interface ICamera {
  getViewPort(): IVector2;

  getPosition(): IVector2;

  getLeftTopCorner(): IVector2;

  lookAt(actor: IActor): void;
}
