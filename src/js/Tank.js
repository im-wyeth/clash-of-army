import Turret from "./Turret";
import Vector2 from "./Vector2";
import WorldEntity from "./WorldEntity";

export default class Tank extends WorldEntity {
  direction;

  details;
  turret;

  isPlayer;

  constructor(isPlayer) {
    super();

    this.direction = new Vector2(0, 0);
    this.details = null;

    this.turret = new Turret(this);

    this.isPlayer = isPlayer;
  }

  setDirection(dx, dy) {
    this.direction.x = dx;
    this.direction.y = dy;
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

  render(ctx, res) {
    ctx.save();

    ctx.translate(
      this.center.x - this.size.x / 2,
      this.center.y - this.size.y / 2
    );

    for (const detail of this.details) {
      ctx.drawImage(
        res[detail.imgName],
        detail.x,
        detail.y,
        detail.w,
        detail.h
      );
    }

    this.turret.render(ctx, res);

    ctx.restore();
  }
}
