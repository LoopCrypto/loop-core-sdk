import { ApiKey } from "src/resources/apiKey";
import {
    ApiKeyQueryParams,
    ApiKeyResponse,
    ApiKeysResponse,
    CreateApiKeyRequest,
    UpdateApiKeyRequest,
} from "src/resources/apiKey/types";

describe("ApiKey", () => {
    let apiKeyInstance: ApiKey;
    let mockRequest: jest.Mock;

    beforeEach(() => {
        apiKeyInstance = new ApiKey({ apiKey: "apiKey", entityId: "entityId" });
        mockRequest = jest.fn() as jest.Mock; // Explicitly typed as jest.Mock
        (apiKeyInstance as unknown as { request: jest.Mock }).request =
            mockRequest;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test("should fetch API keys with query params", async () => {
        const mockResponse: ApiKeysResponse = {
            totalResults: 2,
            apiKeys: [
                {
                    dateCreated: 1708454400,
                    name: "Admin Key",
                    id: "apikey-123456",
                    permissions: ["read", "write", "delete"],
                },
                {
                    dateCreated: 1708458500,
                    name: "Read-Only Key",
                    id: "apikey-654321",
                    permissions: ["read"],
                },
            ],
        };

        mockRequest.mockResolvedValue(mockResponse);
        const queryParams: ApiKeyQueryParams = {
            apiKeyId: "apikey-123456",
            apiKeyName: "Admin Key",
            page: 1,
            limit: 10,
            sortBy: "dateCreated",
            sortDir: "desc",
        };
        const response = await apiKeyInstance.search(queryParams);

        expect(mockRequest).toHaveBeenCalledWith(
            "/v2/api-keys?apiKeyId=apikey-123456&apiKeyName=Admin+Key&page=1&limit=10&sortBy=dateCreated&sortDir=desc",
            {
                method: "GET",
            },
        );
        expect(response).toEqual(mockResponse);
    });

    test("should create an API key", async () => {
        const payload: CreateApiKeyRequest = {
            name: "Admin API Key",
            grantPermissions: [
                "CreateEntities",
                "UpdateEntities",
                "CreateApiKeys",
                "GetApiKeys",
                "CreateCustomers",
                "GetCustomers",
                "CreateWebhooks",
                "GetWebhooks",
            ],
        };
        const mockResponse: ApiKeyResponse = {
            dateCreated: 1708454400,
            name: "Admin Key",
            id: "apikey-123456",
            permissions: ["read", "write", "delete"],
            apiKey: "sk_test_abcdef123456",
        };

        mockRequest.mockResolvedValue(mockResponse);

        const response = await apiKeyInstance.create(payload);

        expect(mockRequest).toHaveBeenCalledWith("/v2/api-key", {
            data: payload,
            method: "POST",
        });
        expect(response).toEqual(mockResponse);
    });

    test("should delete an API key", async () => {
        const mockResponse = {};
        mockRequest.mockResolvedValue(mockResponse);

        const apiKeyId = "123";
        const response = await apiKeyInstance.delete(apiKeyId);

        expect(mockRequest).toHaveBeenCalledWith(`/v2/api-key/${apiKeyId}`, {
            method: "DELETE",
        });
        expect(response).toEqual(mockResponse);
    });

    test("should update an API key", async () => {
        const apiKeyId = "123";
        const payload: UpdateApiKeyRequest = { name: "Updated Key" };
        const mockResponse: ApiKeyResponse = {
            dateCreated: 1708454400,
            name: "Admin Key",
            id: "apikey-123456",
            permissions: ["read", "write", "delete"],
        };

        mockRequest.mockResolvedValue(mockResponse);

        const response = await apiKeyInstance.update(apiKeyId, payload);

        expect(mockRequest).toHaveBeenCalledWith(`/v2/api-key/${apiKeyId}`, {
            data: payload,
            method: "PATCH",
        });
        expect(response).toEqual(mockResponse);
    });
});
