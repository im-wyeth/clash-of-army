import Vector2 from "./Vector2";

export default class SpriteFrame {
  sourcePosition;
  size;

  spriteSheetName;

  constructor(sX, sY, w, h, spriteSheetName) {
    this.sourcePosition = new Vector2(sX, sY);
    this.size = new Vector2(w, h);
    this.spriteSheetName = spriteSheetName;
  }

  getSourcePosition() {
    return this.sourcePosition;
  }

  getSize() {
    return this.size;
  }

  getSpriteSheetName() {
    return this.spriteSheetName;
  }
}
