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

  // test
  const tank_id = 1;

  const tank = new Tank(game, tank_id, true);
  tank.setSize(TANKS_DATA[tank_id].w, TANKS_DATA[tank_id].h);
  tank.setPosition(150, 150);
  tank.getTurret().updatePositionOnTank();
  tank.setSpritePosition(
    TANKS_DATA[tank_id].img_data.x,
    TANKS_DATA[tank_id].img_data.y
  );

  tank
    .getTurret()
    .setSize(TANKS_DATA[tank_id].turret.w, TANKS_DATA[tank_id].turret.h);
  tank
    .getTurret()
    .setSpritePosition(
      TANKS_DATA[tank_id].turret.img_data.x,
      TANKS_DATA[tank_id].turret.img_data.y
    );

  game.getCamera().lookAt(tank);

  game.getWorldEntityManager().addEntity(tank);
  //

  document.body.appendChild(canvasElem);

  game.play();
}

main();
