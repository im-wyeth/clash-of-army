export default interface IImageLoader {
  loadImage(src: string): Promise<null | HTMLImageElement>;
}
