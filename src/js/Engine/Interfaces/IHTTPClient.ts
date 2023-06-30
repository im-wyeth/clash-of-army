import IHTTPResponse from "./IHTTPResponse";

export default interface IHTTPClient {
  get(path: string): Promise<IHTTPResponse>;
}
