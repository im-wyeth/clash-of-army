import IActor from "./IActor";

export default interface IActorComponent {
  getParent(): IActor;
}
