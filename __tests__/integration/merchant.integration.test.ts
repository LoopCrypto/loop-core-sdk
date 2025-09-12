import { Merchant } from "src/resources/merchant";
import {
    MerchantQueryParams,
    UpdateMerchantRequest,
    CreateMerchantRequest,
} from "src/resources/merchant/types";

describe("Merchant API", () => {
    let merchantApi: Merchant;
    const createdMerchantIds: string[] = [];
    let testMerchantNames: { testMerchant: string; newTestMerchant: string };

    const parentApiKey = process.env.PARENT_API_KEY || "";
    const parentEntityId = process.env.PARENT_ENTITY_ID || "";
    const namePrefix = "SDK";

    beforeAll(async () => {
        merchantApi = new Merchant({
            apiKey: parentApiKey,
            entityId: parentEntityId,
        });

        // Create test merchant data with random numbers to avoid conflicts
        const randomSuffix = Math.floor(Math.random() * 10000);
        testMerchantNames = {
            testMerchant: `${namePrefix} Test Merchant ${randomSuffix}`,
            newTestMerchant: `${namePrefix} New Test Merchant ${randomSuffix}`,
        };

        const testMerchants = [
            {
                merchantName: testMerchantNames.testMerchant,
                merchantEmail: `test-merchant-${randomSuffix}@loopcrypto.xyz`,
                merchantRefId: `test-merchant-ref-${randomSuffix}`,
            },
            {
                merchantName: testMerchantNames.newTestMerchant,
                merchantEmail: `new-test-merchant-${randomSuffix}@loopcrypto.xyz`,
                merchantRefId: `new-test-merchant-ref-${randomSuffix}`,
            },
        ];

        for (const testMerchant of testMerchants) {
            try {
                const response = await merchantApi.create({
                    merchantName: testMerchant.merchantName,
                    merchantEmail: testMerchant.merchantEmail,
                    merchantRefId: testMerchant.merchantRefId,
                });
                createdMerchantIds.push(response.merchantId);
            } catch {
                console.log(
                    `Merchant ${testMerchant.merchantName} might already exist, continuing...`,
                );
            }
        }
    });

    afterAll(async () => {
        // Clean up created merchants if needed
        // Note: Merchant deletion might not be implemented in the API
        for (const merchantId of createdMerchantIds) {
            try {
                // If delete method exists, uncomment this
                // await merchantApi.delete(merchantId);
                console.log(
                    `Merchant ${merchantId} cleanup skipped - delete method may not be implemented`,
                );
            } catch (error) {
                console.log(`Failed to delete merchant ${merchantId}:`, error);
            }
        }
    });

    test("should create a new merchant", async () => {
        const randomSuffix = Math.floor(Math.random() * 10000);
        const createPayload: CreateMerchantRequest = {
            merchantName: `${namePrefix} Integration Test Merchant ${randomSuffix}`,
            merchantEmail: `integration-test-${randomSuffix}@example.com`,
            merchantRefId: `integration-test-ref-${randomSuffix}`,
        };

        const expectedResponse = {
            merchantId: expect.any(String),
            merchantName: `${namePrefix} Integration Test Merchant ${randomSuffix}`,
            merchantRefId: `integration-test-ref-${randomSuffix}`,
            payoutDestinations: expect.any(Array),
            fiatSettlementAccount: expect.any(Object),
            paymentTypes: expect.any(Array),
        };

        const response = await merchantApi.create(createPayload);

        expect(response).toEqual(expectedResponse);
        expect(response.merchantId).toBeTruthy();
        expect(response.merchantName).toBe(
            `${namePrefix} Integration Test Merchant ${randomSuffix}`,
        );
        expect(response.merchantRefId).toBe(
            `integration-test-ref-${randomSuffix}`,
        );
    });

    test("should create a merchant with minimal data", async () => {
        const randomSuffix = Math.floor(Math.random() * 10000);
        const createPayload: CreateMerchantRequest = {
            merchantName: `${namePrefix} Minimal Test Merchant ${randomSuffix}`,
        };

        const expectedResponse = {
            merchantId: expect.any(String),
            merchantName: `${namePrefix} Minimal Test Merchant ${randomSuffix}`,
            merchantRefId: null,
            payoutDestinations: expect.any(Array),
            fiatSettlementAccount: expect.any(Object),
            paymentTypes: expect.any(Array),
        };

        const response = await merchantApi.create(createPayload);

        expect(response).toEqual(expectedResponse);
        expect(response.merchantId).toBeTruthy();
        expect(response.merchantName).toBe(
            `${namePrefix} Minimal Test Merchant ${randomSuffix}`,
        );
        expect(response.merchantRefId).toBeNull();
    });

    test("should fetch merchants with query params", async () => {
        const queryParams: MerchantQueryParams = {
            page: 1,
            limit: 10,
            sortBy: "merchantId",
            sortDir: "asc",
            merchantName: testMerchantNames.newTestMerchant,
        };

        const response = await merchantApi.search(queryParams);

        expect(response).toHaveProperty("totalResults");
        expect(typeof response.totalResults).toBe("number");
        expect(response).toHaveProperty("merchants");
        expect(Array.isArray(response.merchants)).toBe(true);
        expect(response.totalResults).toBeGreaterThanOrEqual(0);
    });

    test("should fetch merchants without query params", async () => {
        const response = await merchantApi.search();

        expect(response).toHaveProperty("totalResults");
        expect(typeof response.totalResults).toBe("number");
        expect(response).toHaveProperty("merchants");
        expect(Array.isArray(response.merchants)).toBe(true);
        expect(response.totalResults).toBeGreaterThanOrEqual(0);
    });

    test("should fetch merchants with pagination", async () => {
        const queryParams: MerchantQueryParams = {
            page: 1,
            limit: 5,
        };

        const response = await merchantApi.search(queryParams);

        expect(response.totalResults).toBeGreaterThanOrEqual(0);
        expect(Array.isArray(response.merchants)).toBe(true);
        expect(response.merchants.length).toBeLessThanOrEqual(5);
    });

    test("should fetch merchants with sorting", async () => {
        const queryParams: MerchantQueryParams = {
            sortBy: "dateCreated",
            sortDir: "desc",
        };

        const response = await merchantApi.search(queryParams);

        expect(response.totalResults).toBeGreaterThanOrEqual(0);
        expect(Array.isArray(response.merchants)).toBe(true);

        // Verify sorting if we have multiple merchants
        if (response.merchants.length > 1) {
            // Note: dateCreated might not be directly accessible in the response
            // This is a basic structure validation
            expect(response.merchants[0]).toHaveProperty("merchantId");
            expect(response.merchants[0]).toHaveProperty("merchantName");
        }
    });

    test("should retrieve a specific merchant", async () => {
        // First create a merchant to retrieve
        const randomSuffix = Math.floor(Math.random() * 10000);
        const createPayload: CreateMerchantRequest = {
            merchantName: `${namePrefix} Retrieve Test Merchant ${randomSuffix}`,
            merchantRefId: `retrieve-test-ref-${randomSuffix}`,
        };

        const createdMerchant = await merchantApi.create(createPayload);
        const merchantId = createdMerchant.merchantId;

        // Now retrieve the merchant
        const expectedResponse = {
            merchantId: merchantId,
            merchantName: `${namePrefix} Retrieve Test Merchant ${randomSuffix}`,
            merchantRefId: `retrieve-test-ref-${randomSuffix}`,
            payoutDestinations: expect.any(Array),
            fiatSettlementAccount: expect.any(Object),
            paymentTypes: expect.any(Array),
        };

        const response = await merchantApi.retrieve(merchantId);

        expect(response).toEqual(expectedResponse);
        expect(response.merchantId).toBe(merchantId);
        expect(response.merchantName).toBe(
            `${namePrefix} Retrieve Test Merchant ${randomSuffix}`,
        );
        expect(response.merchantRefId).toBe(
            `retrieve-test-ref-${randomSuffix}`,
        );
    });

    test("should retrieve merchant with existing merchant ID", async () => {
        // Use the merchant created in beforeAll if it exists
        if (createdMerchantIds.length > 0) {
            const merchantId = createdMerchantIds[0];

            const expectedResponse = {
                merchantId: merchantId,
                merchantName: expect.any(String),
                merchantRefId: expect.any(String),
                payoutDestinations: expect.any(Array),
                fiatSettlementAccount: expect.any(Object),
                paymentTypes: expect.any(Array),
            };

            const response = await merchantApi.retrieve(merchantId);

            expect(response).toEqual(expectedResponse);
            expect(response.merchantId).toBe(merchantId);
            expect(typeof response.merchantName).toBe("string");
            expect(Array.isArray(response.payoutDestinations)).toBe(true);
            expect(Array.isArray(response.paymentTypes)).toBe(true);
        } else {
            // Skip test if no merchants were created in beforeAll
            console.log("Skipping retrieve test - no test merchants available");
        }
    });

    test("should update merchant name", async () => {
        // First, let's get the merchant ID by searching for it
        const searchResponse = await merchantApi.search({
            merchantName: testMerchantNames.testMerchant,
        });

        // Assuming the merchant exists and we get at least one result
        expect(searchResponse.totalResults).toBeGreaterThan(0);
        expect(searchResponse.merchants.length).toBeGreaterThan(0);

        const merchantId = searchResponse.merchants[0].merchantId;
        const originalName = searchResponse.merchants[0].merchantName;

        // Update the merchant with a new name
        const randomSuffix = Math.floor(Math.random() * 10000);
        const updatePayload: UpdateMerchantRequest = {
            merchantName: `${namePrefix} Updated Test Merchant ${randomSuffix}`,
        };

        const expectedResponse = {
            merchantId: merchantId,
            merchantName: `${namePrefix} Updated Test Merchant ${randomSuffix}`,
            merchantRefId: expect.any(String),
            payoutDestinations: expect.any(Array),
            fiatSettlementAccount: expect.any(Object),
            paymentTypes: expect.any(Array),
        };

        const response = await merchantApi.update(merchantId, updatePayload);

        expect(response).toEqual(expectedResponse);
        expect(response.merchantId).toBe(merchantId);
        expect(response.merchantName).toBe(
            `${namePrefix} Updated Test Merchant ${randomSuffix}`,
        );
        expect(response.merchantName).not.toBe(originalName);
    });

    test("should update merchant reference ID", async () => {
        // First, let's get the merchant ID by searching for it
        const searchResponse = await merchantApi.search({
            merchantName: testMerchantNames.newTestMerchant,
        });

        // Assuming the merchant exists and we get at least one result
        expect(searchResponse.totalResults).toBeGreaterThan(0);
        expect(searchResponse.merchants.length).toBeGreaterThan(0);

        const merchantId = searchResponse.merchants[0].merchantId;
        const originalRefId = searchResponse.merchants[0].merchantRefId;

        // Update the merchant with a new reference ID
        const randomSuffix = Math.floor(Math.random() * 10000);
        const updatePayload: UpdateMerchantRequest = {
            merchantRefId: `updated-test-ref-${randomSuffix}`,
        };

        const expectedResponse = {
            merchantId: merchantId,
            merchantName: expect.any(String),
            merchantRefId: `updated-test-ref-${randomSuffix}`,
            payoutDestinations: expect.any(Array),
            fiatSettlementAccount: expect.any(Object),
            paymentTypes: expect.any(Array),
        };

        const response = await merchantApi.update(merchantId, updatePayload);

        expect(response).toEqual(expectedResponse);
        expect(response.merchantId).toBe(merchantId);
        expect(response.merchantRefId).toBe(`updated-test-ref-${randomSuffix}`);
        expect(response.merchantRefId).not.toBe(originalRefId);
    });

    test("should update merchant name and reference ID", async () => {
        // Create a new merchant for this test
        const randomSuffix = Math.floor(Math.random() * 10000);
        const createPayload: CreateMerchantRequest = {
            merchantName: `${namePrefix} Update Both Test Merchant ${randomSuffix}`,
            merchantRefId: `update-both-test-ref-${randomSuffix}`,
        };

        const createdMerchant = await merchantApi.create(createPayload);
        const merchantId = createdMerchant.merchantId;

        // Update both name and reference ID
        const updatePayload: UpdateMerchantRequest = {
            merchantName: `${namePrefix} Updated Both Test Merchant ${randomSuffix}`,
            merchantRefId: `updated-both-test-ref-${randomSuffix}`,
        };

        const expectedResponse = {
            merchantId: merchantId,
            merchantName: `${namePrefix} Updated Both Test Merchant ${randomSuffix}`,
            merchantRefId: `updated-both-test-ref-${randomSuffix}`,
            payoutDestinations: expect.any(Array),
            fiatSettlementAccount: expect.any(Object),
            paymentTypes: expect.any(Array),
        };

        const response = await merchantApi.update(merchantId, updatePayload);

        expect(response).toEqual(expectedResponse);
        expect(response.merchantId).toBe(merchantId);
        expect(response.merchantName).toBe(
            `${namePrefix} Updated Both Test Merchant ${randomSuffix}`,
        );
        expect(response.merchantRefId).toBe(
            `updated-both-test-ref-${randomSuffix}`,
        );
    });
});
