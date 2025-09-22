/**
 * Checkout Session Request
 */

import { NetworkIds, SortDirection } from "src/resources/commonTypes";

/**
 * @param active Optional filter to retrieve all active/inactive checkout sessions
 * @example active true
 * @param email Optional filter to retrieve all checkout sessions associated to an email
 * @example email "billing@loopcrypto.xyz"
 * @param externalCustomerId Optional filter to retrieve all checkout sessions associated with an external Stripe customer ID
 * @example externalCustomerId "cus_00041061050r3gg28a1c60t3gf"
 * @param externalSubscriptionId Optional filter to retrieve all checkout sessions associated with an external Stripe subscription ID
 * @example externalSubscriptionId "sub_00041061050r3gg28a1c60t3gf"
 * @param externalInvoiceId Optional filter to retrieve all checkout sessions associated with an external Stripe invoice ID
 * @example externalInvoiceId "in_00041061050r3gg28a1c60t3gf"
 * @param externalInvoiceNumber Optional filter to retrieve all checkout sessions associated with an external Stripe invoice number
 * @example externalInvoiceNumber 1234567890
 * @param expiresBefore Optional filter to retrieve all checkout sessions that expire before a given date. Date is in epoch seconds
 * @example expiresBefore 1749097136
 * @param page Optional pagination parameter to specify the page number of the results to return. Default is 1 which is the first page.
 * @example page 1
 * @param limit Optional pagination parameter to specify the number of results per page. Default is 25, maximum is 100.
 * @example limit 25
 * @param sortBy Optional sorting parameter to specify the field to sort the results by. Default is "dateCreated".
 * @example sortBy "dateCreated"
 * @param sortDir Optional sorting parameter to specify the direction to sort the results by. Valid options are "asc" and "desc". Default is "desc".
 * @example sortDir "desc"
 * @summary List checkout sessions
 */
export interface CheckoutSessionQueryParams {
    active?: boolean;
    email?: string;
    externalCustomerId?: string;
    externalSubscriptionId?: string;
    externalInvoiceId?: string;
    externalInvoiceNumber?: string;
    expiresBefore?: number;
    page?: number;
    limit?: number;
    sortBy?: "id" | "name" | "dateCreated";
    sortDir?: SortDirection;
}

export interface CreateCheckoutSessionElementRequest {
    /**
     * Stripe Price ID. Either externalPriceId or itemId must be provided.
     * @example "price_12345"
     */
    externalPriceId?: string;
    /**
     * Loop item ID. Either externalPriceId or itemId must be provided.
     * @example "12334-55322-122-123314"
     */
    itemId?: string;
}

export interface CheckoutSessionTokenRequest {
    /**
     * The blockchain network ID the payout destination is associated with.
     */
    networkId: NetworkIds;
    /**
     * A list of token symbols that identify the tokens on the blockchain network. Must match the symbol of the token contract.
     *
     * **Note: Either `tokenSymbols` or `tokenAddresses` must be provided. If both are provided, the `tokenSymbols` takes precedence.**
     * @example ["USDC", "USDT"]
     */
    tokenSymbols?: string[];
    /**
     * A list of token contract addresses that identify the tokens on the blockchain network. Must be a valid token contract address for the specified network.
     *
     * **Note: Either `tokenSymbols` or `tokenAddresses` must be provided. If both are provided, the `tokenSymbols` takes precedence.**
     * @example ["0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48", "0x1234567890123456789012345678901234567890"]
     */
    tokenAddresses?: string[];
}

export interface CreateCheckoutSessionRequest {
    /**
     * Items included in the checkout session
     */
    elements?: CreateCheckoutSessionElementRequest[];
    /**
     * Existing Stripe subscription ID. If provided, the items and quantities from the subscription will be added to the checkout session
     * @example "sub_12345"
     */
    externalSubscriptionId?: string;
    /**
     * Existing Stripe Customer ID. If provided, the new invoice or subscription will be created for this customer
     * @example "cus_12345"
     */
    externalCustomerId?: string;
    /**
     * Existing Stripe Invoice ID that is not connected to a subscription. If provided, the items and quantities from the invoice will be added to the checkout session
     * @example "in_12345"
     */
    externalInvoiceId?: string;
    /**
     * Existing Stripe Invoice Number that is not connected to a subscription. If provided, the items and quantities from the invoice will be added to the checkout session
     * @example "A1234-001"
     */
    externalInvoiceNumber?: string;
    /**
     * Number of free trial days. If provided, the Stripe subscription will be created with this trial period
     * @example 7
     */
    freeTrialDays?: number;
    /**
     * Stripe coupon code
     * @example "SUMMER2025"
     */
    couponCode?: string;
    /**
     * Customer email. If provided, the customer will not be able to change this email. If a Stripe customer does not exist, it will be created with this email.
     * @example "info@loopcrypto.xyz"
     */
    email?: string;
    /**
     * External reference ID. This will be included in all webhooks
     * @example "ref_12345"
     */
    referenceId?: string;
    /**
     * Requires payment of any finalized or draft invoice immediately during checkout. Does not apply to upcoming invoices (e.g. preview).
     * @example true
     */
    payInvoiceImmediately?: boolean;
    /**
     * Enable or disable cart on the checkout page
     * @example false
     */
    cartEnabled?: boolean;
    /**
     * Metadata info that will be included on the Agreement Created webhook
     * @example "{'customerId': '12345'}"
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    metadata?: Record<string, any>;
    /**
     * Creates a template checkout session. This session is an ever green session that can be used to create new subscriptions when the link is clicked. Default is false.
     * @example false
     */
    template?: boolean;
    /**
     * Authorization amount in cents that will be suggested to the customer. Example: $49.99 = 4999 cents
     * @example 1001
     */
    suggestedAllowanceAmount?: number;
    /**
     * Minimum authorization amount in cents that the customer must agree to. Example: $49.99 = 4999 cents
     * @example 1001
     */
    minimumAllowanceAmount?: number;
    /**
     * Minimum required balance amount in cents that the customer must have in their wallet. Example: $49.99 = 4999 cents
     * @example 1001
     */
    minimumBalanceAmount?: number;
    /**
     * Upgrade flag to upgrade the subscription with a new item
     * @example true
     */
    upgradeSubscription?: boolean;
    /**
     * Success URL. If provided, the customer will be redirected to this URL after a successful checkout.
     * If the URL does not start with http/https, it will be prefixed with https://.
     * @example "https://www.loopcrypto.xyz/success"
     */
    successUrl?: string;
    /**
     * Accepted payment tokens for the checkout session. If provided, the customer will be able to pay with these tokens. If not provided, the checkout session will accept all tokens defined at the merchant or organization level
     */
    paymentTokens?: CheckoutSessionTokenRequest[];

