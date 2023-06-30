import IActor from "./IActor";

export default interface IActorComponent {
  getActor(): IActor;

  update?(timeStep: number): void;
}
