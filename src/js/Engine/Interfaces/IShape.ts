import IActor from "./IActor";
import IRenderer from "./IRenderer";

export default interface IShape {
  render(
    renderer: IRenderer,
    actor: IActor,
    color: string,
    lineColor: string,
    lineWidth: number,
    alpha?: number
  ): void;
}
