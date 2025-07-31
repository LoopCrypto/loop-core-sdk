import { ApiKey } from "src/resources/apikey";
import {
    ApiKeyQueryParams,
    ApiKeysResponse,
} from "src/resources/apikey/types";

describe("ApiKey", () => {
    let apiKeyInstance: ApiKey;

    const apiKey = "9abee520-2140-4bb6-8b3c-316810920e5b";
    const entityId = "098435ec-aaed-46a4-bc81-5ad1ecebfaaa";

    beforeAll(() => {
        apiKeyInstance = new ApiKey({
            apiKey,
            entityId,
        });
    });

    test("should fetch API keys with query params", async () => {
        const expectedResponse: ApiKeysResponse = {
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

        const queryParams: ApiKeyQueryParams = {
            apiKeyId: "apikey-123456",
            apiKeyName: "Admin Key",
            page: 1,
            limit: 10,
            sortBy: "dateCreated",
            sortDir: "desc",
        };
        const response = await apiKeyInstance.search(queryParams);

        expect(expectedResponse).toHaveBeenCalledWith(
            `api-keys?apiKeyId=${apiKey}&apiKeyName=Admin+Key&page=1&limit=10&sortBy=dateCreated&sortDir=desc`,
            {
                method: "GET",
            },
        );
        expect(response).toEqual(expectedResponse);
    });
});
