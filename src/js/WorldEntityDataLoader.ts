import IHTTPClient from "./Interfaces/IHTTPClient";

export default class WorldEntityDataLoader {
  private readonly _httpClient: IHTTPClient;
  private readonly _worldEntityDataPath: string;
  private readonly _tanksDataJsonName: string;

  constructor(
    httpClient: IHTTPClient,
    worldEntityDataPath: string,
    tanksDataJsonName: string
  ) {
    this._httpClient = httpClient;

    this._worldEntityDataPath = worldEntityDataPath;
    this._tanksDataJsonName = tanksDataJsonName;
  }

  async getTanksData(): Promise<any> {
    const res = await this._httpClient.get(
      this._worldEntityDataPath + `/${this._tanksDataJsonName}.json`
    );

    return res.getJSON();
  }
}
