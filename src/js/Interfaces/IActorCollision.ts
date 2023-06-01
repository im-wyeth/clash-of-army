import IActor from "./IActor";
import IShape from "./IShape";

export default interface IActorCollision {
  parent: IActor;
  type: string;
  shape: IShape;
}
