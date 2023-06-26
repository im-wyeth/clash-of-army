export default interface IActorAccelerationComponent {
  getVelocity(): number;

  getMass(): number;

  getAccelerationForce(): number;

  setVelocity(v: number): void;

  setMass(m: number): void;

  setAccelerationForce(f: number): void;

  setBrakingForce(f: number): void;

  addActingForce(f: number): void;

  update(timeStep: number): void;
}
