import { Merchant } from "src/resources/merchant";
import {
    MerchantResponse,
    MerchantQueryParams,
    UpdateMerchantRequest,
    MerchantsResponse,
    CreateMerchantRequest,
} from "src/resources/merchant/types";

describe("Merchant API", () => {
    let merchantApi: Merchant;
    let requestMock: jest.Mock;

    beforeEach(() => {
        merchantApi = new Merchant({ entityId: "dxe", apiKey: "ghty" });
        requestMock = jest.fn() as jest.Mock;
        (merchantApi as unknown as { request: jest.Mock }).request =
            requestMock;
    });

    test("should fetch merchant list", async () => {
        const queryParams: MerchantQueryParams = { page: 1, limit: 10 };
        const mockResponse: MerchantsResponse = {
            totalResults: 1,
            merchants: [
                {
                    merchantId: "mer-123",
                    merchantName: "Test Merchant",
                    merchantRefId: "ref-001",
                    payoutDestinations: [],
                    paymentTypes: [],
                    fiatSettlementAccount: null,
                },
            ],
        };

        requestMock.mockResolvedValue(mockResponse);

        const result = await merchantApi.search(queryParams);
        expect(requestMock).toHaveBeenCalledWith("merchants?page=1&limit=10", {
            method: "GET",
        });
        expect(result).toEqual(mockResponse);
    });

    test("should create a new merchant", async () => {
        const requestBody: CreateMerchantRequest = {
            merchantName: "New Merchant",
            merchantRefId: "ref-002",
            paymentTypes: [
                {
                    networkId: 137,
                    payoutDestinations: ["0xabcdef1234567890"],
                    tokens: [{ tokenAddress: "0x123456", tokenSymbol: "USDT" }],
                },
            ],
        };

        const mockResponse: MerchantResponse = {
            merchantId: "mer-456",
            merchantName: "New Merchant",
            merchantRefId: "ref-002",
            payoutDestinations: [],
            paymentTypes: [],
            fiatSettlementAccount: null,
        };

        requestMock.mockResolvedValue(mockResponse);

        const result = await merchantApi.create(requestBody);
        expect(requestMock).toHaveBeenCalledWith("merchant", {
            data: requestBody,
            method: "POST",
        });
        expect(result).toEqual(mockResponse);
    });

    test("should retrieve a merchant by ID", async () => {
        const merchantId = "mer-123";
        const mockResponse: MerchantResponse = {
            merchantId: "mer-123",
            merchantName: "Test Merchant",
            merchantRefId: "ref-001",
            payoutDestinations: [],
            paymentTypes: [],
            fiatSettlementAccount: null,
        };

        requestMock.mockResolvedValue(mockResponse);

        const result = await merchantApi.retrieve(merchantId);
        expect(requestMock).toHaveBeenCalledWith(`merchant/${merchantId}`, {
            method: "GET",
        });
        expect(result).toEqual(mockResponse);
    });

    test("should update an existing merchant", async () => {
        const merchantId = "mer-123";
        const updateData: UpdateMerchantRequest = {
            merchantName: "Updated Merchant",
        };

        const mockResponse: MerchantResponse = {
            merchantId: "mer-123",
            merchantName: "Updated Merchant",
            merchantRefId: "ref-001",
            payoutDestinations: [],
            paymentTypes: [],
            fiatSettlementAccount: null,
        };

        requestMock.mockResolvedValue(mockResponse);

        const result = await merchantApi.update(merchantId, updateData);
        expect(requestMock).toHaveBeenCalledWith(`merchant/${merchantId}`, {
            data: updateData,
            method: "PATCH",
        });
        expect(result).toEqual(mockResponse);
    });
});
