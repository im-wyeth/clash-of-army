export default class ResourceManager {
  constructor() {
    this.sounds = {};
    this.sprites = {};
  }

  getSounds() {
    return this.sounds;
  }

  getSprites() {
    return this.sprites;
  }

  loadSounds(sounds) {}

  loadSprites(sprites) {
    let alreadyLoaded = 0;

    return new Promise((resolve) => {
      for (const img of sprites) {
        const image = new Image();
        image.src = img.src;

        image.onload = () => {
          this.sprites[img.name] = image;

          alreadyLoaded++;
          if (alreadyLoaded >= sprites.length) {
            resolve();
          }
        };
      }
    });
  }
}
