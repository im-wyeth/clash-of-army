import Actor from "../Engine/Actor";

export default abstract class TankAbstraction extends Actor {
  abstract fire(): void;

  abstract moveTo(): void;

  abstract rotateTo(): void;
}
