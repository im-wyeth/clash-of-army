import Vector2 from "./Vector2";

export default class SpriteFrame {
  source;
  size;

  spriteSheetName;

  constructor(x, y, w, h, spriteSheetName) {
    this.sourcePosition = new Vector2(x, y);
    this.size = new Vector2(w, h);

    this.spriteSheetName = spriteSheetName;
  }

  getSize() {
    return this.size;
  }

  render(ctx, sprites) {
    ctx.drawImage(
      sprites[this.spriteSheetName],
      this.sourcePosition.x,
      this.sourcePosition.y,
      this.size.x,
      this.size.y,
      0 - this.size.x / 2,
      0 - this.size.y / 2,
      this.size.x,
      this.size.y
    );
  }
}
