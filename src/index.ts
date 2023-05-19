import "./styles/styles.css";

import { CANVAS_SIZE, TANKS_DATA, SPRITES, SPRITE_SHEETS } from "./js/Configs";
import Core from "./js/Core";

// import Game from "./js/Game";
// import Tank from "./js/Tank";
// import { Sprite } from "@nexty-org/core";
// import ParcticleSystem from "./js/ParcticleSystem";

const canvas = document.createElement("canvas");
canvas.width = CANVAS_SIZE.WIDTH;
canvas.height = CANVAS_SIZE.HEIGHT;
canvas.classList.add("canvas");

const core = new Core(canvas);
// const game = new Game(gameCanvas);

async function main() {
  await core.init();

  // await game.getResourceManager().loadSprites(SPRITES);
  // // test
  // const tank_id = 1;
  // const tankInfo = TANKS_DATA[tank_id];
  // const tank = new Tank(game, tank_id);
  // tank.setSize(tankInfo.w, tankInfo.h);
  // tank.setPosition(250, 250);
  // tank.setSprite(
  //   new Sprite(
  //     SPRITE_SHEETS.TANKS,
  //     tankInfo.img_data.sX,
  //     tankInfo.img_data.sY,
  //     tankInfo.w,
  //     tankInfo.h
  //   )
  // );
  // tank
  //   .getTurret()
  //   .setSize(TANKS_DATA[tank_id].turret.w, TANKS_DATA[tank_id].turret.h);
  // tank
  //   .getTurret()
  //   .setSprite(
  //     new Sprite(
  //       SPRITE_SHEETS.TANKS,
  //       tankInfo.turret.img_data.sX,
  //       tankInfo.turret.img_data.sY,
  //       tankInfo.turret.w,
  //       tankInfo.turret.h
  //     )
  //   );
  // // game.getCamera().lookAt(tank);
  // const parcticleSystem = new ParcticleSystem();
  // parcticleSystem.activate(400, 400);
  // game.getWorldEntityManager().addEntity(tank);
  // game.getWorldEntityManager().addEntity(parcticleSystem);
  // game.computerControlling.entity = tank;
  // //
  document.body.appendChild(canvas);
  // game.play();
}

main();
