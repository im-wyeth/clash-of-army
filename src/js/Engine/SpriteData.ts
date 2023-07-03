import IVector2 from "./Interfaces/IVector2";
import { SpriteDataType } from "./Types/SpriteData.Type";

export class SpriteData implements SpriteDataType {
  constructor(
    readonly sheetName: string,
    readonly size: IVector2,
    readonly source: IVector2,
    readonly origin: IVector2
  ) {}
}
