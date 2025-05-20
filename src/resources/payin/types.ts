type PayinAmountType = "fiat" | "token";

export interface PayinQueryParams {
  paymentMethodId?: string;
  fromWallet?: string;
  networkId?: string;
  merchantId?: string;
  customerId?: string;
  customerRefId?: string;
  page?: number; // Default is 1
  limit?: number; // Default is 25, max is 100
  sortBy?: string; // Default is "dateCreated"
  sortDir?: "asc" | "desc"; // Default is "desc"
}


export interface PayinResponse {
  totalResults: number;
  payins: PayinType[];
}

export interface PayinType {
    payinId: string;
    merchantId: string;
    amount: string;
    amountType: PayinAmountType;
    billDate: number;
    invoiceId: string;
    description?: string | null;
    externalInvoiceRef?: string | null;
    payinType: "subscription" | "invoice";
    payinStatus:
        | "scheduled"
        | "pending"
        | "completed"
        | "failed"
        | "canceled"
        | "uncollectible"
        | "draft";
    transaction?: Transaction | null;
    paymentMethod: PaymentMethod;
    payoutDestination: PayoutDestination;
    dateCreated: number;
}

export interface Transaction {
  transactionId: string;
  transactionUrl: string;
  amountTransferred?: string | null;
  exchangeRate?: ExchangeRate | null;
}

export interface ExchangeRate {
  currency: "USD";
  price: string;
  timestamp: number;
}

export interface PaymentMethod {
  networkId: number;
  paymentMethodId: string;
  paymentMethodName: string;
  walletAddress: string;
  isDefault: boolean;
  token: Token;
  preAuthorization: PreAuthorization;
  status: "ok" | "insufficient_balance" | "insufficient_authorization" | "insufficient_balance_authorization";
}

export interface Token {
  symbol: string;
  tokenId: string;
  address: string;
  decimals: number;
  exchangeRates: ExchangeRate[];
}

export interface PreAuthorization {
  balance: string;
  authorization: string;
}

export interface PayoutDestination {
  networkId: number;
  walletAddress: string;
  payoutDestinationId: string;
}

export interface PayinBodyParams {
    merchantId: string; // The identifier of the merchant that this payin will be associated with
    amount: string; // Payment amount in cents (for fiat) or including decimal places (for tokens)
    amountType: PayinAmountType; // Type of the amount ("fiat" or "token")
    billDate: number; // The date the payment should take place, represented as a Unix timestamp
    payoutDestinationId?: string; // The payout destination for the funds, optional
    customerId?: string; // The ID of the customer to charge for this payin (optional, or paymentMethodId must be provided)
    paymentMethodId?: string; // The ID of the customer's payment method to use for this payin (optional, or customerId must be provided)
    invoiceRefId?: string; // An invoice reference ID used to tie this payin to an external system (optional)
    description?: string; // A description or note for the payin, up to 500 characters (optional)
}

export interface UpdatePayinBodyParams {
    status?: string;
    amount?: string;
    amountType?: PayinAmountType;
    billDate?: number;
    paymentMethodId?: string;
    externalInvoiceRef?: string;
    description?: string;
}
