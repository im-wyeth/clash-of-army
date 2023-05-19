export default class Scene {
  constructor(core) {
    this.core = core;

    this._name = "scene";

    this._ui = null;
  }

  getName() {
    return this._name;
  }
}
