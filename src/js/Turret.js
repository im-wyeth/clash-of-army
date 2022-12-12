import Vector2 from "./Vector2";
import WorldEntity from "./WorldEntity";

export default class Turret extends WorldEntity {
  renderer;

  tank;
  effectsEmitter;

  spritePosition;

  rad;
  radTo;

  rotationSpeed;

  constructor(renderer, tank, effectsEmitter) {
    super();

    this.renderer = renderer;

    this.tank = tank;
    this.effectsEmitter = effectsEmitter;

    this.spritePosition = new Vector2(0, 0);

    this.rad = 1;
    this.radTo = this.rad;

    this.rotationSpeed = 0.001;

    // test
    this.points = [];
    //
  }

  setSpritePosition(x, y) {
    this.spritePosition.x = x;
    this.spritePosition.y = y;
  }

  getRad() {
    return this.rad;
  }

  update(dt) {
    this.rad += this.rotationSpeed * dt;
  }

  render(sprites) {
    // test
    // ctx.beginPath();
    // ctx.arc(
    //   0 + this.tank.size.x / 2,
    //   0 + this.tank.size.y / 2,
    //   100,
    //   0,
    //   2 * Math.PI
    // );
    // ctx.strokeStyle = "red";
    // ctx.stroke();
    // ctx.closePath();

    // ctx.save();
    // ctx.translate(0 + this.tank.size.x / 2, 0 + this.tank.size.y / 2);
    // for (const p of this.points) {
    //   ctx.beginPath();
    //   ctx.fillStyle = "red";
    //   ctx.arc(p.dir.x * 100, p.dir.y * 100, 10, 0, 2 * Math.PI);
    //   ctx.fill();
    //   ctx.closePath();
    // }
    // ctx.restore();
    //

    // ctx.translate(0 + this.tank.size.x / 2, 0 + this.tank.size.y / 2);
    // ctx.rotate(this.rad);

    // ctx.drawImage(
    //   sprites["tanks"],
    //   this.spritePosition.x,
    //   this.spritePosition.y,
    //   this.size.x,
    //   this.size.y,
    //   this.center.x - this.size.x / 2 / 2,
    //   this.center.y - this.size.y / 2,
    //   this.size.x,
    //   this.size.y
    // );

    const pos = this.tank.getPosition();
    const size = this.tank.getSize();

    this.renderer.drawImage(
      sprites["tanks"],
      pos.x + 42 - this.size.x / 2,
      pos.y + 25 - this.size.y / 2,
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
    let effectCenter = this.tank.center.rotate(0);

    let dir = new Vector2(Math.cos(this.rad), Math.sin(this.rad));

    this.effectsEmitter.activateEffect(
      "turret_fire",
      effectCenter.x + dir.x * 100,
      effectCenter.y + dir.y * 100,
      this.rad
    );

    this.points.push({
      dir,
    });

    const alternateAngle = (this.rad * (180 / Math.PI) + 180) % 360;

    const newDirRad = alternateAngle * (Math.PI / 180);

    let dir2 = new Vector2(Math.cos(newDirRad), Math.sin(newDirRad));

    this.points.push({
      dir: dir2,
    });

    this.center.x += dir2.x * 50;
    this.center.y += dir2.y * 50;
  }
}
