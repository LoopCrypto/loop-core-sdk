export interface PayoutPayload {
    isDefault: boolean;
    merchantId: string;
    networkId: number;
    walletAddress: string;
}

export interface PayoutDestinationListResponse {
    totalResults: number; // The total count of payment types matching the search criteria
    paymentTypes: PayoutDestinationResponse[]; // The list of payment types grouped by merchant and network
}

export interface PayoutDestinationResponse {
    payoutDestinationId: string;
    merchantId: string;
    networkId: number;
    walletAddress: string;
    isDefault: boolean;
    dateCreated: number; // Unix timestamp
}

export type PayoutSortBy =
    | "merchantId"
    | "walletAddress"
    | "networkId"
    | "dateCreated";

export type PayoutSortDir = "asc" | "desc";

export interface PayoutQueryParams {
    payoutDestinationId?: string;
    merchantId?: string;
    networkId?: string;
    walletAddress?: string;
    isDefault?: boolean;
    page?: number;
    limit?: number;
    sortBy?: PayoutSortBy;
    sortDir?: PayoutSortDir;
}

/**
 * Payout Request
 */

export interface FiatSettlementSettingsRequest {
    /**
     * Specifies the type of customer account that will be created. This determines whether the account will be treated as an individual person or a business entity for KYC, compliance, and settlement purposes. Individual accounts are for personal use while business accounts are for commercial or organizational use.
     *
     * Valid values:
     * - `Individual` - The payout destination is associated with an individual
     * - `Business` - The payout destination is associated with a business
     * @example "Individual"
     */
    customerType?: "Individual" | "Business";
    /**
     * The customer's first name. Required for individual accounts when settlement type is fiat.
     * @example "John"
     */
    firstName?: string;
    /**
     * The customer's last name. Required for individual accounts when settlement type is fiat.
     * @example "Smith"
     */
    lastName?: string;
    /**
     * The customer's email address. Required for individual and business accounts when settlement type is fiat. For individuals, this should be their legal email address. For businesses, this should be the email address of the primary account holder or authorized representative.
     *
     * Defaults to the merchant's email address if not provided.
     *
     * @example "john.smith@loopcrypto.xyz"
     */
    email?: string;
}

/**
 * Payout Response
 */

export interface FiatSettlementAccountResponse {
    /**
     * The provider of the fiat settlement services.
     * @example "Fern"
     */
    provider: string;
    /**
     * The KYC status of the payout destination
     * @example "pending"
     */
    kycStatus: "Pending" | "Approved" | "Rejected";
    /**
     * The link to the KYC document for the payout destination
     * @example "https://www.google.com"
     */
    kycLink: string | null;
    /**
     * The status of the bank account for this payout destination
     * @example "Pending"
     */
    bankAccountStatus: "Pending" | "Active" | "Inactive";
    /**
     * The link to add a bank account to your account
     *
     * **Note:** This is an external link to the bank account form. You will need to redirect the user to this link to complete the bank account form.
     * @example "https://www.google.com"
     */
    bankAccountFormLink: string | null;
}
