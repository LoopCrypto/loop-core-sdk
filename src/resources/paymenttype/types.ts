import { NetworkIds, SettlementType, SortDirection } from "src/resources/common-types";

/**
 * Payment Type Request
 */

export type SortByFields =
    | "merchantId"
    | "tokenId"
    | "tokenSymbol"
    | "networkId"
    | "dateCreated";

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

export interface PaymentTypeTokenRequest {
    /**
     * The token symbol that identifies the token on the blockchain network. Must match the symbol of the token contract.
     *
     * **Note: Either `tokenAddress` or `tokenSymbol` must be provided. If both are provided, the `tokenAddress` takes precedence.**
     * @example "USDC"
     */
    tokenSymbol?: string;
    /**
     * The token contract address for the payment type. Must be a valid token contract address for the specified network.
     *
     * **Note: Either `tokenAddress` or `tokenSymbol` must be provided. If both are provided, the `tokenAddress` takes precedence.**
     * @example "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
     */
    tokenAddress?: string;
    /**
     * Specifies if this payment type should be set as the default. All payments created without specifying a payment type will use the default payment types list.
     *
     * Defaults to `true`.
     *
     * @example true
     */
    isDefault?: boolean;
}

export interface PaymentTypeRequest {
    networkId: NetworkIds;
    /**
     * The settlement type determines how payments will be settled. If not specified, the settlement type will default to `crypto` settlement where payments are settled in the original payment token.
     *
     * For `fiat` settlements, payments will be automatically converted to fiat currency and deposited into a bank account.
     *
     * **Note:** If the settlement type is `fiat` on any of the payment types, an additional `settlementConfig` is required if this is the first time you're creating a fiat payout destination..
     *
     * Valid values:
     * - `crypto` - The payment type will be settled in crypto currency
     * - `fiat` - The payment type will be settled in fiat currency
     * @example "crypto"
     */
    settlementType?: SettlementType;
    /**
     * The blockchain wallet addresses where payments will be sent if the settlement type is `crypto`. Each address must be a valid address for the specified network.
     *
     * Note: Only required if the settlement type is `crypto`. If the settlement type is `fiat` all addresses entered here will be ignored as a wallet will automatically be created for you with the settlement provider
     * @example ["0x1B3181390bfCb83A98369f660d11c6d73345f60d"]
     */
    payoutDestinations?: string[];
    /**
     * The tokens supported by the payment type
     */
    tokens: PaymentTypeTokenRequest[];
}

export interface CreatePaymentTypeRequest {
    merchantId: string; // The ID of the merchant to associate the payment type with
    networkId: NetworkIds; // The blockchain network ID the payout destination is associated with
    tokenSymbol?: string; // The token symbol that identifies the token on the blockchain network (Optional)
    tokenAddress?: string; // The token contract address for the payment type (Optional)
    // Note: Either tokenAddress or tokenSymbol must be provided. If both are provided, the tokenAddress takes precedence.
    isDefault?: boolean; //Specifies if this payment type should be set as the default. All payments created without specifying a payment type will use the default payment types list.
}

export interface DefaultPaymentTypeRequest {
    /**
     * The ID of the merchant to associate the payment type to. **If not provided, the payment type will be associated with the organization.**
     * @example "9f47c95b-2d1a-4c3e-b67f-891e36c172a8"
     */
    merchantId: string;
    /**
     * The IDs of the tokens to add as default.
     * @example ["3a91d177-bda1-11ef-a8b6-0242ac120002"]
     */
    addDefaultTokens?: string[];
    /**
     * The IDs of the tokens to remove as default.
     * @example ["9f47a848-5c31-4a75-b09d-f5c234875db2"]
     */
    removeDefaultTokens?: string[];
}

/**
 * Payment Type Response
 */
export interface PaymentTypeResponse {
    merchantId: string; // The merchant ID associated with this payment type
    tokenId: string; // The unique identifier for the token used by the payment type
    networkId: number; // The blockchain network ID the token is associated with
    symbol: string; // The token symbol that identifies the token on the blockchain network
    address: string; // The token contract address for the payment type
    decimals: number; // The number of decimal places used to represent token amounts
    dateCreated: number; // The date the payment type record was created (Unix timestamp in seconds)
}

export interface PaymentTypesResponse {
    totalResults: number; // The total count of payment types matching the search criteria
    paymentTypes: PaymentTypeResponse[]; // The list of payment types grouped by merchant and network
}
