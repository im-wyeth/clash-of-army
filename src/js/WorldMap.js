import maps from "./Maps";
import { TILES_DATA } from "./Configs";

export default class WorldMap {
  constructor(game) {
    this.game = game;

    this.id = 0;
  }

  setId(id) {
    this.id = id;
  }

  update(dt) {}

  render(renderer) {
    const tiles = maps[this.id].tiles;

    // for (const tileID of tiles) {
    //   renderer
    //     .getCtx()
    //     .drawImage(
    //       this.game.getResourceManager().getSprites()["tiles"],
    //       TILES_DATA[tileID].sX,
    //       TILES_DATA[tileID].sY,
    //       TILES_DATA[tileID].w,
    //       TILES_DATA[tileID].h,
    //       x * 32,
    //       y * 32,
    //       TILES_DATA[tileID].w,
    //       TILES_DATA[tileID].h
    //     );

    //   if (x >= maps[this.id].width) {
    //     x = 0;
    //     y += 1;
    //   } else {
    //     x++;
    //   }
    // }

    let idx = 0;

    for (let y = 0; y < maps[this.id].height; ++y) {
      for (let x = 0; x < maps[this.id].width; ++x) {
        const tileID = maps[this.id].tiles[y][x];
        const tile = TILES_DATA[tileID];

        renderer.drawImage(
          this.game.getResourceManager().getSprites()["tiles"],
          x * 33 + 16.5,
          y * 33 + 16.5,
          tile.w,
          tile.h,
          0,
          tile.sX,
          tile.sY,
          tile.w,
          tile.h
        );

        idx++;
      }
    }
  }
}
