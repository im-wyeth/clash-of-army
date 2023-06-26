import IVector2 from "../Interfaces/IVector2";
import IVector2Manager from "../Interfaces/IVector2Manager";
import Vector2 from "./Vector2";

export default class Vector2Manager implements IVector2Manager {
  getNew(x: number, y: number): IVector2 {
    return new Vector2(x, y);
  }

  fromRadians(theta: number): IVector2 {
    return new Vector2(Math.cos(theta), Math.sin(theta));
  }
}
