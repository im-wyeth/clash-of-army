import ISpriteSheetLoadInfo from "./ISpriteSheetLoadInfo";

export default interface IResourceManager {
  getSpriteSheets(): Map<string, HTMLImageElement>;

  getSounds(): Map<string, HTMLAudioElement>;

  loadSpriteSheets(spriteSheets: Array<ISpriteSheetLoadInfo>): Promise<void>;

  loadSounds(sounds: Array<String>): Promise<void>;
}
