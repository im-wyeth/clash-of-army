import "./styles/styles.css";

import { CANVAS_SIZE, TANKS_DATA, SPRITES } from "./js/Configs";

import Game from "./js/Game";
import Tank from "./js/Tank";

const canvasElem = document.createElement("canvas");
canvasElem.width = CANVAS_SIZE.WIDTH;
canvasElem.height = CANVAS_SIZE.HEIGHT;

const game = new Game(canvasElem);

async function main() {
  await game.getResourceManager().loadSprites(SPRITES);

  const tank = new Tank(game, true);
  tank.setSize(TANKS_DATA[1].w, TANKS_DATA[1].h);
  tank.setPosition(250, 250);
  tank.getTurret().updatePositionOnTank();
  tank.setSpritePosition(TANKS_DATA[1].img_data.x, TANKS_DATA[1].img_data.y);

  tank.getTurret().setSize(TANKS_DATA[1].turret.w, TANKS_DATA[1].turret.h);
  tank
    .getTurret()
    .setSpritePosition(
      TANKS_DATA[1].turret.img_data.x,
      TANKS_DATA[1].turret.img_data.y
    );

  game.getCamera().lookAt(tank);

  game.getWorldEntityManager().addEntity(tank);

  game.play();
}

main();
