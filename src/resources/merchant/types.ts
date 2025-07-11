interface PaymentToken {
    tokenAddress?: string; // The token contract address for the payment type
    tokenSymbol?: string; // The token symbol that identifies the token on the blockchain network
}

interface PaymentType {
    networkId: 1 | 10 | 56 | 137 | 8453 | 42161 | 900 | 11155111 | 901; // Blockchain network ID
    payoutDestinations: string[]; // The blockchain wallet addresses where payments will be sent
    tokens: PaymentToken[]; // The tokens supported by the payment type
}

export interface MerchantRequest {
    merchantName: string; // The name that identifies the merchant
    merchantRefId?: string; // A unique reference ID used to identify the merchant in external systems
    paymentTypes?: PaymentType[]; // Configuration specifying payment networks and tokens the merchant will accept
}

interface PayoutDestination {
    networkId: number; // The blockchain network ID the payout destination is associated with
    walletAddress: string; // The blockchain wallet address where payments will be sent
    isDefault: boolean; // Whether the payout destination is the default payout destination
    payoutDestinationId: string; // The unique identifier for the payout destination
}

interface PaymentTypeResponse {
    symbol: string; // The token symbol that identifies the token on the blockchain network
    networkId: 1 | 10 | 56 | 137 | 8453 | 42161 | 900 | 11155111 | 901; // Blockchain network ID
    tokenId: string; // The unique identifier for the token used by the payment type
    address: string; // The token contract address for the payment type
    decimals: number; // The number of decimal places used to represent token amounts
}

export interface MerchantResponse {
    merchantId: string; // The unique identifier for the merchant
    merchantName: string; // The name that identifies the merchant
    merchantRefId: string | null; // The unique reference ID used to identify the merchant in external systems
    payoutDestinations: PayoutDestination[]; // The payout destinations supported by the organization
    paymentTypes: PaymentTypeResponse[]; // The payment types supported by the merchant
}

export interface MerchantQueryParams {
    merchantId?: string;
    merchantName?: string;
    merchantRefId?: string;
    page?: number; // Using number instead of double since TypeScript uses number for all numeric values
    limit?: number;
    sortBy?: "dateCreated" | "merchantId" | "merchantName" | "merchantRefId";
    sortDir?: "asc" | "desc";
}

export interface MerchantResponseList {
    totalResults: number; // Total count of payment methods matching the search criteria
    merchants: MerchantResponse[]; // List of payment methods grouped by merchant and network
}

export interface UpdateMerchantRequest {
    merchantName?: string; // Optional: The new name for the merchant. If not provided, the existing name remains unchanged.
    merchantRefId?: string; // Optional: The new reference ID for the merchant. If not provided, the existing reference ID remains unchanged.
}
