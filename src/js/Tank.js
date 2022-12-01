import Turret from "./Turret";
import Vector2 from "./Vector2";
import WorldEntity from "./WorldEntity";

export default class Tank extends WorldEntity {
  direction;
  spritePosition;

  details;
  turret;

  isPlayer;

  constructor(isPlayer) {
    super();

    this.direction = new Vector2(0, 0);
    this.spritePosition = new Vector2(0, 0);

    this.details = null;

    this.turret = new Turret(this);

    this.isPlayer = isPlayer;
  }

  setDirection(dx, dy) {
    this.direction.x = dx;
    this.direction.y = dy;
  }

  setSpritePosition(x, y) {
    this.spritePosition.x = x;
    this.spritePosition.y = y;
  }

  setDetails(details) {
    this.details = details;
  }

  getTurret() {
    return this.turret;
  }

  update(dt) {
    this.turret.update(dt);
  }

  render(ctx, sprites) {
    ctx.save();

    ctx.translate(
      this.center.x - this.size.x / 2,
      this.center.y - this.size.y / 2
    );

    ctx.drawImage(
      sprites["tanks"],
      this.spritePosition.x,
      this.spritePosition.y,
      this.size.x,
      this.size.y,
      0,
      0,
      this.size.x,
      this.size.y
    );

    this.turret.render(ctx, sprites);

    ctx.restore();
  }

  fire() {}
}
