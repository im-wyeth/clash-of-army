export default interface IActorAccelerationComponent {
  setVelocity(v: number): void;

  setMass(m: number): void;

  setForce(f: number): void;

  update(timeStep: number): void;
}
