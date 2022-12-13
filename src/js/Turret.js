import Vector2 from "./Vector2";
import WorldEntity from "./WorldEntity";

export default class Turret extends WorldEntity {
  tank;
  effectsEmitter;

  spritePosition;

  radTo;

  rotationSpeed;

  constructor(renderer, tank, effectsEmitter) {
    super(renderer);

    this.tank = tank;
    this.effectsEmitter = effectsEmitter;

    this.spritePosition = new Vector2(0, 0);

    this.radTo = this.rad;

    this.rotationSpeed = 0.001;
  }

  setSpritePosition(x, y) {
    this.spritePosition.x = x;
    this.spritePosition.y = y;
  }

  getRad() {
    return this.rad;
  }

  updatePositionOnTank() {
    const pos = this.tank.getPosition();

    this.center.x = pos.x;
    this.center.y = pos.y;
  }

  update(dt) {
    this.rad += this.rotationSpeed * dt;
  }

  render(sprites) {
    this.renderer.drawImage(
      sprites["tanks"],
      this.center.x,
      this.center.y,
      this.size.x,
      this.size.y,
      this.rad,
      this.spritePosition.x,
      this.spritePosition.y,
      this.size.x,
      this.size.y
    );
  }

  fire() {
    // test
    let effectCenter = this.tank.center.rotate(0);

    let dir = new Vector2(Math.cos(this.rad), Math.sin(this.rad));

    this.effectsEmitter.activateEffect(
      "turret_fire",
      effectCenter.x + dir.x * 75,
      effectCenter.y + dir.y * 75,
      this.rad
    );

    const alternateAngle = (this.rad * (180 / Math.PI) + 180) % 360;

    const newDirRad = alternateAngle * (Math.PI / 180);

    let dir2 = new Vector2(Math.cos(newDirRad), Math.sin(newDirRad));

    this.center.x += dir2.x * 5;
    this.center.y += dir2.y * 5;
    //
  }
}
