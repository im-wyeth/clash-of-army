import { SPRITE_SHEETS, TANKS_DATA } from "./Configs";
import FrameAnimation from "./FrameAnimation";
import Vector2 from "./Vector2";
import {
  convertSpriteDataToSpriteModels,
  radToVec,
  rotateTo,
  vecToRad,
  normalizeRadian,
} from "./Utils";
import MilitaryEquipment from "./MilitaryEquipment";

export default class Turret extends MilitaryEquipment {
  game;

  parent;

  rotating;
  shooting;

  constructor(game, parent) {
    super();

    this.game = game;

    this.parent = parent;

    this.rotating = false;
    this.shooting = false;

    // test
    this.shootAnimation = new FrameAnimation(
      convertSpriteDataToSpriteModels(
        TANKS_DATA[this.parent.getId()].turret.animations.shoot,
        SPRITE_SHEETS.TANKS
      )
    );
  }

  isShooting() {
    return this.shooting;
  }

  update(dt) {
    // test
    if (this.rotating && !this.shooting) {
      this.rad = rotateTo(
        normalizeRadian(this.rad),
        normalizeRadian(this.radTo),
        this.rotationSpeed * dt
      );

      if (this.rad === this.radTo) {
        this.rotating = false;
      }
    }
    //

    if (this.shootAnimation.isPlaying()) {
      this.shootAnimation.update(dt);
    } else {
      if (this.shooting) {
        this.shooting = false;
      }
    }
  }

  render(renderer) {
    const sprites = this.game.getResourceManager().getSprites();

    if (this.shootAnimation.isPlaying()) {
      const sprite = this.shootAnimation.frames[this.shootAnimation.currFrame];

      renderer.drawImage(
        sprites[sprite.sheetName],
        this.center.x,
        this.center.y,
        sprite.size.x,
        sprite.size.y,
        this.rad,
        sprite.sourcePosition.x,
        sprite.sourcePosition.y,
        sprite.size.x,
        sprite.size.y,
        21,
        0
      );
    } else {
      // test
      renderer.drawImage(
        sprites["tanks"],
        this.center.x,
        this.center.y,
        this.size.x,
        this.size.y,
        this.rad,
        this.sprite.sourcePosition.x,
        this.sprite.sourcePosition.y,
        this.size.x,
        this.size.y,
        21,
        0
      );
    }
  }

  shoot() {
    //test
    const effectCenter = this.parent.getPosition();
    const dir = radToVec(this.rad);

    this.shootAnimation.play(effectCenter.x, effectCenter.y, this.rad);

    this.game
      .getWorldEffectManager()
      .activateEffect(
        "turret_shoot_smoke_1",
        effectCenter.x + dir.x * 95,
        effectCenter.y + dir.y * 95,
        this.rad
      );

    this.shooting = true;
  }

  // test
  rotateToPoint(pointX, pointY) {
    let vecToPoint = new Vector2(pointX, pointY);

    this.radTo = vecToRad(vecToPoint.nor());

    this.rotating = true;
  }
}
