export default class WorldEntityManager {
  entities;

  constructor(game) {
    this.game = game;

    this.entities = [];
  }

  getEntities() {
    return this.entities;
  }

  addEntity(entity) {
    this.entities.push(entity);
  }

  update(tickMs) {
    for (const entity of this.entities) {
      entity.update(tickMs);
    }
  }

  render(renderer, interpolationValue) {
    for (const entity of this.entities) {
      entity.render(renderer, interpolationValue);
    }
  }
}
