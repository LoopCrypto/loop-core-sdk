import { Payin } from "src/resources/payin";
import {
    CreatePayinRequest,
    PayinQueryParams,
    PayinResponse,
    PayinsResponse,
} from "src/resources/payin/types";

describe("Payin API", () => {
    let payinApi: Payin;
    let requestMock: jest.Mock;

    beforeEach(() => {
        payinApi = new Payin({ entityId: "dxe", apiKey: "ghty" });
        requestMock = jest.fn() as jest.Mock;
        (payinApi as unknown as { request: jest.Mock }).request = requestMock;
    });

    test("should fetch payin list", async () => {
        const queryParams: PayinQueryParams = { page: 1, limit: 10 };
        const mockResponse: PayinsResponse = {
            totalResults: 1,
            payins: [
                {
                    payinId: "payin-123",
                    merchantId: "mer-001",
                    amount: "100.00",
                    amountType: "fiat",
                    billDate: 1700000000,
                    invoiceId: "inv-001",
                    payinType: "invoice",
                    payinStatus: "pending",
                    paymentMethod: {
                        networkId: 1,
                        paymentMethodId: "pm-123",
                        paymentMethodName: "Visa",
                        walletAddress: "0xabcdef",
                        isDefault: true,
                        token: {
                            symbol: "USDT",
                            tokenId: "token-123",
                            address: "0x123456",
                            decimals: 18,
                            exchangeRates: [],
                        },
                        preAuthorization: {
                            balance: "500",
                            authorization: "200",
                        },
                        status: "ok",
                        active: true,
                        customer: {
                            customerId: "cust-123",
                            customerRefId: "cust-123",
                        },
                    },
                    payoutDestination: {
                        networkId: 1,
                        walletAddress: "0x987654",
                        payoutDestinationId: "pd-001",
                        settlementType: "Fiat",
                    },
                    dateCreated: 1700000000,
                    description: "Payment for invoice 001",
                    externalInvoiceRef: "inv-001",
                    transaction: null,
                },
            ],
        };

        requestMock.mockResolvedValue(mockResponse);

        const result = await payinApi.search(queryParams);
        expect(requestMock).toHaveBeenCalledWith("/v2/payins?page=1&limit=10", {
            method: "GET",
        });
        expect(result).toEqual(mockResponse);
    });

    test("should create a new payin", async () => {
        const requestBody: CreatePayinRequest = {
            merchantId: "mer-002",
            amount: "200.00",
            amountType: "fiat",
            billDate: 1700000001,
            paymentMethodId: "pm-456",
            description: "Payment for invoice 002",
        };

        const mockResponse: PayinResponse = {
            payinId: "payin-456",
            merchantId: "mer-002",
            amount: "200.00",
            amountType: "fiat",
            billDate: 1700000001,
            invoiceId: "inv-002",
            payinType: "invoice",
            payinStatus: "scheduled",
            paymentMethod: {
                networkId: 1,
                paymentMethodId: "pm-456",
                paymentMethodName: "Mastercard",
                walletAddress: "0xabcdef",
                isDefault: false,
                token: {
                    symbol: "ETH",
                    tokenId: "token-789",
                    address: "0x789012",
                    decimals: 18,
                    exchangeRates: [],
                },
                preAuthorization: { balance: "1000", authorization: "300" },
                status: "ok",
                active: true,
                customer: {
                    customerId: "cust-123",
                    customerRefId: "cust-123",
                },
            },
            payoutDestination: {
                networkId: 1,
                walletAddress: "0x123987",
                payoutDestinationId: "pd-002",
                settlementType: "Fiat",
            },
            dateCreated: 1700000001,
            description: "Payment for invoice 002",
            externalInvoiceRef: "inv-002",
            transaction: null,
        };

        requestMock.mockResolvedValue(mockResponse);

        const result = await payinApi.create(requestBody);
        expect(requestMock).toHaveBeenCalledWith("/v2/payin", {
            data: requestBody,
            method: "POST",
        });
        expect(result).toEqual(mockResponse);
    });

    test("should retrieve a payin by ID", async () => {
        const payinId = "payin-123";
        const mockResponse: PayinResponse = {
            payinId: "payin-123",
            merchantId: "mer-001",
            amount: "150.00",
            amountType: "fiat",
            billDate: 1700000002,
            invoiceId: "inv-003",
            payinType: "subscription",
            payinStatus: "completed",
            paymentMethod: {
                networkId: 1,
                paymentMethodId: "pm-789",
                paymentMethodName: "PayPal",
                walletAddress: "0xzyx987",
                isDefault: false,
                token: {
                    symbol: "BTC",
                    tokenId: "token-321",
                    address: "0x456789",
                    decimals: 8,
                    exchangeRates: [],
                },
                preAuthorization: { balance: "200", authorization: "50" },
                status: "ok",
                active: true,
                customer: {
                    customerId: "cust-123",
                    customerRefId: "cust-123",
                },
            },
            payoutDestination: {
                networkId: 1,
                walletAddress: "0x654321",
                payoutDestinationId: "pd-003",
                settlementType: "Fiat",
            },
            dateCreated: 1700000002,
            description: "Payment for invoice 003",
            externalInvoiceRef: "inv-003",
            transaction: null,
        };

        requestMock.mockResolvedValue(mockResponse);

        const result = await payinApi.retrieve(payinId);
        expect(requestMock).toHaveBeenCalledWith(`/v2/payin/${payinId}`, {
            method: "GET",
        });
        expect(result).toEqual(mockResponse);
    });
});
