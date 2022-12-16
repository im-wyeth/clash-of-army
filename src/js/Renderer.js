export default class Renderer {
  canvas;
  ctx;

  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
  }

  getCanvas() {
    return this.canvas;
  }

  getCtx() {
    return this.ctx;
  }

  antialiasing(val) {
    this.ctx.imageSmoothingEnabled = val;
  }

  drawImage(img, x, y, w, h, r, sX, sY, sW, sH) {
    this.ctx.save();

    this.ctx.translate(x, y);
    this.ctx.rotate(r);
    this.ctx.translate(-w / 2, -h / 2);

    this.ctx.drawImage(img, sX, sY, sW, sH, 0, 0, w, h);

    this.ctx.restore();
  }
}
