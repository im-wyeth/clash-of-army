import { SPRITE_SHEETS } from "./Configs";

import Turret from "./Turret";
import Vector2 from "./Vector2";
import WorldEntity from "./WorldEntity";

export default class Tank extends WorldEntity {
  tankId;

  direction;
  spritePosition;

  turret;

  isPlayer;

  constructor(game, tankId, isPlayer) {
    super(game);

    this.tankId = tankId;

    this.direction = new Vector2(0, 0);
    this.spritePosition = new Vector2(0, 0);

    this.isPlayer = isPlayer;

    this.turret = new Turret(game, this);

    // test
    window.addEventListener("click", () => {
      this.shoot();
    });
  }

  setDirection(dx, dy) {
    this.direction.x = dx;
    this.direction.y = dy;
  }

  setSpritePosition(x, y) {
    this.spritePosition.x = x;
    this.spritePosition.y = y;
  }

  getTankId() {
    return this.tankId;
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

    this.turret.render(renderer);
  }

  shoot() {
    // test
    this.turret.shoot();
    //
  }
}
