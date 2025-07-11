import { PaymentMethod } from "../src/resources/paymentmethod";
import {
    PaymentMethodQueryParams,
    PaymentMethodResponse,
    CreatePaymentMethodRequest,
    PaymentMethodType,
} from "../src/resources/paymentmethod/types";

describe("PaymentMethod API", () => {
    let paymentMethodApi: PaymentMethod;
    let requestMock: jest.Mock;

    beforeEach(() => {
        paymentMethodApi = new PaymentMethod({
            entityId: "dxe",
            apiKey: "ghty",
        });
        requestMock = jest.fn();
        (paymentMethodApi as any).request = requestMock;
    });

    test("should fetch payment methods list", async () => {
        const queryParams: PaymentMethodQueryParams = { page: 1, limit: 10 };
        const mockResponse: PaymentMethodResponse = {
            totalResults: 1,
            paymentMethods: [
                {
                    paymentMethodId: "pay-123",
                    merchantId: "mer-123",
                    paymentMethodName: "Crypto Wallet",
                    networkId: 137,
                    walletAddress: "0x1234567890abcdef",
                    isDefault: true,
                    token: {
                        symbol: "ETH",
                        tokenId: "eth-123",
                        address: "0xabcdef1234567890",
                        decimals: 18,
                        exchangeRates: [
                            {
                                currency: "USD",
                                price: "2000.00",
                                timestamp: 1700000000,
                            },
                        ],
                    },
                    preAuthorization: null,
                    dateCreated: 1700000000,
                },
            ],
        };

        requestMock.mockResolvedValue(mockResponse);
        const response = await paymentMethodApi.search(queryParams);
        expect(requestMock).toHaveBeenCalledWith(
            "payment-methods?page=1&limit=10",
            { method: "GET" },
        );
        expect(response).toEqual(mockResponse);
    });

    test("should create a new payment method", async () => {
        const payload: CreatePaymentMethodRequest = {
            name: "My Wallet",
            customerId: "cust-123",
            networkId: 137,
            walletAddress: "0x1234567890abcdef",
            authorizationSignature: "signature-xyz",
        };

        const mockResponse: PaymentMethodType = {
            paymentMethodId: "pay-123",
            merchantId: "mer-123",
            paymentMethodName: "My Wallet",
            networkId: 137,
            walletAddress: "0x1234567890abcdef",
            isDefault: false,
            token: {
                symbol: "ETH",
                tokenId: "eth-123",
                address: "0xabcdef1234567890",
                decimals: 18,
                exchangeRates: [],
            },
            preAuthorization: null,
            dateCreated: 1700000000,
        };

        requestMock.mockResolvedValue(mockResponse);
        const response = await paymentMethodApi.create(payload);
        expect(requestMock).toHaveBeenCalledWith("payment-method", {
            data: payload,
            method: "POST",
        });
        expect(response).toEqual(mockResponse);
    });

    test("should retrieve a payment method by ID", async () => {
        const paymentMethodId = "pay-123";
        const mockResponse: PaymentMethodType = {
            paymentMethodId,
            merchantId: "mer-123",
            paymentMethodName: "Crypto Wallet",
            networkId: 137,
            walletAddress: "0x1234567890abcdef",
            isDefault: true,
            token: {
                symbol: "ETH",
                tokenId: "eth-123",
                address: "0xabcdef1234567890",
                decimals: 18,
                exchangeRates: [],
            },
            preAuthorization: null,
            dateCreated: 1700000000,
        };

        requestMock.mockResolvedValue(mockResponse);
        const response = await paymentMethodApi.retrieve(paymentMethodId);
        expect(requestMock).toHaveBeenCalledWith(
            `payment-method/${paymentMethodId}`,
            { method: "GET" },
        );
        expect(response).toEqual(mockResponse);
    });

    test("should delete a payment method by ID", async () => {
        const paymentMethodId = "pay-123";
        const mockResponse: PaymentMethodResponse = {
            totalResults: 0,
            paymentMethods: [],
        };

        requestMock.mockResolvedValue(mockResponse);
        const response = await paymentMethodApi.delete(paymentMethodId);
        expect(requestMock).toHaveBeenCalledWith(
            `payment-method/${paymentMethodId}`,
            { method: "DELETE" },
        );
        expect(response).toEqual(mockResponse);
    });
});
