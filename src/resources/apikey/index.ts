import { Base } from "src/resources/base";
import {
    ApiKeyQueryParams,
    ApiKeysResponse,
    CreateApiKeyRequest,
    UpdateApiKeyRequest,
    ApiKeyResponse,
} from "src/resources/apiKey/types";
import { EmptyResponse } from "src/resources/common-types";

export class ApiKey extends Base {
    search(queryParams?: ApiKeyQueryParams): Promise<ApiKeysResponse> {
        const queryString = queryParams
            ? `?${new URLSearchParams(
                queryParams as Record<string, string>,
            ).toString()}`
            : "";
        return this.request(`/v2/api-keys${queryString}`, { method: "GET" });
    }

    create(payload: CreateApiKeyRequest): Promise<ApiKeyResponse> {
        return this.request(`/v2/api-key`, {
            data: payload,
            method: "POST",
        });
    }

    delete(apiKeyId: string): Promise<EmptyResponse> {
        return this.request(`/v2/api-key/${apiKeyId}`, {
            method: "DELETE",
        });
    }

    update(
        apiKeyId: string,
        payload: UpdateApiKeyRequest,
    ): Promise<ApiKeyResponse> {
        return this.request(`/v2/api-key/${apiKeyId}`, {
            data: payload,
            method: "PATCH",
        });
    }
}
