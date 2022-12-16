import { SPRITE_SHEETS } from "./Configs";

import Turret from "./Turret";
import Vector2 from "./Vector2";
import WorldEntity from "./WorldEntity";

export default class Tank extends WorldEntity {
  direction;
  spritePosition;

  turret;

  isPlayer;

  constructor(game, isPlayer) {
    super(game);

    this.direction = new Vector2(0, 0);
    this.spritePosition = new Vector2(0, 0);

    this.turret = new Turret(game, this);

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

  render(renderer) {
    const sprites = this.game.getResourceManager().getSprites();

    renderer.drawImage(
      sprites[SPRITE_SHEETS.TANKS],
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

    this.turret.render(renderer, sprites);
  }

  shoot() {
    // test
    this.turret.shoot();
    //
  }
}
