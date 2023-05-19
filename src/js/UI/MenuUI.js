export default class MenuUI {
  constructor(core) {
    this.core = core;
  }

  update(timeStep) {}

  render(interpolationValue) {
    this.core.getRenderer().drawText("Start!", "Arial", "white", 30, 150, 150);
  }
}
