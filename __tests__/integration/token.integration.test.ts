import { Token } from "src/resources/token";
import { TokenQueryParams, TokensResponse } from "src/resources/token/types";

describe("Token Integration", () => {
    let tokenInstance: Token;

    const parentApiKey = process.env.PARENT_API_KEY || "";
    const parentEntityId = process.env.PARENT_ENTITY_ID || "";
    const sepoliaNetworkId = "11155111"; // Sepolia testnet
    const usdcSymbol = "USDC";

    beforeAll(async () => {
        tokenInstance = new Token({
            apiKey: parentApiKey,
            entityId: parentEntityId,
        });
    });

    test("should fetch all tokens", async () => {
        const expectedResponse: TokensResponse = {
            totalResults: expect.any(Number),
            tokens: expect.arrayContaining([
                expect.objectContaining({
                    tokenId: expect.any(String),
                    networkId: expect.any(Number),
                    symbol: expect.any(String),
                    address: expect.any(String),
                    decimals: expect.any(Number),
                    exchangeRates: expect.any(Array),
                }),
            ]),
        };

        const response = await tokenInstance.search();

        expect(response).toEqual(expectedResponse);
        expect(response.totalResults).toBeGreaterThan(0);
        expect(response.tokens.length).toBeGreaterThan(0);
    });

    test("should fetch USDC tokens on Sepolia network", async () => {
        const queryParams: TokenQueryParams = {
            networkId: sepoliaNetworkId,
            tokenSymbol: usdcSymbol,
        };

        const expectedResponse: TokensResponse = {
            totalResults: expect.any(Number),
            tokens: expect.arrayContaining([
                expect.objectContaining({
                    tokenId: expect.any(String),
                    networkId: parseInt(sepoliaNetworkId),
                    symbol: usdcSymbol,
                    address: expect.any(String),
                    decimals: expect.any(Number),
                    exchangeRates: expect.any(Array),
                }),
            ]),
        };

        const response = await tokenInstance.search(queryParams);

        expect(response).toEqual(expectedResponse);

        // Verify all returned tokens are USDC on Sepolia
        response.tokens.forEach((token) => {
            expect(token.networkId).toBe(parseInt(sepoliaNetworkId));
            expect(token.symbol).toBe(usdcSymbol);
        });
    });

    test("should fetch tokens sorted by symbol", async () => {
        const queryParams: TokenQueryParams = {
            networkId: sepoliaNetworkId,
            sortBy: "symbol",
            sortDir: "asc",
        };

        const expectedResponse: TokensResponse = {
            totalResults: expect.any(Number),
            tokens: expect.any(Array),
        };

        const response = await tokenInstance.search(queryParams);

        expect(response).toEqual(expectedResponse);

        // Verify tokens are sorted by symbol in ascending order
        if (response.tokens.length > 1) {
            for (let i = 0; i < response.tokens.length - 1; i++) {
                expect(
                    response.tokens[i].symbol.localeCompare(
                        response.tokens[i + 1].symbol,
                    ),
                ).toBeLessThanOrEqual(0);
            }
        }
    });
});
