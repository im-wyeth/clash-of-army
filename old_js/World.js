import { LOCATIONS } from "./Locations";
import { TILES_DATA } from "./Configs";

export default class World {
  constructor(game) {
    this.game = game;

    // test
    this.id = 1;
  }

  render(renderer) {
    this.renderTileMap(renderer);
  }

  renderTileMap(renderer) {
    renderer.getCtx().save();

    renderer.getCtx().fillStyle = "rgba(1, 1, 1, 0.5)";
    renderer.getCtx().fillRect(0, 0, 2000, 2000);

    renderer.getCtx().globalCompositeOperation = "destination-out";

    renderer.getCtx().save();

    renderer.getCtx().filter = "blur(10px)";

    const a = this.game.getWorldEntityManager().entities[0].center;
    renderer.getCtx().fillStyle = "red";
    renderer.getCtx().beginPath();
    renderer.getCtx().arc(a.x, a.y, 450, 0, Math.PI * 2);
    renderer.getCtx().fill();
    renderer.getCtx().closePath();

    renderer.getCtx().restore();

    renderer.getCtx().globalCompositeOperation = "destination-over";

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

    renderer.getCtx().restore();
  }
}
