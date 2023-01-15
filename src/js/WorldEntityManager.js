export default class WorldEntityManager {
  entities;

  constructor() {
    this.entities = [];
  }

  getEntities() {
    return this.entities;
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
