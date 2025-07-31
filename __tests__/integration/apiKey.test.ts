import { ApiKey } from "src/resources/apiKey";
import {
    ApiKeyQueryParams,
    ApiKeysResponse,
} from "src/resources/apiKey/types";

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
            totalResults: 1,
            apiKeys: [
                {
                    dateCreated: 1740175459,
                    name: "Default Admin Key",
                    id: "39262617-efe5-432b-a8ba-83e6e4d2781d",
                    permissions: [
                        "CreateTransfer",
                        "GetEntityTransfers",
                        "GetAllTransfers",
                        "GetValidTransfers",
                        "CreateItems",
                        "UpdateItems",
                        "GetItems",
                        "CreateNewAgreements",
                        "GetAgreements",
                        "CancelAgreements",
                        "CancelTransfers",
                        "CreateFeeConfigurations",
                        "UpdateFeeConfigurations",
                        "GetFeeConfigurations",
                        "CreateChildEntities",
                        "GetEntities",
                        "CreateEntities",
                        "UpdateEntities",
                        "CreateApiKeys",
                        "UpdateApiKey",
                        "GetApiKeys",
                        "DeactivateApiKey",
                        "CreateMerchants",
                        "UpdateMerchants",
                        "GetMerchants",
                        "CreatePaymentTypes",
                        "GetPaymentTypes",
                        "DeletePaymentTypes",
                        "CreatePayoutDestinations",
                        "GetPayoutDestinations",
                        "DeletePayoutDestinations",
                        "CreatePaymentMethods",
                        "GetPaymentMethods",
                        "DeletePaymentMethods",
                        "CreatePayins",
                        "GetPayins",
                        "CreateCustomers",
                        "GetCustomers",
                        "CreateWebhooks",
                        "GetWebhooks",
                        "DeleteWebhooks",
                        "UpdateWebhooks",
                        "CreateWebhookSecret",
                        "GetWebhookSecret",
                        "GetTokens",
                        "CreateCheckoutSessions",
                        "GetCheckoutSessions",
                        "DeleteCheckoutSessions",
                        "UpdateCheckoutSessions",
                    ],
                },
            ],
        };


        const response = await apiKeyInstance.search();


        expect(response).toEqual(expectedResponse);
    });
});
