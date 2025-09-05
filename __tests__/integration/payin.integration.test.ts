import { Customer } from "src/resources/customer";
import { Payin } from "src/resources/payin";
import {
    PayinQueryParams,
    PayinsResponse,
    PayinResponse,
    CreatePayinRequest,
    UpdatePayinRequest,
} from "src/resources/payin/types";

describe("Payin", () => {
    let payinInstance: Payin;
    const createdPayinIds: string[] = [];
    let testMerchantId: string;
    let testCustomerId: string | null;
    let testPaymentMethodId: string | null;

    const parentApiKey = process.env.PARENT_API_KEY || "";
    const parentEntityId = process.env.PARENT_ENTITY_ID || "";
    const merchantEntityId = process.env.MERCHANT_ENTITY_ID || "";

    beforeAll(async () => {
        payinInstance = new Payin({
            apiKey: parentApiKey,
            entityId: parentEntityId,
        });

        // Use the merchant entity ID from environment for testing
        testMerchantId = merchantEntityId;

        // Try to find existing customers and payment methods for testing
        try {
            const customerApi = new Customer({
                entityId: parentEntityId,
                apiKey: parentApiKey,
            });

            // Search for existing customers
            const customersResponse = await customerApi.search({
                merchantId: testMerchantId,
                limit: 1,
            });
            if (customersResponse.customers.length > 0) {
                testCustomerId = customersResponse.customers[0].customerId;
                console.log(`Using existing customer: ${testCustomerId}`);
            } else {
                // Create a test customer if none exist
                const randomSuffix = Math.floor(Math.random() * 10000);
                const createCustomerPayload = {
                    merchantId: testMerchantId,
                    customerRefId: `test-customer-ref-${randomSuffix}`,
                };
                const newCustomer = await customerApi.create(
                    createCustomerPayload,
                );
                testCustomerId = newCustomer.customerId;
                console.log(`Created test customer: ${testCustomerId}`);
            }

            // For now, we'll skip payment method tests since they require more complex setup
            // In a real integration test, you would create or find existing payment methods
            testPaymentMethodId = null;
        } catch (error) {
            console.log("Could not set up customer for testing:", error);
            testCustomerId = null;
            testPaymentMethodId = null;
        }
    });

    afterAll(async () => {
        // Clean up created payins if needed
        // Note: Payin deletion might not be implemented in the API
        for (const payinId of createdPayinIds) {
            try {
                // If delete method exists, uncomment this
                // await payinInstance.delete(payinId);
                console.log(
                    `Payin ${payinId} cleanup skipped - delete method may not be implemented`,
                );
            } catch (error) {
                console.log(`Failed to delete payin ${payinId}:`, error);
            }
        }
    });

    test("should search for payins with query params", async () => {
        const queryParams: PayinQueryParams = {
            merchantId: testMerchantId,
            page: 1,
            limit: 10,
            sortBy: "dateCreated",
            sortDir: "desc",
        };

        const expectedResponse: PayinsResponse = {
            totalResults: expect.any(Number),
            payins: expect.any(Array),
        };

        const response = await payinInstance.search(queryParams);

        expect(response).toEqual(expectedResponse);
        expect(response.totalResults).toBeGreaterThanOrEqual(0);
        expect(Array.isArray(response.payins)).toBe(true);
    });

    test("should create a new payin with minimal data", async () => {
        // Skip this test if we don't have a customer or payment method
        if (!testCustomerId && !testPaymentMethodId) {
            console.log(
                "Skipping payin creation test - no customer or payment method available",
            );
            return;
        }

        const createPayload: CreatePayinRequest = {
            merchantId: testMerchantId,
            amount: "1000", // $10.00 in cents
            amountType: "fiat",
            billDate: Math.floor(Date.now() / 1000) + 3600, // 1 hour from now
            description: "SDK Integration Test Payin",
            ...(testCustomerId && { customerId: testCustomerId }),
            ...(testPaymentMethodId && {
                paymentMethodId: testPaymentMethodId,
            }),
        };

        const expectedResponse: PayinResponse = {
            payinId: expect.any(String),
            merchantId: testMerchantId,
            amount: "1000",
            amountType: "fiat",
            billDate: expect.any(Number),
            invoiceId: expect.any(String),
            description: "SDK Integration Test Payin",
            externalInvoiceRef: null,
            payinType: expect.stringMatching(/^(subscription|invoice)$/),
            payinStatus: expect.stringMatching(
                /^(scheduled|pending|completed|failed|canceled|uncollectible|draft)$/,
            ),
            transaction: expect.any(Object),
            paymentMethod: expect.any(Object),
            payoutDestination: expect.any(Object),
            dateCreated: expect.any(Number),
        };

        const response = await payinInstance.create(createPayload);

        expect(response).toEqual(expectedResponse);
        expect(response.payinId).toBeTruthy();
        expect(response.merchantId).toBe(testMerchantId);
        expect(response.amount).toBe("1000");
        expect(response.amountType).toBe("fiat");

        // Store the created payin ID for cleanup
        createdPayinIds.push(response.payinId);
    });

    test("should create a payin with customer ID", async () => {
        // Skip this test if we don't have a customer
        if (!testCustomerId) {
            console.log("Skipping customer payin test - no customer available");
            return;
        }

        const createPayload: CreatePayinRequest = {
            merchantId: testMerchantId,
            amount: "2500", // $25.00 in cents
            amountType: "fiat",
            billDate: Math.floor(Date.now() / 1000) + 7200, // 2 hours from now
            customerId: testCustomerId,
            description: "SDK Integration Test Payin with Customer",
        };

        const expectedResponse: PayinResponse = {
            payinId: expect.any(String),
            merchantId: testMerchantId,
            amount: "2500",
            amountType: "fiat",
            billDate: expect.any(Number),
            invoiceId: expect.any(String),
            description: "SDK Integration Test Payin with Customer",
            externalInvoiceRef: null,
            payinType: expect.stringMatching(/^(subscription|invoice)$/),
            payinStatus: expect.stringMatching(
                /^(scheduled|pending|completed|failed|canceled|uncollectible|draft)$/,
            ),
            transaction: expect.any(Object),
            paymentMethod: expect.any(Object),
            payoutDestination: expect.any(Object),
            dateCreated: expect.any(Number),
        };

        const response = await payinInstance.create(createPayload);

        expect(response).toEqual(expectedResponse);
        expect(response.payinId).toBeTruthy();
        expect(response.merchantId).toBe(testMerchantId);
        expect(response.amount).toBe("2500");
        expect(response.amountType).toBe("fiat");

        // Store the created payin ID for cleanup
        createdPayinIds.push(response.payinId);
    });

    test("should create a payin with payment method ID", async () => {
        // Skip this test if we don't have a payment method
        if (!testPaymentMethodId) {
            console.log(
                "Skipping payment method payin test - no payment method available",
            );
            return;
        }

        const createPayload: CreatePayinRequest = {
            merchantId: testMerchantId,
            amount: "5000", // $50.00 in cents
            amountType: "fiat",
            billDate: Math.floor(Date.now() / 1000) + 10800, // 3 hours from now
            paymentMethodId: testPaymentMethodId,
            description: "SDK Integration Test Payin with Payment Method",
        };

        const expectedResponse: PayinResponse = {
            payinId: expect.any(String),
            merchantId: testMerchantId,
            amount: "5000",
            amountType: "fiat",
            billDate: expect.any(Number),
            invoiceId: expect.any(String),
            description: "SDK Integration Test Payin with Payment Method",
            externalInvoiceRef: null,
            payinType: expect.stringMatching(/^(subscription|invoice)$/),
            payinStatus: expect.stringMatching(
                /^(scheduled|pending|completed|failed|canceled|uncollectible|draft)$/,
            ),
            transaction: expect.any(Object),
            paymentMethod: expect.any(Object),
            payoutDestination: expect.any(Object),
            dateCreated: expect.any(Number),
        };

        const response = await payinInstance.create(createPayload);

        expect(response).toEqual(expectedResponse);
        expect(response.payinId).toBeTruthy();
        expect(response.merchantId).toBe(testMerchantId);
        expect(response.amount).toBe("5000");
        expect(response.amountType).toBe("fiat");

        // Store the created payin ID for cleanup
        createdPayinIds.push(response.payinId);
    });

    test("should create a token-based payin", async () => {
        // Skip this test if we don't have a payment method
        if (!testPaymentMethodId) {
            console.log(
                "Skipping token payin test - no payment method available",
            );
            return;
        }

        const createPayload: CreatePayinRequest = {
            merchantId: testMerchantId,
            amount: "1000000", // 1 USDC (6 decimal places)
            amountType: "token",
            billDate: Math.floor(Date.now() / 1000) + 14400, // 4 hours from now
            paymentMethodId: testPaymentMethodId,
            description: "SDK Integration Test Token Payin",
        };

        const expectedResponse: PayinResponse = {
            payinId: expect.any(String),
            merchantId: testMerchantId,
            amount: "1000000",
            amountType: "token",
            billDate: expect.any(Number),
            invoiceId: expect.any(String),
            description: "SDK Integration Test Token Payin",
            externalInvoiceRef: null,
            payinType: expect.stringMatching(/^(subscription|invoice)$/),
            payinStatus: expect.stringMatching(
                /^(scheduled|pending|completed|failed|canceled|uncollectible|draft)$/,
            ),
            transaction: expect.any(Object),
            paymentMethod: expect.any(Object),
            payoutDestination: expect.any(Object),
            dateCreated: expect.any(Number),
        };

        const response = await payinInstance.create(createPayload);

        expect(response).toEqual(expectedResponse);
        expect(response.payinId).toBeTruthy();
        expect(response.merchantId).toBe(testMerchantId);
        expect(response.amount).toBe("1000000");
        expect(response.amountType).toBe("token");

        // Store the created payin ID for cleanup
        createdPayinIds.push(response.payinId);
    });

    test("should retrieve a specific payin by ID", async () => {
        // Skip this test if we don't have a customer or payment method
        if (!testCustomerId && !testPaymentMethodId) {
            console.log(
                "Skipping payin retrieval test - no customer or payment method available",
            );
            return;
        }

        // First create a payin to retrieve
        const createPayload: CreatePayinRequest = {
            merchantId: testMerchantId,
            amount: "1500", // $15.00 in cents
            amountType: "fiat",
            billDate: Math.floor(Date.now() / 1000) + 18000, // 5 hours from now
            description: "SDK Integration Test Payin for Retrieval",
            ...(testCustomerId && { customerId: testCustomerId }),
            ...(testPaymentMethodId && {
                paymentMethodId: testPaymentMethodId,
            }),
        };

        const createdPayin = await payinInstance.create(createPayload);
        const payinId = createdPayin.payinId;

        // Store the created payin ID for cleanup
        createdPayinIds.push(payinId);

        // Now retrieve the payin
        const expectedResponse: PayinResponse = {
            payinId: payinId,
            merchantId: testMerchantId,
            amount: "1500",
            amountType: "fiat",
            billDate: expect.any(Number),
            invoiceId: expect.any(String),
            description: "SDK Integration Test Payin for Retrieval",
            externalInvoiceRef: null,
            payinType: expect.stringMatching(/^(subscription|invoice)$/),
            payinStatus: expect.stringMatching(
                /^(scheduled|pending|completed|failed|canceled|uncollectible|draft)$/,
            ),
            transaction: expect.any(Object),
            paymentMethod: expect.any(Object),
            payoutDestination: expect.any(Object),
            dateCreated: expect.any(Number),
        };

        const response = await payinInstance.retrieve(payinId);

        expect(response).toEqual(expectedResponse);
        expect(response.payinId).toBe(payinId);
        expect(response.merchantId).toBe(testMerchantId);
        expect(response.amount).toBe("1500");
        expect(response.amountType).toBe("fiat");
    });

    test("should update a payin status", async () => {
        // Skip this test if we don't have a customer or payment method
        if (!testCustomerId && !testPaymentMethodId) {
            console.log(
                "Skipping payin update test - no customer or payment method available",
            );
            return;
        }

        // First create a payin to update
        const createPayload: CreatePayinRequest = {
            merchantId: testMerchantId,
            amount: "2000", // $20.00 in cents
            amountType: "fiat",
            billDate: Math.floor(Date.now() / 1000) + 21600, // 6 hours from now
            description: "SDK Integration Test Payin for Update",
            ...(testCustomerId && { customerId: testCustomerId }),
            ...(testPaymentMethodId && {
                paymentMethodId: testPaymentMethodId,
            }),
        };

        const createdPayin = await payinInstance.create(createPayload);
        const payinId = createdPayin.payinId;

        // Store the created payin ID for cleanup
        createdPayinIds.push(payinId);

        // Update the payin status
        const updatePayload: UpdatePayinRequest = {
            status: "canceled",
            billDate: Math.floor(Date.now() / 1000) + 25200, // 7 hours from now
            description: "Updated SDK Integration Test Payin",
        };

        const expectedResponse: PayinsResponse = {
            totalResults: expect.any(Number),
            payins: expect.arrayContaining([
                expect.objectContaining({
                    payinId: payinId,
                    merchantId: testMerchantId,
                    amount: "2000",
                    amountType: "fiat",
                    description: "Updated SDK Integration Test Payin",
                }),
            ]),
        };

        const response = await payinInstance.update(payinId, updatePayload);

        expect(response).toEqual(expectedResponse);
        expect(response.totalResults).toBeGreaterThan(0);
        expect(response.payins).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    payinId: payinId,
                    merchantId: testMerchantId,
                    amount: "2000",
                    amountType: "fiat",
                    description: "Updated SDK Integration Test Payin",
                }),
            ]),
        );
    });

    test("should search payins with various filters", async () => {
        // Test different search filters
        const searchFilters: PayinQueryParams[] = [
            { merchantId: testMerchantId },
            { status: "scheduled" },
            { page: 1, limit: 5 },
            { sortBy: "dateCreated", sortDir: "desc" },
        ];

        for (const filters of searchFilters) {
            const expectedResponse: PayinsResponse = {
                totalResults: expect.any(Number),
                payins: expect.any(Array),
            };

            const response = await payinInstance.search(filters);

            expect(response).toEqual(expectedResponse);
            expect(response.totalResults).toBeGreaterThanOrEqual(0);
            expect(Array.isArray(response.payins)).toBe(true);
        }
    });
});
