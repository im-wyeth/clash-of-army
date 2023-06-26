import { Vector2 } from "@nexty-org/core";

// test
const ONE_SECOND_MS = 1000;

export default class Parcticle {
  constructor() {
    this.minSize = 1;
    this.maxSize = 30;
    this.sizeDecreaseSpeedPerSecond = 10;

    this.live = false;
    this.maxLiveTimeInMs = 2500;
    this.liveTimeInMs = 0;

    this.center = new Vector2(0, 0);
    this.direction = new Vector2(0, 0);
    this.size = new Vector2(30, 30);

    this.rad = 0;
    this.velocityPerSecond = 100;
    this.opacity = 1;
    this.opacityDecreaseSpeedPerSecond = 0.1;

    this.rotationRadSpeedPerSecond = 1.2;
  }

  isAlive() {
    return this.live;
  }

  spawn(x, y, dX, dY, rad, opacity) {
    this.center.x = x;
    this.center.y = y;
    this.direction.x = dX;
    this.direction.y = dY;

    this.rad = rad;
    this.opacity = opacity;

    this.size.x = this.maxSize;
    this.size.y = this.maxSize;

    this.live = true;
  }

  update(tickMs) {
    if (!this.live) {
      return;
    }

    if (this.liveTimeInMs < this.maxLiveTimeInMs) {
      this.liveTimeInMs += tickMs;
    } else {
      this.live = false;
      this.liveTimeInMs = 0;
    }

    this.center.x +=
      this.direction.x * ((this.velocityPerSecond / ONE_SECOND_MS) * tickMs);
    this.center.y +=
      this.direction.y * ((this.velocityPerSecond / ONE_SECOND_MS) * tickMs);

    if (this.size.x > this.minSize) {
      this.size.x -= (this.sizeDecreaseSpeedPerSecond / ONE_SECOND_MS) * tickMs;
      this.size.y -= (this.sizeDecreaseSpeedPerSecond / ONE_SECOND_MS) * tickMs;
    }

    this.opacity -=
      (this.opacityDecreaseSpeedPerSecond / ONE_SECOND_MS) * tickMs;

    this.rad += (this.rotationRadSpeedPerSecond / ONE_SECOND_MS) * tickMs;
  }

  render(renderer, interpolationValue) {
    if (!this.live) {
      return;
    }

    const ctx = renderer.getCtx();

    ctx.fillStyle = `rgba(133, 95, 57, ${this.opacity})`;

    renderer.drawRectangle(
      this.center.x,
      this.center.y,
      this.size.x,
      this.size.y,
      this.rad
    );
  }
}
