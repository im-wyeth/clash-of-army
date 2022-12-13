import Vector2 from "./Vector2";

export default class Sat {
  static project(corner, line) {
    let dotvalue =
      line.direction.x * (corner.x - line.origin.x) +
      line.direction.y * (corner.y - line.origin.y);

    return new Vector2(
      line.origin.x + line.direction.x * dotvalue,
      line.origin.y + line.direction.y * dotvalue
    );
  }

  static isRectCollide(rect, onRect) {
    const lines = onRect.getAxes();
    const corners = rect.getCorners();

    const rectHalfSize = onRect.size.x / 2;

    for (const line of lines) {
      let min, max;

      for (const corner of corners) {
        const projected = this.project(corner, line);
        const CP = projected.minus(onRect.center);

        if (!min || min > CP.magnitude) {
          min = CP.magnitude;
        }
        if (!max || max < CP.magnitude) {
          max = CP.magnitude;
        }
      }

      if (min > rectHalfSize && max > rectHalfSize) {
        return false;
      }
    }

    return true;
  }
}
