import IVector2 from "./IVector2";

export default interface IMouseHandler {
  getMouseCoordinates(): IVector2;

  getWorldCoordinates(): IVector2;
}
