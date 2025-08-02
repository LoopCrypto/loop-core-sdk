import { Customer } from "src/resources/customer";
import {
    CustomerQueryParams,
    CreateCustomerRequest,
    MerchantCustomerResponse,
    CustomerResponse,
} from "src/resources/customer/types";

describe("Customer API", () => {
    let customerApi: Customer;
    const createdCustomerIds: string[] = [];
    let testCustomerRefId: string;

    const parentApiKey = process.env.PARENT_API_KEY || "";
    const parentEntityId = process.env.PARENT_ENTITY_ID || "";
    const merchantEntityId = process.env.MERCHANT_ENTITY_ID || "";

    beforeAll(async () => {
        customerApi = new Customer({ entityId: parentEntityId, apiKey: parentApiKey });

        // Create test customer data with random suffix to avoid conflicts
        const randomSuffix = Math.floor(Math.random() * 10000);
        testCustomerRefId = `test-customer-ref-${randomSuffix}`;

        // Create a test customer for integration testing
        try {
            const createPayload: CreateCustomerRequest = {
                merchantId: merchantEntityId,
                customerRefId: testCustomerRefId,
            };

            const response = await customerApi.create(createPayload);
            createdCustomerIds.push(response.customerId);
        } catch {
            console.log(`Test customer might already exist, continuing...`);
        }
    });

    test("should fetch customers with query params", async () => {
        const queryParams: CustomerQueryParams = {
            page: 1,
            limit: 10,
            sortBy: "customerId",
            sortDir: "asc",
        };

        const response = await customerApi.search(queryParams);

        expect(response).toHaveProperty('totalResults');
        expect(typeof response.totalResults).toBe('number');
        expect(response).toHaveProperty('customers');
        expect(Array.isArray(response.customers)).toBe(true);
        expect(response.totalResults).toBeGreaterThanOrEqual(0);
        expect(Array.isArray(response.customers)).toBe(true);
    });

    test("should fetch customers without query params", async () => {
        const response = await customerApi.search();

        expect(response).toHaveProperty('totalResults');
        expect(typeof response.totalResults).toBe('number');
        expect(response).toHaveProperty('customers');
        expect(Array.isArray(response.customers)).toBe(true);
        expect(response.totalResults).toBeGreaterThanOrEqual(0);
        expect(Array.isArray(response.customers)).toBe(true);
    });

    test("should fetch customers with pagination", async () => {
        const queryParams: CustomerQueryParams = {
            page: 1,
            limit: 5,
        };

        const response = await customerApi.search(queryParams);

        expect(response.totalResults).toBeGreaterThanOrEqual(0);
        expect(Array.isArray(response.customers)).toBe(true);
        expect(response.customers.length).toBeLessThanOrEqual(5);
    });

    test("should fetch customers with sorting", async () => {
        const queryParams: CustomerQueryParams = {
            sortBy: "dateCreated",
            sortDir: "desc",
        };

        const response = await customerApi.search(queryParams);

        expect(response.totalResults).toBeGreaterThanOrEqual(0);
        expect(Array.isArray(response.customers)).toBe(true);

        // Verify sorting if we have multiple customers
        if (response.customers.length > 1) {
            const dates = response.customers.map(customer => customer.dateCreated);
            const sortedDates = [...dates].sort((a, b) => b - a); // desc order
            expect(dates).toEqual(sortedDates);
        }
    });

    test("should create a new customer", async () => {
        const randomSuffix = Math.floor(Math.random() * 10000);
        const createPayload: CreateCustomerRequest = {
            merchantId: merchantEntityId,
            customerRefId: `integration-test-customer-${randomSuffix}`,
            subscriptionRefId: `integration-test-subscription-${randomSuffix}`,
        };

        const expectedResponse: MerchantCustomerResponse = {
            customerId: expect.any(String),
            customerRefId: `integration-test-customer-${randomSuffix}`,
            paymentMethods: expect.any(Array),
            dateCreated: expect.any(Number),
        };

        const response = await customerApi.create(createPayload);

        expect(response).toEqual(expectedResponse);
        expect(response.customerId).toBeTruthy();
        expect(response.customerRefId).toBe(`integration-test-customer-${randomSuffix}`);
    });

    test.skip("should create a customer with payment method", async () => {
        const randomSuffix = Math.floor(Math.random() * 10000);
        const createPayload: CreateCustomerRequest = {
            merchantId: merchantEntityId,
            customerRefId: `integration-test-customer-pm-${randomSuffix}`,
            paymentMethod: {
                name: "Test Crypto Wallet",
                networkId: 11155111,
                walletAddress: "0x1234567890abcdef1234567890abcdef12345678",
                tokenAddress: "0x1c7d4b196cb0c7b01d743fbc6116a902379c7238",
                tokenSymbol: "USDC",
                isDefault: true,
                authorizationSignature: "fix me", // <----- need to add this
            },
        };

        const expectedResponse: MerchantCustomerResponse = {
            customerId: expect.any(String),
            customerRefId: `integration-test-customer-pm-${randomSuffix}`,
            paymentMethods: expect.any(Array),
            dateCreated: expect.any(Number),
        };

        const response = await customerApi.create(createPayload);

        expect(response).toEqual(expectedResponse);
        expect(response.customerRefId).toBe(`integration-test-customer-pm-${randomSuffix}`);
    });

    test("should retrieve a specific customer", async () => {
        // First create a customer to retrieve
        const randomSuffix = Math.floor(Math.random() * 10000);
        const createPayload: CreateCustomerRequest = {
            merchantId: merchantEntityId,
            customerRefId: `retrieve-test-customer-${randomSuffix}`,
        };

        const createdCustomer = await customerApi.create(createPayload);
        const customerId = createdCustomer.customerId;

        // Now retrieve the customer
        const expectedResponse: CustomerResponse = {
            customerId: customerId,
            customerRefIds: [
                {
                    merchantId: merchantEntityId,
                    customerRefId: `retrieve-test-customer-${randomSuffix}`,
                }
            ],
            paymentMethods: expect.any(Array),
            dateCreated: expect.any(Number),
        };

        const response = await customerApi.retrieve(customerId);

        expect(response).toEqual(expectedResponse);
        expect(response.customerId).toBe(customerId);
        expect(response.customerRefIds).toHaveLength(1);
        expect(response.customerRefIds[0].customerRefId).toBe(`retrieve-test-customer-${randomSuffix}`);
    });

    test("should retrieve customer with existing customer ID", async () => {
        // Use the customer created in beforeAll if it exists
        if (createdCustomerIds.length > 0) {
            const customerId = createdCustomerIds[0];

            const expectedResponse: CustomerResponse = {
                customerId: customerId,
                customerRefIds: expect.any(Array),
                paymentMethods: expect.any(Array),
                dateCreated: expect.any(Number),
            };

            const response = await customerApi.retrieve(customerId);

            expect(response).toEqual(expectedResponse);
            expect(response.customerId).toBe(customerId);
            expect(Array.isArray(response.customerRefIds)).toBe(true);
            expect(Array.isArray(response.paymentMethods)).toBe(true);
            expect(typeof response.dateCreated).toBe("number");
        } else {
            // Skip test if no customers were created in beforeAll
            console.log("Skipping retrieve test - no test customers available");
        }
    });
});