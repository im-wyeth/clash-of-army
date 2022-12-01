import Vector2 from "./Vector2";

export default class Turret {
  tank;

  size;
  spritePosition;

  rad;
  radTo;

  rotationSpeed;

  constructor(tank) {
    this.tank = tank;

    this.size = new Vector2(0, 0);
    this.spritePosition = new Vector2(0, 0);

    this.rad = 0;
    this.radTo = this.rad;

    this.rotationSpeed = 0.001;
  }

  setSize(w, h) {
    this.size.x = w;
    this.size.y = h;
  }

  setSpritePosition(x, y) {
    this.spritePosition.x = x;
    this.spritePosition.y = y;
  }

  update(dt) {
    // this.rad += this.rotationSpeed * dt;
  }

  render(ctx, sprites) {
    ctx.translate(0 + this.tank.size.x / 2, 0 + this.tank.size.y / 2);
    ctx.rotate(this.rad);

    ctx.drawImage(
      sprites["tanks"],
      this.spritePosition.x,
      this.spritePosition.y,
      this.size.x,
      this.size.y,
      0 - this.size.x / 2 / 2,
      0 - this.size.y / 2,
      this.size.x,
      this.size.y
    );
  }
}
