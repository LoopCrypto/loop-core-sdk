import { NetworkIds, SortDir } from "../common-types";

/**
 * Customer Request
 */

export interface CustomerQueryParams {
    customerId?: string;
    paymentMethodId?: string;
    merchantId?: string;
    customerRefId?: string;
    subscriptionRefId?: string;
    page?: number;
    limit?: number;
    sortBy?: "customerId" | "customerRefId" | "dateCreated";
    sortDir?: SortDir;
}

export interface CreatePaymentMethodRequest {
    name: string;
    networkId: NetworkIds;
    walletAddress: string;
    tokenAddress?: string;
    tokenSymbol?: string;
    isDefault?: boolean;
    authorizationSignature: string;
}
export interface CreateCustomerRequest {
    merchantId: string;
    customerRefId?: string;
    subscriptionRefId?: string;
    paymentMethod?: CreatePaymentMethodRequest;
}

/**
 * Customer Response
 */

export interface MerchantCustomerRef {
    /**
     * The unique identifier that represents the merchant
     * @example "67e55044-10b1-426f-9247-bb680e5fe0c8"
     */
    merchantId: string;
    /**
     * The external customer reference ID used to tie this customer to a customer in an external system.
     * @example "cus_1234abcd"
     */
    customerRefId: string | null;
}

interface TokenExchangeRateResponse {
    currency: string;
    price: string; // Accurate to 4 decimal places
    provider: string;
    timestamp: number;
}

interface Token {
    tokenId: string;
    symbol: string;
    address: string;
    decimals: number;
    exchangeRates: TokenExchangeRateResponse[];
}

interface PreAuthorization {
    balance: string;
    authorization: string;
}

interface PaymentMethodResponse {
    paymentMethodId: string;
    merchantId: string;
    paymentMethodName: string;
    active: boolean;
    networkId: NetworkIds;
    walletAddress: string;
    isDefault: boolean;
    token: Token;
    preAuthorization: PreAuthorization;
}

export interface MerchantCustomerResponse {
    customerId: string;
    customerRefIds: MerchantCustomerRef[];
    paymentMethods: PaymentMethodResponse[];
    dateCreated: number;
}

export interface MerchantCustomersResponse {
    totalResults: number;
    customers: MerchantCustomerResponse[];
}
