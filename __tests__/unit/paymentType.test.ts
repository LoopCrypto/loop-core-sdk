import { PaymentType } from "src/resources/paymentType";
import {
    CreatePaymentTypeRequest,
    PaymentTypeQueryParams,
    PaymentTypeResponse,
    PaymentTypesResponse,
} from "src/resources/paymentType/types";

describe("PaymentType API", () => {
    let paymentTypeApi: PaymentType;
    let requestMock: jest.Mock;

    beforeEach(() => {
        paymentTypeApi = new PaymentType({ entityId: "dxe", apiKey: "ghty" });
        requestMock = jest.fn() as jest.Mock;
        (paymentTypeApi as unknown as { request: jest.Mock }).request =
            requestMock;
    });

    test("should fetch payment types", async () => {
        const queryParams: PaymentTypeQueryParams = { page: 1, limit: 10 };
        const mockResponse: PaymentTypesResponse = {
            totalResults: 1,
            paymentTypes: [
                {
                    merchantId: "mer-123",
                    tokenId: "token-001",
                    networkId: 137,
                    symbol: "USDT",
                    address: "0xabcdef1234567890",
                    decimals: 6,
                    dateCreated: 1700000000,
                },
            ],
        };

        requestMock.mockResolvedValue(mockResponse);

        const result = await paymentTypeApi.search(queryParams);
        expect(requestMock).toHaveBeenCalledWith(
            "payment-types?page=1&limit=10",
            { method: "GET" },
        );
        expect(result).toEqual(mockResponse);
    });

    test("should create a new payment type", async () => {
        const requestBody: CreatePaymentTypeRequest = {
            merchantId: "mer-123",
            networkId: 137,
            tokenAddress: "0x123456",
            tokenSymbol: "USDT",
        };

        const mockResponse: PaymentTypeResponse = {
            merchantId: "mer-123",
            tokenId: "token-002",
            networkId: 137,
            symbol: "USDT",
            address: "0x123456",
            decimals: 6,
            dateCreated: 1700000001,
        };

        requestMock.mockResolvedValue(mockResponse);

        const result = await paymentTypeApi.create(requestBody);
        expect(requestMock).toHaveBeenCalledWith("payment-type", {
            data: requestBody,
            method: "POST",
        });
        expect(result).toEqual(mockResponse);
    });

    test("should delete a payment type", async () => {
        const merchantId = "mer-123";
        const tokenId = "token-001";
        const mockResponse: PaymentTypesResponse = {
            totalResults: 0,
            paymentTypes: [],
        };

        requestMock.mockResolvedValue(mockResponse);

        const result = await paymentTypeApi.delete(merchantId, tokenId);
        expect(requestMock).toHaveBeenCalledWith(
            `payment-type/${merchantId}/${tokenId}`,
            { method: "DELETE" },
        );
        expect(result).toEqual(mockResponse);
    });
});
