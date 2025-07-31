import { Entity } from "src/resources/entity"; // Adjust path as needed
import {
    CreateEntityRequest,
    EntityResponse,
    UpdateEntityRequest,
} from "src/resources/entity/types";

describe("Entity API", () => {
    let entityApi: Entity;
    let requestMock: jest.Mock;

    beforeEach(() => {
        entityApi = new Entity({ entityId: "dxe", apiKey: "ghty" });
        requestMock = jest.fn() as jest.Mock;
        (entityApi as unknown as { request: jest.Mock }).request = requestMock;
    });

    test("should fetch entity details", async () => {
        const mockResponse: EntityResponse = {
            entityId: "ent-123",
            entityName: "Test Entity",
            email: "test@example.com",
            contracts: [
                {
                    networkId: 137,
                    contractAddress: "0x1234567890abcdef",
                },
            ],
            payoutDestinations: [
                {
                    networkId: 137,
                    walletAddress: "0xabcdef1234567890",
                    isDefault: true,
                    payoutDestinationId: "payout-001",
                    settlementType: "Fiat",
                },
            ],
            paymentTypes: [
                {
                    symbol: "USDC",
                    networkId: 137,
                    tokenId: "usdc-001",
                    address: "0xabcdef1234567890",
                    decimals: 6,
                },
            ],
            fiatSettlementAccount: null,
        };

        requestMock.mockResolvedValue(mockResponse);

        const result = await entityApi.retrieve();
        expect(requestMock).toHaveBeenCalledWith("entity", { method: "GET" });
        expect(result).toEqual(mockResponse);
    });

    test("should create a new entity", async () => {
        const requestBody: CreateEntityRequest = {
            code: "auth-code-123",
            entityName: "New Entity",
            email: "new@example.com",
            logoUrl: "https://example.com/logo.png",
            paymentTypes: [
                {
                    networkId: 137,
                    payoutDestinations: ["0xabcdef1234567890"],
                    tokens: [{ tokenAddress: "0x123456", tokenSymbol: "USDT" }],
                },
            ],
        };

        const mockResponse: EntityResponse = {
            entityId: "ent-456",
            entityName: "New Entity",
            email: "new@example.com",
            contracts: [],
            payoutDestinations: [],
            paymentTypes: [],
            fiatSettlementAccount: null,
        };

        requestMock.mockResolvedValue(mockResponse);

        const result = await entityApi.create(requestBody);
        expect(requestMock).toHaveBeenCalledWith("entity", {
            data: requestBody,
            method: "POST",
        });
        expect(result).toEqual(mockResponse);
    });

    test("should update an existing entity", async () => {
        const updateData: UpdateEntityRequest = {
            entityName: "Updated Entity",
            email: "updated@example.com",
            logoUrl: "https://example.com/new-logo.png",
        };

        const mockResponse: EntityResponse = {
            entityId: "ent-123",
            entityName: "Updated Entity",
            email: "updated@example.com",
            contracts: [],
            payoutDestinations: [],
            paymentTypes: [],
            fiatSettlementAccount: null,
        };

        requestMock.mockResolvedValue(mockResponse);

        const result = await entityApi.update(updateData);
        expect(requestMock).toHaveBeenCalledWith("entity", {
            data: updateData,
            method: "PATCH",
        });
        expect(result).toEqual(mockResponse);
    });
});
