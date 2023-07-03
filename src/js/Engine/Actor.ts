import IActor from "./Interfaces/IActor";
import IActorComponent from "./Interfaces/IActorComponent";
import IVector2 from "./Interfaces/IVector2";
import { Vector2 } from "./Vector2";

export abstract class Actor implements IActor {
  protected readonly _position: IVector2 = new Vector2(0, 0);
  protected readonly _direction: IVector2 = new Vector2(0, 0);
  protected _radians: number = 0;
  protected _isVisible: boolean = true;

  protected readonly _components: Array<IActorComponent> = [];

  setComponent(component: IActorComponent) {
    this._components.push(component);
  }

  getComponent<T>(type: { new (...args: any): T }): null | T {
    for (const component of this._components) {
      if (component instanceof type) {
        return component;
      }
    }

    return null;
  }

  getComponents(): Array<IActorComponent> {
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

  isVisible(): boolean {
    return this._isVisible;
  }

  setPosition(position: IVector2): void {
    this._position.x = position.x;
    this._position.y = position.y;
  }

  setDirection(direction: IVector2): void {
    this._direction.x = direction.x;
    this._direction.y = direction.y;
  }

  setRadians(radians: number): void {
    this._radians = radians;
  }
}
