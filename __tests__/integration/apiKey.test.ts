import { ApiKey } from "src/resources/apiKey";
import {
    ApiKeysResponse,
    ApiKeyResponse,
    CreateApiKeyRequest,
    UpdateApiKeyRequest,
} from "src/resources/apiKey/types";
import { EmptyResponse } from "src/resources/common-types";

describe("ApiKey", () => {
    let apiKeyInstance: ApiKey;
    const createdApiKeyIds: string[] = [];
    let testKeyNames: { testKey: string; newTestKey: string };

    const apiKey = "9abee520-2140-4bb6-8b3c-316810920e5b";
    const entityId = "098435ec-aaed-46a4-bc81-5ad1ecebfaaa";

    beforeAll(async () => {
        apiKeyInstance = new ApiKey({
            apiKey,
            entityId,
        });

        // Create API keys for testing with random numbers to avoid conflicts
        const randomSuffix = Math.floor(Math.random() * 10000);
        testKeyNames = {
            testKey: `SDK test key ${randomSuffix}`,
            newTestKey: `New Test API Key ${randomSuffix}`,
        };

        const testApiKeys = [
            {
                name: testKeyNames.testKey,
                permissions: ["CreateEntities", "GetEntities", "CreateApiKeys", "GetApiKeys"] as const,
            },
            {
                name: testKeyNames.newTestKey,
                permissions: ["CreateEntities", "GetEntities", "CreateApiKeys", "GetApiKeys", "CreateMerchants"] as const,
            },
        ];

        for (const testKey of testApiKeys) {
            try {
                const response = await apiKeyInstance.create({
                    name: testKey.name,
                    grantPermissions: [...testKey.permissions],
                });
                createdApiKeyIds.push(response.id);
            } catch {
                console.log(`API key ${testKey.name} might already exist, continuing...`);
            }
        }
    });

    afterAll(async () => {
        // Clean up created API keys
        for (const apiKeyId of createdApiKeyIds) {
            try {
                await apiKeyInstance.delete(apiKeyId);
            } catch (error) {
                console.log(`Failed to delete API key ${apiKeyId}:`, error);
            }
        }
    });

    test("should create a new API key", async () => {
        const createPayload: CreateApiKeyRequest = {
            name: testKeyNames.newTestKey,
            grantPermissions: [
                "CreateEntities",
                "GetEntities",
                "CreateApiKeys",
                "GetApiKeys",
                "CreateMerchants",
            ],
        };

        const expectedResponse: ApiKeyResponse = {
            dateCreated: expect.any(Number),
            name: testKeyNames.newTestKey,
            id: expect.any(String),
            permissions: [
                "CreateEntities",
                "GetEntities",
                "CreateApiKeys",
                "GetApiKeys",
                "CreateMerchants",
            ],
            apiKey: expect.any(String),
        };

        const response = await apiKeyInstance.create(createPayload);

        expect(response).toEqual(expectedResponse);
    });

    test("should fetch API keys with query params", async () => {
        const expectedResponse: ApiKeysResponse = {
            totalResults: expect.any(Number),
            apiKeys: expect.arrayContaining([
                expect.objectContaining({
                    dateCreated: expect.any(Number),
                    name: testKeyNames.newTestKey,
                    id: expect.any(String),
                    permissions: expect.arrayContaining([
                        "CreateEntities",
                        "GetEntities",
                        "CreateApiKeys",
                        "GetApiKeys",
                        "CreateMerchants",
                    ]),
                }),
            ]),
        };

        const response = await apiKeyInstance.search({ apiKeyName: testKeyNames.newTestKey });

        expect(response).toEqual(expectedResponse);
    });

    test("should create an API key with name test key", async () => {
        const createPayload: CreateApiKeyRequest = {
            name: testKeyNames.testKey,
            grantPermissions: [
                "CreateEntities",
                "GetEntities",
                "CreateApiKeys",
                "GetApiKeys",
            ],
        };

        const expectedResponse: ApiKeyResponse = {
            dateCreated: expect.any(Number),
            name: testKeyNames.testKey,
            id: expect.any(String),
            permissions: [
                "CreateEntities",
                "GetEntities",
                "CreateApiKeys",
                "GetApiKeys",
            ],
            apiKey: expect.any(String),
        };

        const response = await apiKeyInstance.create(createPayload);

        expect(response).toEqual(expectedResponse);
    });

    test("should update the api key with a new permission", async () => {
        // First, let's get the API key ID by searching for it
        const searchResponse = await apiKeyInstance.search({ apiKeyName: testKeyNames.testKey });

        // Assuming the API key exists and we get at least one result
        expect(searchResponse.totalResults).toBeGreaterThan(0);
        expect(searchResponse.apiKeys.length).toBeGreaterThan(0);

        const apiKeyId = searchResponse.apiKeys[0].id;

        // Update the API key with a new permission
        const updatePayload: UpdateApiKeyRequest = {
            grantPermissions: ["CreateMerchants"],
        };

        const expectedResponse: ApiKeyResponse = {
            dateCreated: expect.any(Number),
            name: testKeyNames.testKey,
            id: apiKeyId,
            permissions: expect.arrayContaining([
                "CreateEntities",
                "GetEntities",
                "CreateApiKeys",
                "GetApiKeys",
                "CreateMerchants",
            ]),
        };

        const response = await apiKeyInstance.update(apiKeyId, updatePayload);

        expect(response).toEqual(expectedResponse);
    });

    test("should delete the api key with the name test key", async () => {
        // First, let's get the API key ID by searching for it
        const searchResponse = await apiKeyInstance.search({ apiKeyName: testKeyNames.testKey });

        // Assuming the API key exists and we get at least one result
        expect(searchResponse.totalResults).toBeGreaterThan(0);
        expect(searchResponse.apiKeys.length).toBeGreaterThan(0);

        const apiKeyId = searchResponse.apiKeys[0].id;

        // Delete the API key
        const deleteResponse = await apiKeyInstance.delete(apiKeyId);

        // The delete method returns ApiKeysResponse, so we expect the updated list
        expect(deleteResponse).toEqual({} as EmptyResponse);
    });

});
