import Actor from "../../Engine/Actor";

export default class Tank extends Actor {
  private readonly _turret: Actor;

  constructor(turret: Actor) {
    super();

    this._turret = turret;
  }

  update() {}
}
