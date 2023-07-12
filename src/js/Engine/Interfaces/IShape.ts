import IActor from "./IActor";
import IRenderer from "./IRenderer";

export default interface IRectangle {
  render(renderer: IRenderer, actor: IActor): void;
}