    /**
     * Reset billing cycle reset the subscription billing cycle to the current time.
     * @example true
     */
    resetBillingCycle?: boolean;
}

export interface UpdateCheckoutSessionRequest {
    /**
     * Flag to indicate that the checkout session is active and able to be used by a customer
     * @example false
     */
    active?: boolean;
    /**
     * Add payment tokens to the checkout session
     */
    addPaymentTokens?: CheckoutSessionTokenRequest[];
    /**
     * Remove payment tokens from the checkout session
     */
    removePaymentTokens?: CheckoutSessionTokenRequest[];
}

/**
 * Checkout Session Response
 */

export interface CheckoutSessionElementResponse {
    /**
     * Loop item ID
     * @example "12334-55322-122-123314"
     */
    itemId: string | null;
    /**
     * External Price ID
     * @example "price_12345"
     */
    externalPriceId: string | null;
}

export interface CheckoutSessionTokenResponse {
    /**
     * The network ID the token is on
     * @example 1
     */
    networkId: number;
    /**
     * The token symbol that is accepted as payment for this checkout session
     * @example "USDC"
     */
    tokenSymbol: string;
    /**
     * The token address that is accepted as payment for this checkout session
     * @example "0x2791bca1f2de4661ed88a30c99a7a9449aa84174"
     */
    tokenAddress: string;
}

export interface CheckoutSessionResponse {
    /**
     * Checkout session ID
     * This is used in the URL to retrieve the checkout session
     * @example "cs_12345"
     */
    id: string;
    /**
     * The checkout session is an active session
     * @example "true"
     */
    active: boolean;
    /**
     * Items and fees included in the checkout session
     */
    elements: CheckoutSessionElementResponse[] | null;
    /**
     * External subscription ID
     * @example "sub_12345"
     */
    externalSubscriptionId: string | null;
    /**
     * External customer ID
     * @example "cus_12345"
     */
    externalCustomerId: string | null;
    /**
     * External invoice ID
     * @example "in_12345"
     */
    externalInvoiceId: string | null;
    /**
     * External reference ID
     * @example "ref_12345"
     */
    referenceId: string | null;
    /**
     * Customer email address
     * @example "info@loopcrypto.xyz"
     */
    emailAddress: string | null;
    /**
     * Number of free trial days
     * @example 7
     */
    freeTrialDays: number | null;
    /**
     * Coupon code ID
     * @example "12345"
     */
    couponCodeId: string | null;
    /**
     * Pay invoice immediately. Do not wait for the bill date to process the invoice
     * @example true
     */
    payInvoiceImmediately: boolean;
    /**
     * Enable or disable cart on checkout page
     * @example false
     */
    cartEnabled: boolean;
    /**
     * The date the subscription will be started, expressed as a UNIX date in seconds
     * @example 1746869711
     */
    billDate: number | null;
    /**
     * Metadata info that will be included on the Agreement Created webhook
     * @example {'customerId': '12345'}
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    metadata: Record<string, any> | null;
    /**
     * Date the checkout session will expire in seconds as a UNIX date in seconds
     * @example "1746869711"
     */
    expirationDate: number | null;
    /**
     * Indicates if this session was generated from a template
     * @example true
     */
    childTemplate: boolean;
    /**
     * Suggested allowance amount in cents
     * @example 1001
     */
    suggestedAllowanceAmount: number;
    /**
     * Minimum required allowance amount in cents
     * @example 1001
     */
    minimumAllowanceAmount: number;
    /**
     * Minimum required balance amount in cents
     * @example 1001
     */
    minimumBalanceAmount: number;
    /**
     * Upgrade flag to upgrade the subscription with a new item
     * @example true
     */
    upgradeSubscription: boolean;
    /**
     * Session is a template session that is ever green and can be used to create new sessions when the link is clicked
     * @example false
     */
    template: boolean;
    /**
     * URL to redirect the customer after a successful checkout.
     * @example "https://www.loopcrypto.xyz/success"
     */
    successUrl: string | null;
    /**
     * A list of the tokens and the networks they're on that are accepted as payment for this checkout session
     */
    tokens: CheckoutSessionTokenResponse[] | null;
    /**
     * Reset billing cycle reset the subscription billing cycle to the current time.
     * @example true
     */
    resetBillingCycle: boolean;
}

export interface CheckoutSessionsResponse {
    /**
     * The total count of sessions matching the search criteria, regardless of page size or number.
     * @example 100
     */
    totalResults: number;
    /**
     * The list of checkout sessions
     */
    checkoutSessions: CheckoutSessionResponse[];
}
