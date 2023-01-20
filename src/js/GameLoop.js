export default class GameLoop {
  constructor(game, renderer) {
    this.game = game;
    this.renderer = renderer;

    this.lastDT = Date.now();

    this.rAF = null;
  }

  start() {
    this.rAF = window.requestAnimationFrame(this.loop.bind(this));
  }

  loop() {
    if (this.paused) return;

    const dt = Date.now() - this.lastDT;
    this.lastDT = Date.now();

    this.game.getCamera().update(dt);

    // test
    this.renderer.getCtx().fillStyle = "gray";
    this.renderer
      .getCtx()
      .fillRect(
        0,
        0,
        this.renderer.getCanvas().width,
        this.renderer.getCanvas().height
      );

    this.renderer.getCtx().save();

    this.renderer
      .getCtx()
      .translate(
        -this.game.getCamera().center.x,
        -this.game.getCamera().center.y
      );
    this.renderer
      .getCtx()
      .scale(this.game.getCamera().scale, this.game.getCamera().scale);
    this.game.getWorldMap().render(this.renderer);

    this.game.getWorldEntityManager().loop(dt, this.renderer);

    this.renderer.getCtx().restore();

    window.requestAnimationFrame(this.loop.bind(this));
  }
}
