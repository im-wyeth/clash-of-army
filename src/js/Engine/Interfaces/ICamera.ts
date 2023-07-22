import IActor from "./IActor";
import IVector2 from "./IVector2";

export default interface ICamera {
  getViewPort(): IVector2;

  getPosition(): IVector2;

  getZoom(): IVector2;

  getLeftTopCorner(): IVector2;

  setPosition(position: IVector2): void;

  setZoom(zoom: IVector2): void;

  lookAt(actor: IActor): void;
}
