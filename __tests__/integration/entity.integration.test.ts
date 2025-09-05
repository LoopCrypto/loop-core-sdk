import { Entity } from "src/resources/entity";
import {
    EntityResponse,
    CreateEntityRequest,
    UpdateEntityRequest,
} from "src/resources/entity/types";

describe("Entity API", () => {
    let entityApi: Entity;
    const createdEntityIds: string[] = [];

    const parentApiKey = process.env.PARENT_API_KEY || "";
    const parentEntityId = process.env.PARENT_ENTITY_ID || "";

    beforeAll(async () => {
        entityApi = new Entity({
            apiKey: parentApiKey,
            entityId: parentEntityId,
        });
    });

    afterAll(async () => {
        // Clean up any created entities if needed
        // Note: Entity deletion might not be available in the API
        for (const entityId of createdEntityIds) {
            try {
                console.log(`Created entity ${entityId} - cleanup may be manual`);
            } catch (error) {
                console.log(`Failed to clean up entity ${entityId}:`, error);
            }
        }
    });

    test("should retrieve the current entity", async () => {
        const expectedResponse: EntityResponse = {
            entityId: expect.any(String),
            entityName: expect.any(String),
            email: expect.any(String),
            contracts: expect.any(Array),
            payoutDestinations: expect.any(Array),
            fiatSettlementAccount: expect.any(Object),
            paymentTypes: expect.any(Array),
        };

        const response = await entityApi.retrieve();

        expect(response).toEqual(expectedResponse);
        expect(response.entityId).toBeTruthy();
        expect(response.entityName).toBeTruthy();
        expect(response.email).toBeTruthy();
        expect(Array.isArray(response.contracts)).toBe(true);
        expect(Array.isArray(response.payoutDestinations)).toBe(true);
        expect(Array.isArray(response.paymentTypes)).toBe(true);
    });

    test("should create a new entity", async () => {
        const randomSuffix = Math.floor(Math.random() * 10000);
        const createPayload: CreateEntityRequest = {
            entityName: `Test Entity ${randomSuffix}`,
            email: `test-entity-${randomSuffix}@example.com`,
            logoUrl: `https://example.com/logo-${randomSuffix}.png`,
            paymentTypes: [
                {
                    networkId: 11155111, // Sepolia testnet
                    settlementType: "Crypto",
                    payoutDestinations: ["0x1234567890abcdef1234567890abcdef12345678"],
                    tokens: [
                        {
                            tokenAddress: "0x1c7d4b196cb0c7b01d743fbc6116a902379c7238",
                            tokenSymbol: "USDC",
                            isDefault: true,
                        },
                    ],
                },
            ],
        };

        const expectedResponse: EntityResponse = {
            entityId: expect.any(String),
            entityName: `Test Entity ${randomSuffix}`,
            email: `test-entity-${randomSuffix}@example.com`,
            contracts: expect.any(Array),
            payoutDestinations: expect.any(Array),
            fiatSettlementAccount: expect.any(Object),
            paymentTypes: expect.any(Array),
        };

        const response = await entityApi.create(createPayload);

        expect(response).toEqual(expectedResponse);
        expect(response.entityId).toBeTruthy();
        expect(response.entityName).toBe(`Test Entity ${randomSuffix}`);
        expect(response.email).toBe(`test-entity-${randomSuffix}@example.com`);

        // Store the created entity ID for cleanup
        createdEntityIds.push(response.entityId);
    });

    test("should create an entity with minimal required fields", async () => {
        const randomSuffix = Math.floor(Math.random() * 10000);
        const createPayload: CreateEntityRequest = {
            entityName: `Minimal Entity ${randomSuffix}`,
            email: `minimal-entity-${randomSuffix}@example.com`,
            paymentTypes: [
                {
                    networkId: 137, // Polygon mainnet
                    settlementType: "Crypto",
                    payoutDestinations: ["0xabcdef1234567890abcdef1234567890abcdef12"],
                    tokens: [
                        {
                            tokenSymbol: "MATIC",
                            isDefault: true,
                        },
                    ],
                },
            ],
        };

        const expectedResponse: EntityResponse = {
            entityId: expect.any(String),
            entityName: `Minimal Entity ${randomSuffix}`,
            email: `minimal-entity-${randomSuffix}@example.com`,
            contracts: expect.any(Array),
            payoutDestinations: expect.any(Array),
            fiatSettlementAccount: expect.any(Object),
            paymentTypes: expect.any(Array),
        };

        const response = await entityApi.create(createPayload);

        expect(response).toEqual(expectedResponse);
        expect(response.entityId).toBeTruthy();
        expect(response.entityName).toBe(`Minimal Entity ${randomSuffix}`);
        expect(response.email).toBe(`minimal-entity-${randomSuffix}@example.com`);

        // Store the created entity ID for cleanup
        createdEntityIds.push(response.entityId);
    });

    test("should create an entity with fiat settlement settings", async () => {
        const randomSuffix = Math.floor(Math.random() * 10000);
        const createPayload: CreateEntityRequest = {
            entityName: `Fiat Entity ${randomSuffix}`,
            email: `fiat-entity-${randomSuffix}@example.com`,
            paymentTypes: [
                {
                    networkId: 1, // Ethereum mainnet
                    settlementType: "Fiat",
                    payoutDestinations: ["0x1234567890abcdef1234567890abcdef12345678"],
                    tokens: [
                        {
                            tokenAddress: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
                            tokenSymbol: "USDC",
                            isDefault: true,
                        },
                    ],
                },
            ],
            fiatSettlementSettings: {
                customerType: "Business",
                firstName: "Test",
                lastName: "Account",
                email: `fiat-entity-${randomSuffix}@example.com`,
            },
        };

        const expectedResponse: EntityResponse = {
            entityId: expect.any(String),
            entityName: `Fiat Entity ${randomSuffix}`,
            email: `fiat-entity-${randomSuffix}@example.com`,
            contracts: expect.any(Array),
            payoutDestinations: expect.any(Array),
            fiatSettlementAccount: expect.any(Object),
            paymentTypes: expect.any(Array),
        };

        const response = await entityApi.create(createPayload);

        expect(response).toEqual(expectedResponse);
        expect(response.entityId).toBeTruthy();
        expect(response.entityName).toBe(`Fiat Entity ${randomSuffix}`);
        expect(response.email).toBe(`fiat-entity-${randomSuffix}@example.com`);
        expect(response.fiatSettlementAccount).toBeTruthy();

        // Store the created entity ID for cleanup
        createdEntityIds.push(response.entityId);
    });

    test("should update an entity", async () => {
        // First create an entity to update
        const randomSuffix = Math.floor(Math.random() * 10000);
        const createPayload: CreateEntityRequest = {
            entityName: `Update Test Entity ${randomSuffix}`,
            email: `update-test-${randomSuffix}@example.com`,
            paymentTypes: [
                {
                    networkId: 11155111,
                    settlementType: "Crypto",
                    payoutDestinations: ["0x1234567890abcdef1234567890abcdef12345678"],
                    tokens: [
                        {
                            tokenSymbol: "ETH",
                            isDefault: true,
                        },
                    ],
                },
            ],
        };

        const createdEntity = await entityApi.create(createPayload);
        const entityId = createdEntity.entityId;
        createdEntityIds.push(entityId);

        // Now update the entity
        const updatePayload: UpdateEntityRequest = {
            entityName: `Updated Entity ${randomSuffix}`,
            email: `updated-entity-${randomSuffix}@example.com`,
            logoUrl: `https://updated-example.com/logo-${randomSuffix}.png`,
        };

        const expectedResponse: EntityResponse = {
            entityId: entityId,
            entityName: `Updated Entity ${randomSuffix}`,
            email: `updated-entity-${randomSuffix}@example.com`,
            contracts: expect.any(Array),
            payoutDestinations: expect.any(Array),
            fiatSettlementAccount: expect.any(Object),
            paymentTypes: expect.any(Array),
        };

        const response = await entityApi.update(updatePayload);

        expect(response).toEqual(expectedResponse);
        expect(response.entityId).toBe(entityId);
        expect(response.entityName).toBe(`Updated Entity ${randomSuffix}`);
        expect(response.email).toBe(`updated-entity-${randomSuffix}@example.com`);
        // Note: logoUrl is not returned in EntityResponse, only in request
    });

    test("should update entity with partial data", async () => {
        // First create an entity to update
        const randomSuffix = Math.floor(Math.random() * 10000);
        const createPayload: CreateEntityRequest = {
            entityName: `Partial Update Test ${randomSuffix}`,
            email: `partial-update-${randomSuffix}@example.com`,
            paymentTypes: [
                {
                    networkId: 137,
                    settlementType: "Crypto",
                    payoutDestinations: ["0xabcdef1234567890abcdef1234567890abcdef12"],
                    tokens: [
                        {
                            tokenSymbol: "MATIC",
                            isDefault: true,
                        },
                    ],
                },
            ],
        };

        const createdEntity = await entityApi.create(createPayload);
        const entityId = createdEntity.entityId;
        createdEntityIds.push(entityId);

        // Update only the email
        const updatePayload: UpdateEntityRequest = {
            email: `partially-updated-${randomSuffix}@example.com`,
        };

        const expectedResponse: EntityResponse = {
            entityId: entityId,
            entityName: `Partial Update Test ${randomSuffix}`,
            email: `partially-updated-${randomSuffix}@example.com`,
            contracts: expect.any(Array),
            payoutDestinations: expect.any(Array),
            fiatSettlementAccount: expect.any(Object),
            paymentTypes: expect.any(Array),
        };

        const response = await entityApi.update(updatePayload);

        expect(response).toEqual(expectedResponse);
        expect(response.entityId).toBe(entityId);
        expect(response.entityName).toBe(`Partial Update Test ${randomSuffix}`); // Should remain unchanged
        expect(response.email).toBe(`partially-updated-${randomSuffix}@example.com`); // Should be updated
    });

    test("should handle entity retrieval with proper structure", async () => {
        const response = await entityApi.retrieve();

        // Verify the structure of the response
        expect(response).toHaveProperty('entityId');
        expect(response).toHaveProperty('entityName');
        expect(response).toHaveProperty('email');
        expect(response).toHaveProperty('contracts');
        expect(response).toHaveProperty('payoutDestinations');
        expect(response).toHaveProperty('fiatSettlementAccount');
        expect(response).toHaveProperty('paymentTypes');

        // Verify data types
        expect(typeof response.entityId).toBe('string');
        expect(typeof response.entityName).toBe('string');
        expect(typeof response.email).toBe('string');
        expect(Array.isArray(response.contracts)).toBe(true);
        expect(Array.isArray(response.payoutDestinations)).toBe(true);
        expect(Array.isArray(response.paymentTypes)).toBe(true);

        // Verify contracts structure if any exist
        if (response.contracts.length > 0) {
            const contract = response.contracts[0];
            expect(contract).toHaveProperty('networkId');
            expect(contract).toHaveProperty('contractAddress');
            expect(typeof contract.networkId).toBe('number');
            expect(typeof contract.contractAddress).toBe('string');
        }

        // Verify payout destinations structure if any exist
        if (response.payoutDestinations.length > 0) {
            const destination = response.payoutDestinations[0];
            expect(destination).toHaveProperty('payoutDestinationId');
            expect(destination).toHaveProperty('networkId');
            expect(destination).toHaveProperty('settlementType');
            expect(destination).toHaveProperty('walletAddress');
            expect(destination).toHaveProperty('isDefault');
        }

        // Verify payment types structure if any exist
        if (response.paymentTypes.length > 0) {
            const paymentType = response.paymentTypes[0];
            expect(paymentType).toHaveProperty('symbol');
            expect(paymentType).toHaveProperty('networkId');
            expect(paymentType).toHaveProperty('tokenId');
            expect(paymentType).toHaveProperty('address');
            expect(paymentType).toHaveProperty('decimals');
        }
    });
});