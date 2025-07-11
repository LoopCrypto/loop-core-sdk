export type TokenSortBy =
    | "tokenId"
    | "networkId"
    | "symbol"
    | "address"
    | "decimals";

export type TokenDir = "asc" | "desc";

export interface TokenQueryParams {
    networkId?: string;
    tokenAddress?: string;
    tokenSymbol?: string;
    page?: number;
    limit?: number;
    sortBy?: TokenSortBy;
    sortDir?: TokenDir;
}

export interface TokenResponse {
    tokenId: string; // The unique identifier for the token used by the payment type
    networkId: number; // The blockchain network ID the token is associated with
    symbol: string; // The token symbol that identifies the token on the blockchain network
    address: string; // The token contract address for the payment type
    decimals: number; // The number of decimal places used to represent token amounts
}

export interface TokensResponse {
    totalResults: number;
    tokens: TokenResponse[];
}

/**
 * Token Response
 */

export interface TokenExchangeRateResponse {
    /**
     * The currency code. Only "USD" is supported at this time.
     * @example "USD"
     */
    currency: string;
    /**
     * The price of the token in the specified currency code. Accurate to 4 decimal places
     *
     * Example:
     * - a price of "15777447" represents $1577.7447 if the currency is USD
     * - a price of "19900" represents $1.99 if the currency is USD
     * @example "10000"
     */
    price: string;
    /**
     * The provider of the exchange rate.
     *
     * If the provider is "Loop", it means that the exchange rate has been fixed to a certain value. This only happens for stable coins like USDC for example. So instead of getting a rate of 0.9998, you'll get a rate of exactly 1
     * @example "CoinMarketCap"
     */
    provider: string;
    /**
     * The Unix timestamp (in seconds) when this exchange rate was last updated
     * @example 1715731200
     */
    timestamp: number;
}
