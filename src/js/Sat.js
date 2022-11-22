export default class Sat {
  static isRectCollide(rect, onRect) {
    const lines = onRect.getAxes();
    const corners = rect.getCorners();

    const rectHalfSize = onRect.size.x / 2;

    for (const line of lines) {
      let min, max;

      for (const corner of corners) {
        const projected = corner.project(line);
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
