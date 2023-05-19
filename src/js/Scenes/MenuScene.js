import Scene from "./Scene";

import Loop from "../Loop";
import MenuUI from "../UI/MenuUI";

export default class MenuScene extends Scene {
  constructor(core) {
    super(core);

    this._name = "menu";

    this._loop = new Loop();
    this._loop.init();

    this._loop.onUpdate(this.update.bind(this));
    this._loop.onRender(this.render.bind(this));

    this._ui = new MenuUI(this.core);
  }

  update(timeStep) {}

  render(interpolationValue) {
    this._ui.render(interpolationValue);
  }
}
