import IActor from "./IActor";

export default interface IActorRenderer {
  renderActor(actor: IActor): void;
}
