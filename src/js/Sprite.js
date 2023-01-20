import Vector2 from "./Vector2";

export default class Sprite {
  sheetName;

  sourcePosition;
  size;

  constructor(sheetName, sX, sY, w, h) {
    this.sheetName = sheetName;

    this.sourcePosition = new Vector2(sX, sY);
    this.size = new Vector2(w, h);
  }
}
