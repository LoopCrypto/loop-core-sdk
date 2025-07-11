export interface CustomerQueryParams {
    customerId?: string;
    paymentMethodId?: string;
    merchantId?: string;
    customerRefId?: string;
    subscriptionRefId?: string;
    page?: number; // Using number instead of double in TypeScript
    limit?: number; // Using number instead of double in TypeScript
    sortBy?: "customerId" | "customerRefId" | "dateCreated";
    sortDir?: "asc" | "desc";
}

export interface CustomerResponse {
    totalResults: number; // Using number instead of double in TypeScript
    customers: CustomerType[];
}

export interface CustomerType {
    customerId: string;
    customerRefId: string | null;
    subscriptionRefId: string | null;
    merchant: Merchant;
    paymentMethods: PaymentMethod[];
    dateCreated: number;
}

interface Merchant {
    merchantId: string;
    merchantName: string;
    merchantRefId: string;
}

interface PaymentMethod {
    networkId: 1 | 10 | 56 | 137 | 8453 | 42161 | 900 | 11155111 | 901;
    paymentMethodId: string;
    paymentMethodName: string;
    walletAddress: string;
    isDefault: boolean;
    token: Token;
    preAuthorization: PreAuthorization;
}

interface Token {
    symbol: string;
    tokenId: string;
    address: string;
    decimals: number;
    exchangeRates: ExchangeRate[];
}

interface ExchangeRate {
    currency: "USD";
    price: string; // Accurate to 4 decimal places
    timestamp: number;
}

interface PreAuthorization {
    balance: string;
    authorization: string;
}

export interface CustomerRequestBody {
    merchantId: string;
    customerRefId?: string;
    subscriptionRefId?: string;
    paymentMethodId?: string;
    paymentMethod?: PaymentMethodRequest;
}

interface PaymentMethodRequest {
    networkId: 1 | 10 | 56 | 137 | 8453 | 42161 | 900 | 11155111 | 901;
    walletAddress: string;
    name: string;
    tokenAddress?: string;
    tokenSymbol?: string;
    authorizationSignature: string;
}
