import { APIBuilder } from "./baseAPIBuilder";

export class PostAPIBuilder extends APIBuilder {
  sendRequest<TResponse>() {
    this.withHeader("Content-Type", "application/json");
    // this.withHeader("Content-Type", "application/x-www-form-urlencoded");
    return this.sendRequestAndVerifyResponse<TResponse>("POST");
  }
}
