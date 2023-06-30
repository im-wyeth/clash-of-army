import IMathUtils from "./Interfaces/IMathUtils";

const TWO_PI = Math.PI * 2;

export class MathUtils implements IMathUtils {
  constructor() {}

  normalizeRadians(radians: number): number {
    return radians < 0 || radians > TWO_PI
      ? (radians + TWO_PI) % TWO_PI
      : radians;
  }

  minDistanceBetweenRadians(one: number, two: number): number {
    return Math.abs(one - two) % TWO_PI;
  }
}
