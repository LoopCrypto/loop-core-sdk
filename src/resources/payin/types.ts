import { TokenExchangeRateResponse } from "src/resources/token/types";
import { PaymentMethodResponse, PayoutDestinationResponse } from "../..";
import { SortDirection } from "../common-types";

/**
 * Payin Common
 */

type AmountType = "fiat" | "token";

/**
 * Payin Request
 */
export interface PayinQueryParams {
    paymentMethodId?: string;
    fromWallet?: string;
    networkId?: string;
    merchantId?: string;
    customerId?: string;
    customerRefId?: string;
    status?: string;
    page?: number; // Default is 1
    limit?: number; // Default is 25, max is 100
    sortBy?: string; // Default is "dateCreated"
    sortDir?: SortDirection;
}

export interface CreatePayinRequest {
    merchantId: string; // The identifier of the merchant that this payin will be associated with
    amount: string; // Payment amount in cents (for fiat) or including decimal places (for tokens)
    amountType: AmountType; // Type of the amount ("fiat" or "token")
    billDate: number; // The date the payment should take place, represented as a Unix timestamp
    payoutDestinationId?: string; // The payout destination for the funds, optional
    customerId?: string; // The ID of the customer to charge for this payin (optional, or paymentMethodId must be provided)
    paymentMethodId?: string; // The ID of the customer's payment method to use for this payin (optional, or customerId must be provided)
    subscriptionRefId?: string; // An external subscription reference ID used to tie this payin to a subscription in an external system.
    invoiceRefId?: string; // An invoice reference ID used to tie this payin to an external system (optional)
    description?: string; // A description or note for the payin, up to 500 characters (optional)
}

export interface UpdatePayinRequest {
    status?: "scheduled" | "canceled";
    amount?: string; // Payment amount in cents (for fiat) or including decimal places (for tokens)
    amountType?: AmountType; // Type of the amount ("fiat" or "token")
    billDate: number; // The date the payment should take place, represented as a Unix timestamp
    paymentMethodId?: string; // The ID of the customer's payment method to use for this payin (optional, or customerId must be provided)
    externalInvoiceRef?: string; //  An invoice reference ID used to tie this payin to an invoice in an external system.
    description?: string; // A description or note for the payin, up to 500 characters (optional)
}

/**
 * Payin Response
 */

export interface PayinPaymentMethodResponse
    extends Omit<PaymentMethodResponse, "merchantId" | "dateCreated"> {
    status:
        | "ok"
        | "insufficient_balance"
        | "insufficient_authorization"
        | "insufficient_balance_authorization";
}

export interface PreAuthorization {
    balance: string;
    authorization: string;
}

export interface PayinTransactionResponse {
    transactionId: string;
    transactionUrl: string;
    amountTransferred: string | null;
    exchangeRate: TokenExchangeRateResponse | null;
}

export interface PayinResponse {
    payinId: string;
    merchantId: string;
    amount: string;
    amountType: AmountType;
    billDate: number;
    invoiceId: string;
    description: string | null;
    externalInvoiceRef: string | null;
    payinType: "subscription" | "invoice";
    payinStatus:
        | "scheduled"
        | "pending"
        | "completed"
        | "failed"
        | "canceled"
        | "uncollectible"
        | "draft";
    transaction: PayinTransactionResponse | null;
    paymentMethod: PayinPaymentMethodResponse;
    payoutDestination: Omit<
        PayoutDestinationResponse,
        | "merchantId"
        | "fiatSettlementAccount"
        | "isDefault"
        | "isArchived"
        | "dateCreated"
    >;
    dateCreated: number;
}

export interface PayinsResponse {
    totalResults: number;
    payins: PayinResponse[];
}
