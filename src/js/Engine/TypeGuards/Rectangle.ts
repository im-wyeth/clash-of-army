import IRectangle from "../Interfaces/IRectangle";
import { ShapeTypes } from "../Types";

export function isRectangle(shape: ShapeTypes): shape is IRectangle {
  return shape.type === "rectangle";
}
