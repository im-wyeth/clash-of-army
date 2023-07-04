import IVector2 from "../Engine/Interfaces/IVector2";

type Engine = {
  positionOnTank: IVector2;
};

export type TankDetailsDataType = {
  engine: Engine;
};
