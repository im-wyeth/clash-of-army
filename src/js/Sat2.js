export default class Sat2 {
  static isRectCollide(r1, r2) {
    return (
      this.isProjectionCollide(r1, r2) <= 0 &&
      this.isProjectionCollide(r2, r1) <= 0
    );
  }

  static isProjectionCollide(rect1, rect2) {}
}
