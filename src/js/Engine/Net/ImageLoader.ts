import IImageLoader from "../Interfaces/IImageLoader";

export class ImageLoader implements IImageLoader {
  async loadImage(src: string): Promise<null | HTMLImageElement> {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = src;

      img.onload = () => {
        resolve(img);
      };

      img.onerror = () => {
        resolve(null);
      };
    });
  }
}
