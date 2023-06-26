import { Vector2, degToRad, radToVec } from "@nexty-org/core";
import Parcticle from "./Parcticle";

function random(min, max) {
  return Math.random() * (max - min) + min;
}

export default class ParcticleSystem {
  constructor() {
    this.spawnTimeInMs = 0;
    this.maxSpawnTimeInMs = 200;

    this.center = new Vector2(0, 0);

    this.rad = 0;

    this.active = false;

    this.parcticles = [];
    for (let i = 0; i < 100; ++i) {
      this.parcticles.push(new Parcticle());
    }
  }

  activate(x, y) {
    this.center.x = x;
    this.center.y = y;

    this.active = true;
  }

  spawnParcticles() {
    let quantity = 0;

    for (const p of this.parcticles) {
      if (!p.isAlive()) {
        const x = random(1, 6) + this.center.x;
        const y = random(1, 6) + this.center.y;

        const degForDir = random(240, 300);
        const dir = radToVec(degToRad(degForDir)).nor();

        const rad = random(1, 6);
        const opacity = random(0.5, 0.8);

        p.spawn(x, y, dir.x, dir.y, rad, opacity);

        quantity++;

        if (quantity >= 4) {
          break;
        }
      }
    }
  }

  update(tickMs) {
    if (!this.active) {
      return;
    }

    if (this.spawnTimeInMs >= this.maxSpawnTimeInMs) {
      this.spawnParcticles();

      this.spawnTimeInMs = 0;
    } else {
      this.spawnTimeInMs += tickMs;
    }

    for (const p of this.parcticles) {
      p.update(tickMs);
    }
  }

  render(renderer, interpolationValue) {
    if (!this.active) {
      return;
    }

    renderer.getCtx().save();
    renderer.getCtx().translate(this.center.x, this.center.y);
    renderer.getCtx().rotate(this.rad);
    renderer.getCtx().translate(-this.center.x, -this.center.y);

    for (const p of this.parcticles) {
      p.render(renderer, interpolationValue);
    }

    renderer.getCtx().restore();
  }
}
