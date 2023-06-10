import Scene from "../Engine/Scene";
import ICamera from "../Interfaces/ICamera";

export default class MenuScene extends Scene {
  constructor(camera: ICamera) {
    super(camera);

    this._name = "menu";
  }
}
