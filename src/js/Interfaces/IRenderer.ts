export default interface IRenderer {
  clear(): void;

  drawImage(
    img: HTMLImageElement,
    x: number,
    y: number,
    w: number,
    h: number,
    r: number,
    sX: number,
    sY: number,
    sW: number,
    sH: number,
    originShiftX: number,
    originShiftY: number
  ): void;

  drawRectangle(
    x: number,
    y: number,
    w: number,
    h: number,
    r: number,
    color: string
  ): void;

  drawText(
    text: string,
    font: string,
    color: string,
    size: number,
    x: number,
    y: number
  ): void;
}
