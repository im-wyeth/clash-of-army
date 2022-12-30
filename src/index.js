import "./styles/styles.css";

import { CANVAS_SIZE, TANKS_DATA, SPRITES } from "./js/Configs";
import Game from "./js/Game";
import Tank from "./js/Tank";

const canvasBase = document.getElementsByClassName("canvas-base")[0];

const gameWorldCanvas = document.createElement("canvas");
gameWorldCanvas.width = CANVAS_SIZE.WIDTH;
gameWorldCanvas.height = CANVAS_SIZE.HEIGHT;
gameWorldCanvas.classList.add("game-world-canvas");

const gameCanvas = document.createElement("canvas");
gameCanvas.width = CANVAS_SIZE.WIDTH;
gameCanvas.height = CANVAS_SIZE.HEIGHT;
gameCanvas.classList.add("game-canvas");

const game = new Game(gameWorldCanvas, gameCanvas);

async function main() {
  await game.getResourceManager().loadSprites(SPRITES);

  // test
  const tank_id = 1;

  const tank = new Tank(game, tank_id, true);
  tank.setSize(TANKS_DATA[tank_id].w, TANKS_DATA[tank_id].h);
  tank.setPosition(150, 150);
  tank.getTurret().updatePositionOnTank();
  tank.setSpritePosition(
    TANKS_DATA[tank_id].img_data.sX,
    TANKS_DATA[tank_id].img_data.sY
  );

  tank
    .getTurret()
    .setSize(TANKS_DATA[tank_id].turret.w, TANKS_DATA[tank_id].turret.h);
  tank
    .getTurret()
    .setSpritePosition(
      TANKS_DATA[tank_id].turret.img_data.sX,
      TANKS_DATA[tank_id].turret.img_data.sY
    );

  game.getCamera().lookAt(tank);

  game.getWorldEntityManager().addEntity(tank);
  //

  canvasBase.appendChild(gameWorldCanvas);
  canvasBase.appendChild(gameCanvas);

  game.play();
}

main();
