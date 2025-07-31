import { PayoutDestinations } from "../src/resources/payoutDestination";
import {
    PayoutDestinationQueryParams,
    PayoutDestinationResponse,
    CreatePayoutDestinationRequest,
    PayoutDestinationsResponse,
} from "../src/resources/payoutDestination/types";

describe("Payout API", () => {
    let payoutDestinationApi: PayoutDestinations;
    let requestMock: jest.Mock;

    beforeEach(() => {
        payoutDestinationApi = new PayoutDestinations({
            entityId: "test",
            apiKey: "secret",
        });
        requestMock = jest.fn() as jest.Mock;
        (payoutDestinationApi as unknown as { request: jest.Mock }).request =
            requestMock;
    });

    test("should fetch payout destinations", async () => {
        const queryParams: PayoutDestinationQueryParams = {
            page: 1,
            limit: 10,
        };
        const mockResponse: PayoutDestinationsResponse = {
            totalResults: 1,
            paymentTypes: [
                {
                    payoutDestinationId: "payout-123",
                    merchantId: "mer-123",
                    networkId: 137,
                    walletAddress: "0xabcdef1234567890",
                    isDefault: false,
                    dateCreated: 1700000000,
                    settlementType: "Fiat",
                    fiatSettlementAccount: null,
                    isArchived: false,
                },
            ],
        };

        requestMock.mockResolvedValue(mockResponse);

        const result = await payoutDestinationApi.search(queryParams);
        expect(requestMock).toHaveBeenCalledWith(
            "payout-destinations?page=1&limit=10",
            { method: "GET" },
        );
        expect(result).toEqual(mockResponse);
    });

    test("should create a new payout destination", async () => {
        const requestBody: CreatePayoutDestinationRequest = {
            isDefault: true,
            merchantId: "mer-123",
            networkId: 137,
            walletAddress: "0xabcdef1234567890",
        };

        const mockResponse: PayoutDestinationResponse = {
            payoutDestinationId: "payout-456",
            merchantId: "mer-123",
            networkId: 137,
            walletAddress: "0xabcdef1234567890",
            isDefault: true,
            dateCreated: 1700000000,
            settlementType: "Fiat",
            fiatSettlementAccount: null,
            isArchived: false,
        };

        requestMock.mockResolvedValue(mockResponse);

        const result = await payoutDestinationApi.create(requestBody);
        expect(requestMock).toHaveBeenCalledWith("payout-destination", {
            data: requestBody,
            method: "POST",
        });
        expect(result).toEqual(mockResponse);
    });

    test("should retrieve a payout destination by ID", async () => {
        const payoutId = "payout-123";
        const mockResponse: PayoutDestinationResponse = {
            payoutDestinationId: "payout-123",
            merchantId: "mer-123",
            networkId: 137,
            walletAddress: "0xabcdef1234567890",
            isDefault: false,
            dateCreated: 1700000000,
            settlementType: "Fiat",
            fiatSettlementAccount: null,
            isArchived: false,
        };

        requestMock.mockResolvedValue(mockResponse);

        const result = await payoutDestinationApi.retrieve(payoutId);
        expect(requestMock).toHaveBeenCalledWith(
            `payout-destination/${payoutId}`,
            { method: "GET" },
        );
        expect(result).toEqual(mockResponse);
    });

    test("should delete a payout destination", async () => {
        const payoutId = "payout-123";
        const mockResponse: PayoutDestinationsResponse = {
            totalResults: 0,
            paymentTypes: [],
        };

        requestMock.mockResolvedValue(mockResponse);

        const result = await payoutDestinationApi.delete(payoutId);
        expect(requestMock).toHaveBeenCalledWith(
            `payout-destination/${payoutId}`,
            { method: "DELETE" },
        );
        expect(result).toEqual(mockResponse);
    });
});
