import { Customer } from "../src/resources/customer"; // Adjust path as needed
import {
    CustomerQueryParams,
    CustomerRequestBody,
    CustomerType,
} from "../src/resources/customer/types";

describe("Customer API", () => {
    let customerApi: Customer;
    let requestMock: jest.Mock;

    beforeEach(() => {
        customerApi = new Customer({ entityId: "dxe", apiKey: "ghty" });
        requestMock = jest.fn() as jest.Mock; // Explicitly typed as jest.Mock
        (customerApi as unknown as { request: jest.Mock }).request =
            requestMock;
    });

    test("should fetch customers with query params", async () => {
        const queryParams: CustomerQueryParams = {
            page: 1,
            limit: 10,
            sortBy: "customerId",
            sortDir: "asc",
        };

        const mockResponse = {
            totalResults: 1,
            customers: [
                {
                    customerId: "cust-123",
                    customerRefId: "ref-001",
                    subscriptionRefId: null,
                    merchant: {
                        merchantId: "merch-456",
                        merchantName: "Test Merchant",
                        merchantRefId: "merch-ref-789",
                    },
                    paymentMethods: [],
                    dateCreated: 1700000000,
                },
            ],
        };

        requestMock.mockResolvedValue(mockResponse);

        const result = await customerApi.search(queryParams);
        expect(requestMock).toHaveBeenCalledWith(
            "customers?page=1&limit=10&sortBy=customerId&sortDir=asc",
            { method: "GET" },
        );
        expect(result).toEqual(mockResponse);
    });

    test("should create a new customer", async () => {
        const requestBody: CustomerRequestBody = {
            merchantId: "merch-456",
            customerRefId: "ref-001",
            subscriptionRefId: "sub-789",
            paymentMethod: {
                networkId: 137,
                walletAddress: "0x12345abcde",
                name: "Crypto Wallet",
                tokenSymbol: "ETH",
                authorizationSignature: "auth-signature",
            },
        };

        const mockResponse: CustomerType = {
            customerId: "cust-001",
            customerRefId: "ref-001",
            subscriptionRefId: "sub-789",
            merchant: {
                merchantId: "merch-456",
                merchantName: "Test Merchant",
                merchantRefId: "merch-ref-789",
            },
            paymentMethods: [],
            dateCreated: 1700000000,
        };

        requestMock.mockResolvedValue(mockResponse);

        const result = await customerApi.create(requestBody);
        expect(requestMock).toHaveBeenCalledWith("customer", {
            data: requestBody,
            method: "POST",
        });
        expect(result).toEqual(mockResponse);
    });

    test("should retrieve a specific customer", async () => {
        const customerId = "cust-123";

        const mockResponse: CustomerType = {
            customerId: "cust-123",
            customerRefId: "ref-001",
            subscriptionRefId: null,
            merchant: {
                merchantId: "merch-456",
                merchantName: "Test Merchant",
                merchantRefId: "merch-ref-789",
            },
            paymentMethods: [],
            dateCreated: 1700000000,
        };

        requestMock.mockResolvedValue(mockResponse);

        const result = await customerApi.retrieve(customerId);
        expect(requestMock).toHaveBeenCalledWith(`customer/${customerId}`, {
            method: "GET",
        });
        expect(result).toEqual(mockResponse);
    });
});
