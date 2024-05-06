export abstract class APIBuilder {
  private readonly targetUrl: string;
  protected requestBody?: BodyInit;
  protected customRequestHeaders = new Headers({
    // mode: "cors",
    cache: "no-cache",
    // credentials: "same-origin",
    redirect: "follow",
    referrerPolicy: "no-referrer",
    // "Content-Type": "application/x-www-form-urlencoded",
  });

  constructor(endpoint: string, baseUrl: string) {
    this.targetUrl = `${baseUrl}${endpoint}`;
  }

  protected async sendRequestAndVerifyResponse<TResponse>(
    httpMethod: RequestInit["method"]
  ): Promise<TResponse> {
    const response = await fetch(this.targetUrl, {
      method: httpMethod,
      headers: this.customRequestHeaders,
      body: this.requestBody,
    })
      .then((res) => res.json())
      .catch((e) => {
        throw e;
      });

    return response;
  }

  protected withHeader(name: string, value: string) {
    this.customRequestHeaders.set(name, value);
  }
  withBody<TBody extends object>(BodyData: TBody) {
    this.requestBody = JSON.stringify(BodyData);
  }
}
