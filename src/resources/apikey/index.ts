import { Base } from "../base.ts";
import {
  ApiKeyQueryParams,
  ApiKeyResponse,
  ApiKeyRequestBody,
  ApiKeyUpdateRequestBody,
  ApiKeyType,
} from "./types.ts";

export class ApiKey extends Base {
  search(queryParams?: ApiKeyQueryParams): Promise<ApiKeyResponse> {
    const queryString = queryParams
      ? `?${new URLSearchParams(
          queryParams as Record<string, string>
        ).toString()}`
      : "";
    return this.request(`api-keys${queryString}`, { method: "GET" });
  }

  create(payload: ApiKeyRequestBody): Promise<ApiKeyType> {
    return this.request(`api-key`, {
      data: payload,
      method: "POST",
    });
  }

  delete(apiKeyId: string): Promise<ApiKeyResponse> {
    return this.request(`api-key/${apiKeyId}`, {
      method: "DELETE",
    });
  }

  update(
    apiKeyId: string,
    payload: ApiKeyUpdateRequestBody
  ): Promise<ApiKeyType> {
    return this.request(`api-key/${apiKeyId}`, {
      data: payload,
      method: "PATCH",
    });
  }
}
