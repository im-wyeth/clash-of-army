import ActorAccelerationComponent from "../ActorComponents/ActorAccelerationComponent";
import ActorRotationComponent from "../ActorComponents/ActorRotationComponent";
import ActorSpriteComponent from "../ActorComponents/ActorSpriteComponent";
import IActor, { ComponentList } from "../Interfaces/IActor";
import IActorComponents from "../Interfaces/IActorComponents";
import IVector2 from "../Interfaces/IVector2";
import ActorComponents from "./ActorComponents";
import Vector2 from "./Vector2";

export default abstract class Actor implements IActor {
  protected readonly _position: IVector2 = new Vector2(0, 0);
  protected readonly _direction: IVector2 = new Vector2(0, 0);
  protected _radians: number = 0;

  protected readonly _components: ComponentList = [
    undefined,
    undefined,
    undefined,
  ];

  getComponents(): ComponentList {
    return this._components;
  }

  getPosition(): IVector2 {
    return this._position;
  }

  getDirection(): IVector2 {
    return this._direction;
  }

  getRadians(): number {
    return this._radians;
  }

  setPosition(position: IVector2): void {
    this._position.x = position.x;
    this._position.y = position.y;
  }

  setDirection(direction: IVector2): void {
    this._direction.x = direction.x;
    this._direction.y = direction.y;
  }

  update(timeStep: number): void {}
}
