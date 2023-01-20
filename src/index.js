import "./styles/styles.css";

import { CANVAS_SIZE, TANKS_DATA, SPRITES, SPRITE_SHEETS } from "./js/Configs";
import Game from "./js/Game";
import Tank from "./js/Tank";
import Sprite from "./js/Sprite";

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
  const tankInfo = TANKS_DATA[tank_id];

  const tank = new Tank(game, tank_id);
  tank.setSize(tankInfo.w, tankInfo.h);
  tank.setPosition(250, 250);
  tank.setSprite(
    new Sprite(
      SPRITE_SHEETS.TANKS,
      tankInfo.img_data.sX,
      tankInfo.img_data.sY,
      tankInfo.w,
      tankInfo.h
    )
  );

  tank
    .getTurret()
    .setSize(TANKS_DATA[tank_id].turret.w, TANKS_DATA[tank_id].turret.h);
  tank
    .getTurret()
    .setSprite(
      new Sprite(
        SPRITE_SHEETS.TANKS,
        tankInfo.turret.img_data.sX,
        tankInfo.turret.img_data.sY,
        tankInfo.turret.w,
        tankInfo.turret.h
      )
    );

  game.getCamera().lookAt(tank);

  game.getWorldEntityManager().addEntity(tank);
  game.ComputerControlling.entity = tank;
  //

  canvasBase.appendChild(gameWorldCanvas);
  canvasBase.appendChild(gameCanvas);

  game.play();
}

main();
