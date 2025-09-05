import { PaymentType } from "src/resources/paymentType";
import {
    CreatePaymentTypeRequest,
    PaymentTypeResponse,
    DefaultPaymentTypeRequest,
} from "src/resources/paymentType/types";

describe("PaymentType", () => {
    let paymentTypeInstance: PaymentType;
    const createdPaymentTypes: { merchantId: string; tokenId: string }[] = [];
    let testMerchantId: string;

    const parentApiKey = process.env.PARENT_API_KEY || "";
    const parentEntityId = process.env.PARENT_ENTITY_ID || "";
    const merchantEntityId = process.env.MERCHANT_ENTITY_ID || "";

    beforeAll(async () => {
        paymentTypeInstance = new PaymentType({
            apiKey: parentApiKey,
            entityId: parentEntityId,
        });

        // Use merchant entity ID for testing
        testMerchantId = merchantEntityId;

        // Create test payment types for integration testing
        // Note: In staging environment, only USDC and WETH on Sepolia (11155111) are available
        const testPaymentTypes = [
            {
                merchantId: testMerchantId,
                networkId: 11155111 as const, // Sepolia
                tokenSymbol: "USDC",
                isDefault: true,
            },
        ];

        for (const testPaymentType of testPaymentTypes) {
            try {
                const response =
                    await paymentTypeInstance.create(testPaymentType);
                createdPaymentTypes.push({
                    merchantId: response.merchantId,
                    tokenId: response.tokenId,
                });
            } catch (error) {
                console.log(
                    `Payment type might already exist, continuing...`,
                    error,
                );
            }
        }
    });

    afterAll(async () => {
        // Clean up created payment types
        for (const paymentType of createdPaymentTypes) {
            try {
                await paymentTypeInstance.delete(
                    paymentType.merchantId,
                    paymentType.tokenId,
                );
            } catch (error) {
                console.log(
                    `Failed to delete payment type ${paymentType.merchantId}/${paymentType.tokenId}:`,
                    error,
                );
            }
        }
    });

    test("should fetch payment types with query params", async () => {
        const response = await paymentTypeInstance.search({
            merchantId: testMerchantId,
        });

        expect(response).toHaveProperty("totalResults");
        expect(response).toHaveProperty("paymentTypes");
        expect(Array.isArray(response.paymentTypes));

        // If there are payment types, verify their structure
        if (response.paymentTypes.length > 0) {
            const paymentType = response.paymentTypes[0];
            expect(paymentType).toHaveProperty("merchantId");
            expect(paymentType).toHaveProperty("tokenId");
            expect(paymentType).toHaveProperty("networkId");
            expect(paymentType).toHaveProperty("symbol");
            expect(paymentType).toHaveProperty("address");
            expect(paymentType).toHaveProperty("decimals");
            expect(paymentType).toHaveProperty("dateCreated");
        }
    });

    test("should create a new payment type with token symbol", async () => {
        const createPayload: CreatePaymentTypeRequest = {
            merchantId: testMerchantId,
            networkId: 11155111 as const, // Sepolia
            tokenSymbol: "WETH",
            isDefault: false,
        };

        const expectedResponse: PaymentTypeResponse = {
            merchantId: testMerchantId,
            tokenId: expect.any(String),
            networkId: 11155111,
            symbol: "WETH",
            address: expect.any(String),
            decimals: expect.any(Number),
            dateCreated: expect.any(Number),
            isDefault: expect.any(Boolean),
        };

        const response = await paymentTypeInstance.create(createPayload);

        expect(response).toEqual(expectedResponse);

        // Store for cleanup
        createdPaymentTypes.push({
            merchantId: response.merchantId,
            tokenId: response.tokenId,
        });
    });

    test("should create a new payment type with token address", async () => {
        const createPayload: CreatePaymentTypeRequest = {
            merchantId: testMerchantId,
            networkId: 11155111 as const, // Sepolia
            tokenAddress: "0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9", // WETH on Sepolia
            isDefault: false,
        };

        const expectedResponse: PaymentTypeResponse = {
            merchantId: testMerchantId,
            tokenId: expect.any(String),
            networkId: 11155111,
            symbol: expect.any(String),
            address: "0x7b79995e5f793a07bc00c21412e50ecae098e7f9",
            decimals: expect.any(Number),
            dateCreated: expect.any(Number),
            isDefault: expect.any(Boolean),
        };

        const response = await paymentTypeInstance.create(createPayload);

        expect(response).toEqual(expectedResponse);

        // Store for cleanup
        createdPaymentTypes.push({
            merchantId: response.merchantId,
            tokenId: response.tokenId,
        });
    });

    test("should fetch payment types filtered by network", async () => {
        const response = await paymentTypeInstance.search({
            merchantId: testMerchantId,
            networkId: 11155111,
        });

        expect(response).toHaveProperty("totalResults");
        expect(response).toHaveProperty("paymentTypes");
        expect(Array.isArray(response.paymentTypes));

        // If there are payment types, verify they're from the correct network
        if (response.paymentTypes.length > 0) {
            response.paymentTypes.forEach((paymentType) => {
                expect(paymentType.networkId).toBe(11155111);
            });
        }
    });

    test("should fetch payment types filtered by token symbol", async () => {
        const response = await paymentTypeInstance.search({
            merchantId: testMerchantId,
            tokenSymbol: "USDC",
        });

        expect(response).toHaveProperty("totalResults");
        expect(response).toHaveProperty("paymentTypes");
        expect(Array.isArray(response.paymentTypes));

        // If there are payment types, verify they have the correct symbol
        if (response.paymentTypes.length > 0) {
            response.paymentTypes.forEach((paymentType) => {
                expect(paymentType.symbol).toBe("USDC");
            });
        }
    });

    test("should set default payment types", async () => {
        // First, let's get some payment types to work with
        const searchResponse = await paymentTypeInstance.search({
            merchantId: testMerchantId,
        });

        // Skip this test if no payment types exist
        if (
            searchResponse.totalResults === 0 ||
            searchResponse.paymentTypes.length === 0
        ) {
            console.log(
                "Skipping set defaults test - no payment types available",
            );
            return;
        }

        const tokenId = searchResponse.paymentTypes[0].tokenId;

        const defaultRequest: DefaultPaymentTypeRequest = {
            merchantId: testMerchantId,
            addDefaultTokens: [tokenId],
        };

        const expectedResponse: PaymentTypeResponse = {
            merchantId: testMerchantId,
            tokenId: expect.any(String),
            networkId: expect.any(Number),
            symbol: expect.any(String),
            address: expect.any(String),
            decimals: expect.any(Number),
            dateCreated: expect.any(Number),
            isDefault: expect.any(Boolean),
        };

        const response = await paymentTypeInstance.setDefaults(defaultRequest);

        expect(response).toEqual(expectedResponse);
    });

    test("should delete a payment type", async () => {
        // First, let's get a payment type to delete
        const searchResponse = await paymentTypeInstance.search({
            merchantId: testMerchantId,
        });

        // Skip this test if no payment types exist
        if (
            searchResponse.totalResults === 0 ||
            searchResponse.paymentTypes.length === 0
        ) {
            console.log("Skipping delete test - no payment types available");
            return;
        }

        const paymentTypeToDelete = searchResponse.paymentTypes[0];

        const deleteResponse = await paymentTypeInstance.delete(
            paymentTypeToDelete.merchantId,
            paymentTypeToDelete.tokenId,
        );

        // Delete response is an empty object
        expect(deleteResponse).toEqual({});
    });
});
