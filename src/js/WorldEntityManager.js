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

  loop(dt, renderer) {
    for (const entity of this.entities) {
      entity.update(dt);
      entity.render(renderer);
    }

    const effects = this.game.getWorldEffectManager().getEffects();

    for (const effect of effects) {
      effect.update(dt);
      effect.render(renderer);
    }
  }
}
