import { SpriteSheetLoadInfoType } from "../Types";

export default interface IResourceManager {
  getSpriteSheets(): Map<string, HTMLImageElement>;

  getSounds(): Map<string, HTMLAudioElement>;

  loadSpriteSheets(spriteSheets: Array<SpriteSheetLoadInfoType>): Promise<void>;

  loadSounds(sounds: Array<String>): Promise<void>;
}
