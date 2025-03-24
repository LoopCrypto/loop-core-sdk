export type SortByFields =
  | "paymentMethodId"
  | "paymentMethodName"
  | "networkId"
  | "walletAddress"
  | "dateCreated";

export type SortDirection = "asc" | "desc";

export interface PaymentMethodQueryParams {
  merchantId?: string; // Optional filter for a specific merchant
  paymentMethodId?: string; // Optional filter for a specific payment method ID
  paymentMethodName?: string; // Optional filter for a specific payment method name
  networkId?: number; // Optional filter for a specific network
  walletAddress?: string; // Optional filter for a specific wallet address
  tokenAddress?: string; // Optional filter for a specific token address
  tokenSymbol?: string; // Optional filter for a specific token symbol
  isDefault?: boolean; // Optional filter for default payment methods
  page?: number; // Pagination parameter, default is 1
  limit?: number; // Pagination limit, default is 25, max is 100
  sortBy?: SortByFields; // Sorting field, default is "dateCreated"
  sortDir?: SortDirection; // Sorting direction, default is "desc"
}


export interface ExchangeRate {
  currency: "USD"; // Only "USD" is supported
  price: string; // Price of the token in USD, accurate to 4 decimal places (e.g., "1.9900" for $1.99)
  timestamp: number; // Unix timestamp (in seconds) when this exchange rate was last updated
}

export interface PreAuthorization {
  balance: string; // Balance of the payment method in token amount
  authorization: string; // Authorization amount of the payment method in token amount
}

export interface Token {
  symbol: string; // Token symbol identifying the token on the blockchain
  tokenId: string; // Unique identifier for the token used by the payment type
  address: string; // Token contract address for the payment type
  decimals: number; // Number of decimal places used to represent token amounts
  exchangeRates: ExchangeRate[]; // List of exchange rates for the token
}

export interface PaymentMethodType {
  paymentMethodId: string; // Unique identifier for the payment method
  merchantId: string; // Unique identifier of the associated merchant
  paymentMethodName: string; // Name of the payment method
  networkId: number; // Blockchain network ID associated with the payment method
  walletAddress: string; // Blockchain wallet address where payments will be sent from
  isDefault: boolean; // Indicates if this is the default payment method for the wallet address
  token: Token; // Token associated with the payment method
  preAuthorization: PreAuthorization | null; // Wallet balance and authorization status
  dateCreated: number; // Unix timestamp in seconds indicating when the payment method was created
}

export interface PaymentMethodResponse {
  totalResults: number; // Total count of payment methods matching the search criteria
  paymentMethods: PaymentMethodType[]; // List of payment methods grouped by merchant and network
}

export interface CreatePaymentMethodRequest {
  name: string; // Descriptive name for the payment method
  customerId: string; // ID of the customer associated with this payment method (not customerRefId)
  networkId: 1 | 10 | 56 | 137 | 8453 | 42161 | 900 | 11155111 | 901; // Blockchain network ID
  walletAddress: string; // Valid blockchain wallet address for the specified network
  tokenAddress?: string; // Token contract address (required if tokenSymbol is not provided)
  tokenSymbol?: string; // Token symbol (required if tokenAddress is not provided)
  // Note: Either tokenAddress or tokenSymbol must be provided. If both are provided, the tokenAddress takes precedence.
  isDefault?: boolean; // Indicates if this is the default payment method (default: false)
  authorizationSignature: string; // Base64 encoded JWT token proving ownership of the wallet address
}

