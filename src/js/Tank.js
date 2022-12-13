import Turret from "./Turret";
import Vector2 from "./Vector2";
import WorldEntity from "./WorldEntity";

export default class Tank extends WorldEntity {
  direction;
  spritePosition;

  turret;

  isPlayer;

  constructor(renderer, isPlayer, effectsEmitter) {
    super(renderer);

    this.renderer = renderer;

    this.direction = new Vector2(0, 0);
    this.spritePosition = new Vector2(0, 0);

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
    // test
    this.turret.fire();
    //
  }
}
