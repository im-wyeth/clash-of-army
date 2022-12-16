export default class WorldEntityManager {
  constructor() {
    this.entities = [];
  }

  addEntity(entity) {
    this.entities.push(entity);
  }

  loop(dt, renderer) {
    for (const entity of this.entities) {
      entity.update(dt);
      entity.render(renderer);
    }
  }
}
