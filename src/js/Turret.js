import Vector2 from "./Vector2";

export default class Turret {
  tank;

  size;

  rad;
  radTo;

  rotationSpeed;

  constructor(tank) {
    this.tank = tank;

    this.size = new Vector2(0, 0);

    this.rad = 0;
    this.radTo = this.rad;

    this.rotationSpeed = 0.001;
  }

  setSize(w, h) {
    this.size.x = w;
    this.size.y = h;
  }

  update(dt) {
    //this.rad += this.rotationSpeed * dt;
  }

  render(ctx, res) {
    ctx.translate(0 + this.tank.size.x / 2, 0 + this.tank.size.y / 2);
    ctx.rotate(this.rad);

    ctx.drawImage(
      res["turret"],
      0 - this.size.x / 2 / 2,
      0 - this.size.y / 2,
      this.size.x,
      this.size.y
    );
  }
}
