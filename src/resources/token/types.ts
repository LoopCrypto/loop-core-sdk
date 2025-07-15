import { SortDirection } from "../common-types";

/**
 * Token Request
 */

export type TokenSortBy =
    | "tokenId"
    | "networkId"
    | "symbol"
    | "address"
    | "decimals";

export interface TokenQueryParams {
    networkId?: string;
    tokenAddress?: string;
    tokenSymbol?: string;
    page?: number;
    limit?: number;
    sortBy?: TokenSortBy;
    sortDir?: SortDirection;
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

export interface TokenResponse {
    /**
     * The unique identifier for the token used by the payment type.
     * @example "123e4567-e89b-12d3-a456-426614174000"
     */
    tokenId: string;
    /**
     * The blockchain network ID the token is associated with
     * @example 1
     */
    networkId: number;
    /**
     * The token symbol that identifies the token on the blockchain network
     * @example "USDC"
     */
    symbol: string;
    /**
     * The token contract address for the payment type
     * @example "0x1234567890abcdef"
     */
    address: string;
    /**
     * The number of decimal places used to represent token amounts
     * @example 6
     */
    decimals: number;
    /**
     * The exchange rate of the token
     */
    exchangeRates: TokenExchangeRateResponse[];
}

export interface TokensResponse {
    /**
     * The total count of tokens matching the search criteria, regardless of page size or number.
     * @example 100
     */
    totalResults: number;
    /**
     * The list of tokens for each network
     */
    tokens: TokenResponse[];
}
