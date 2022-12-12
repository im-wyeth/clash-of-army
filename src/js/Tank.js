import Turret from "./Turret";
import Vector2 from "./Vector2";
import WorldEntity from "./WorldEntity";

export default class Tank extends WorldEntity {
  renderer;

  direction;
  spritePosition;

  rad;

  turret;

  isPlayer;

  constructor(renderer, isPlayer, effectsEmitter) {
    super();

    this.renderer = renderer;

    this.direction = new Vector2(0, 0);
    this.spritePosition = new Vector2(0, 0);

    this.rad = 0;

    this.turret = new Turret(renderer, this, effectsEmitter);

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

  getTurret() {
    return this.turret;
  }

  update(dt) {
    this.turret.update(dt);
  }

  render(sprites) {
    // ctx.save();

    // ctx.rotate(this.rad);

    // ctx.drawImage(
    //   sprites["tanks"],
    //   this.spritePosition.x,
    //   this.spritePosition.y,
    //   this.size.x,
    //   this.size.y,
    //   this.center.x - this.size.x / 2,
    //   this.center.y - this.size.y / 2,
    //   this.size.x,
    //   this.size.y
    // );

    // ctx.restore();

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

    this.turret.render(sprites);
  }

  fire() {
    this.turret.fire();
  }
}
