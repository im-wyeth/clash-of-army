import IActor from "./IActor";
import IRenderer from "./IRenderer";

export default interface IShape {
  render(renderer: IRenderer, actor: IActor): void;
}
