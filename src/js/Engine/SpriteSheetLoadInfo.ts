export class SpriteSheetLoadInfo {
  private readonly _name: string;
  private readonly _src: string;

  constructor(name: string, src: string) {
    this._name = name;
    this._src = src;
  }

  getName(): string {
    return this._name;
  }

  getSrc(): string {
    return this._src;
  }
}
