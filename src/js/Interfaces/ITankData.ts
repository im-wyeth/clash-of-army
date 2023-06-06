import ISpriteData from "./ISpriteData";
import ITankTurretData from "./ITankTurretData";

export default interface ITankData {
  getSpriteData(): ISpriteData;

  getTurretData(): ITankTurretData;
}
