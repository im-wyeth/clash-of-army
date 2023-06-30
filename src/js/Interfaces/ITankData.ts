import ISpriteData from "../Engine/Interfaces/ISpriteData";
import ITankTurretData from "./ITankTurretData";

export default interface ITankData {
  getSpriteData(): ISpriteData;

  getTurretData(): ITankTurretData;
}
