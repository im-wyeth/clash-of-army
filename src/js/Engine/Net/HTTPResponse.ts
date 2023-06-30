import IHTTPResponse from "../Interfaces/IHTTPResponse";

export class HTTPResponse implements IHTTPResponse {
  private readonly _json: object;

  constructor(json: object) {
    this._json = json;
  }

  getJSON(): object {
    return this._json;
  }
}
