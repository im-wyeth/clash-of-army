import { LOCATIONS } from "./Locations";
import { TILES_DATA } from "./Configs";

export default class World {
  constructor(game) {
    this.game = game;

    // test
    this.id = 1;
  }

  loop(dt, renderer) {
    this.renderTileMap(renderer);
  }

  renderTileMap(renderer) {
    for (let y = 0; y < LOCATIONS[this.id].height; ++y) {
      for (let x = 0; x < LOCATIONS[this.id].width; ++x) {
        const tileID = LOCATIONS[this.id].tiles[y][x];
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
      }
    }
  }
}
