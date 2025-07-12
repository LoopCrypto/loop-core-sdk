import { Base } from "../base.ts";
import {
    ApiKeyQueryParams,
    ApiKeysResponse,
    CreateApiKeyRequest,
    UpdateApiKeyRequest,
    ApiKeyType,
} from "./types.ts";

export class ApiKey extends Base {
    search(queryParams?: ApiKeyQueryParams): Promise<ApiKeysResponse> {
        const queryString = queryParams
            ? `?${new URLSearchParams(
                  queryParams as Record<string, string>,
              ).toString()}`
            : "";
        return this.request(`api-keys${queryString}`, { method: "GET" });
    }

    create(payload: CreateApiKeyRequest): Promise<ApiKeyType> {
        return this.request(`api-key`, {
            data: payload,
            method: "POST",
        });
    }

    delete(apiKeyId: string): Promise<ApiKeysResponse> {
        return this.request(`api-key/${apiKeyId}`, {
            method: "DELETE",
        });
    }

    update(
        apiKeyId: string,
        payload: UpdateApiKeyRequest,
    ): Promise<ApiKeyType> {
        return this.request(`api-key/${apiKeyId}`, {
            data: payload,
            method: "PATCH",
        });
    }
}
