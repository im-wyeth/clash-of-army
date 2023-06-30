import { Scene } from "../Engine/Scene";
import ICamera from "../Engine/Interfaces/ICamera";

export default class WorldScene extends Scene {
  constructor(camera: ICamera) {
    super(camera);

    this._name = "world";
  }
}
