const GAME_TICK_MS = 1000 / 60;

export default class GameLoop {
  constructor(game, renderer) {
    this.game = game;
    this.renderer = renderer;

    this.previousTime = Date.now();
    this.lag = 0;

    this.l = Date.now();
  }

  start() {
    window.requestAnimationFrame(this.loop.bind(this));
  }

  loop() {
    window.requestAnimationFrame(this.loop.bind(this));

    const currentTime = Date.now();
    const elapsedTime = currentTime - this.previousTime;

    this.previousTime = currentTime;
    this.lag += elapsedTime;

    while (this.lag >= GAME_TICK_MS) {
      this.update(GAME_TICK_MS);

      this.lag -= GAME_TICK_MS;
    }

    const interpolationValue = this.lag / GAME_TICK_MS;
    this.render(interpolationValue);
  }

  update(tickMs) {
    this.game.getWorldEntityManager().update(tickMs);
    this.game.getWorldEffectManager().update(tickMs);
  }

  render(interpolationValue) {
    this.game.getCamera().begin(this.renderer.getCtx());

    // test
    this.renderer
      .getCtx()
      .clearRect(
        0,
        0,
        this.renderer.getCanvas().width,
        this.renderer.getCanvas().height
      );

    this.game.getWorld().render(this.renderer, interpolationValue);
    this.game.getWorldEntityManager().render(this.renderer, interpolationValue);
    this.game.getWorldEffectManager().render(this.renderer, interpolationValue);

    this.game.getCamera().end(this.renderer.getCtx());
  }
}
