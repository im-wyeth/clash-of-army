import HTTPResponse from "./HTTPResponse";
import IHTTPClient from "./Interfaces/IHTTPClient";

export default class FetchClient implements IHTTPClient {
  async get(path: string): Promise<HTTPResponse> {
    const res = await fetch(path, {
      method: "GET",
    });

    const httpResponse = new HTTPResponse(res.json());

    return httpResponse;
  }
}
