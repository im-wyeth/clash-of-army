import { SpriteSheetLoadInfoType } from "./Types";

export class SpriteSheetLoadInfo implements SpriteSheetLoadInfoType {
  constructor(readonly name: string, readonly src: string) {}
}
