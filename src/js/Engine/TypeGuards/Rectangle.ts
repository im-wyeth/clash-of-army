import { ShapeTypes } from "../ActorComponents";
import IRectangle from "../Interfaces/IRectangle";

export function isRectangle(shape: ShapeTypes): shape is IRectangle {
  return shape.type === "rectangle";
}
