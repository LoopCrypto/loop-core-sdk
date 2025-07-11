export type SortByFields =
    | "merchantId"
    | "tokenId"
    | "tokenSymbol"
    | "networkId"
    | "dateCreated";

export type SortDirection = "asc" | "desc";

export interface PaymentTypeQueryParams {
    networkId?: number; // Optional blockchain network ID filter
    tokenId?: string; // Optional token ID filter
    tokenSymbol?: string; // Optional token symbol filter (e.g., USDC, DAI)
    tokenAddress?: string; // Optional token contract address filter
    merchantId?: string; // Optional merchant ID filter
    page?: number; // Pagination parameter, default is 1
    limit?: number; // Pagination limit, default is 25, max is 100
    sortBy?: SortByFields; // Sorting field
    sortDir?: SortDirection; // Sorting direction
}

export interface PaymentTypeResponse {
    merchantId: string; // The merchant ID associated with this payment type
    tokenId: string; // The unique identifier for the token used by the payment type
    networkId: number; // The blockchain network ID the token is associated with
    symbol: string; // The token symbol that identifies the token on the blockchain network
    address: string; // The token contract address for the payment type
    decimals: number; // The number of decimal places used to represent token amounts
    dateCreated: number; // The date the payment type record was created (Unix timestamp in seconds)
}

export interface PaymentTypResponse {
    totalResults: number; // The total count of payment types matching the search criteria
    paymentTypes: PaymentTypeResponse[]; // The list of payment types grouped by merchant and network
}

export type BlockchainNetwork =
    | 1 // Ethereum
    | 10 // Optimism
    | 56 // BNB
    | 137 // Polygon
    | 8453 // Base
    | 42161 // Arbitrum
    | 900 // Solana
    | 11155111 // Sepolia (Demo)
    | 901; // Solana Devnet (Demo)

export interface PaymentTypeRequest {
    merchantId: string; // The ID of the merchant to associate the payment type with
    networkId: BlockchainNetwork; // The blockchain network ID the payout destination is associated with
    tokenAddress?: string; // The token contract address for the payment type (Optional)
    // Note: Either tokenAddress or tokenSymbol must be provided. If both are provided, the tokenAddress takes precedence.
    tokenSymbol?: string; // The token symbol that identifies the token on the blockchain network (Optional)
}
