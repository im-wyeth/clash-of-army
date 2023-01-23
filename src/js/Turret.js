import { SPRITE_SHEETS, TANKS_DATA } from "./Configs";
import FrameAnimation from "./FrameAnimation";
import Vector2 from "./Vector2";
import {
  convertSpriteDataToSpriteModels,
  radToVec,
  rotateTo,
  vecToRad,
} from "./Utils";
import MilitaryEquipment from "./MilitaryEquipment";
import Sprite from "./Sprite";

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

    this.game
      .getEventManager()
      .addCallerToElem(
        this.game.getGameRenderer().getCanvas(),
        "mousemove",
        this.mouseMoveHandler.bind(this)
      );
  }

  isShooting() {
    return this.shooting;
  }

  update(dt) {
    // test
    if (this.rotating && !this.shooting) {
      this.rad = rotateTo(this.rad, this.radTo, this.rotationSpeed * dt);

      // solve this problem
      // console.log(1);

      if (this.rad === this.radTo) {
        // console.log(2)

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
    this.shooting = true;

    let effectCenter = this.parent.getPosition();

    this.shootAnimation.play(effectCenter.x, effectCenter.y, this.rad);

    let dir = radToVec(this.rad);

    // test
    this.game
      .getWorldEffectManager()
      .activateEffect(
        "turret_shoot_smoke_1",
        effectCenter.x + dir.x * 75,
        effectCenter.y + dir.y * 75,
        this.rad
      );
  }

  // test
  mouseMoveHandler(e) {
    const canvasScaleCoefficient =
      this.game.getGameRenderer().getCanvas().clientWidth / 1200;

    const mouseX = Math.round(e.offsetX / canvasScaleCoefficient);
    const mouseY = Math.round(e.offsetY / canvasScaleCoefficient);

    const camera = this.game.getCamera();
    const worldX = mouseX + camera.center.x;
    const worldY = mouseY + camera.center.y;

    let vec = new Vector2(
      worldX - this.parent.center.x,
      worldY - this.parent.center.y
    );

    this.radTo = vecToRad(vec.nor());

    this.rotating = true;
  }
}
