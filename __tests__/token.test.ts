import { Token } from "../src/resources/token";
import { TokenQueryParams, TokenResponse } from "../src/resources/token/types";

describe("Token API", () => {
    let tokenApi: Token;
    let requestMock: jest.Mock;

    beforeEach(() => {
        tokenApi = new Token({ entityId: "test", apiKey: "secret" });
        requestMock = jest.fn() as jest.Mock;
        (tokenApi as unknown as { request: jest.Mock }).request = requestMock;
    });

    test("should fetch tokens without query parameters", async () => {
        const mockResponse: TokenResponse = {
            totalResults: 2,
            tokens: [
                {
                    tokenId: "1",
                    networkId: 137,
                    symbol: "MATIC",
                    address: "0xabcdef1234567890",
                    decimals: 18,
                },
                {
                    tokenId: "2",
                    networkId: 1,
                    symbol: "ETH",
                    address: "0x123456abcdef7890",
                    decimals: 18,
                },
            ],
        };

        requestMock.mockResolvedValue(mockResponse);

        const result = await tokenApi.search();
        expect(requestMock).toHaveBeenCalledWith("tokens", { method: "GET" });
        expect(result).toEqual(mockResponse);
    });

    test("should fetch tokens with query parameters", async () => {
        const queryParams: TokenQueryParams = {
            networkId: "137",
            page: 1,
            limit: 10,
        };
        const mockResponse: TokenResponse = {
            totalResults: 1,
            tokens: [
                {
                    tokenId: "1",
                    networkId: 137,
                    symbol: "MATIC",
                    address: "0xabcdef1234567890",
                    decimals: 18,
                },
            ],
        };

        requestMock.mockResolvedValue(mockResponse);

        const result = await tokenApi.search(queryParams);
        expect(requestMock).toHaveBeenCalledWith(
            "tokens?networkId=137&page=1&limit=10",
            { method: "GET" },
        );
        expect(result).toEqual(mockResponse);
    });

    test("should handle errors from request method", async () => {
        const errorMessage = "Request failed";
        requestMock.mockRejectedValue(new Error(errorMessage));

        await expect(tokenApi.search()).rejects.toThrow(errorMessage);
        expect(requestMock).toHaveBeenCalledWith("tokens", { method: "GET" });
    });
});
