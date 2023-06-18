import IActor from "./IActor";

export default interface IActorComponent {
  getActor(): IActor;

  setActor(actor: IActor): void;
}
