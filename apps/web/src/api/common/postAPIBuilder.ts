import { APIBuilder } from "./baseAPIBuilder";

export class PostAPIBuilder extends APIBuilder {
  sendRequest() {
    this.withHeader("Content-Type", "application/json");
    // this.withHeader("Content-Type", "application/x-www-form-urlencoded");
    return this.sendRequestAndVerifyResponse("POST");
  }
}
