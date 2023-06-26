import { convertMousePointToWorld } from "@nexty-org/core";

export default class ComputerControlling {
  constructor(game) {
    this.game = game;

    // test
    this.entity = null;

    const eventManager = this.game.getEventManager();
    eventManager.addCaller("click", this.click.bind(this));
    eventManager.addCaller("keydown", this.keydown.bind(this));
    eventManager.addCaller("keyup", this.keyup.bind(this));
    eventManager.addCaller("mousemove", this.mousemove.bind(this));

    console.log(1);
  }

  click() {
    this.entity.shoot();
  }

  keydown(e) {
    if (e.repeat) return;

    switch (e.key) {
      case "w":
        this.entity.moveForward();
        break;
      case "s":
        this.entity.moveBackward();
        break;
      case "d":
        this.entity.rotateRight();
        break;
      case "a":
        this.entity.rotateLeft();
        break;
    }
  }

  keyup(e) {
    if (e.repeat) return;

    switch (e.key) {
      case "w":
      case "s":
        this.entity.gasUnpress();
        break;
      case "d":
        this.entity.stopRotation();
      case "a":
        this.entity.stopRotation();
        break;
    }
  }

  mousemove(e) {
    // test
    const canvasScaleCoefficient = 1;

    const mouseX = Math.round(e.offsetX / canvasScaleCoefficient);
    const mouseY = Math.round(e.offsetY / canvasScaleCoefficient);

    const { x, y } = this.game.getCamera().getOffset();
    const world = convertMousePointToWorld(
      mouseX,
      mouseY,
      this.game.getCamera().getZoom(),
      x,
      y
    );

    this.entity
      .getTurret()
      .rotateToPoint(
        world.x - this.entity.center.x,
        world.y - this.entity.center.y
      );
  }
}
