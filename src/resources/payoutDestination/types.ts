import { SettlementType, SortDirection } from "src/resources/commonTypes";

/**
 * Payout Destination Request
 */

export type PayoutDestinationSortBy =
    | "merchantId"
    | "networkId"
    | "walletAddress"
    | "dateCreated";

export interface PayoutDestinationQueryParams {
    payoutDestinationId?: string;
    merchantId?: string;
    networkId?: string;
    walletAddress?: string;
    isDefault?: boolean;
    page?: number;
    limit?: number;
    sortBy?: PayoutDestinationSortBy;
    sortDir?: SortDirection;
}

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

export interface CreatePayoutDestinationRequest {
    /**
     * The identifier of the merchant that this customer will be associated with. This merchant must already exist in the system.
     * @example "67e55044-10b1-426f-9247-bb680e5fe0c8"
     */
    merchantId: string;
    /**
     * The blockchain network ID the payout destination is associated with.
     *
     * Valid values:
     * - `1` (Ethereum)
     * - `10` (Optimism)
     * - `56` (BNB)
     * - `137` (Polygon)
     * - `8453` (Base)
     * - `42220` (Celo)
     * - `42161` (Arbitrum)
     * - `900` (Solana)
     * - `11155111` (Sepolia) - Only available for demo environment
     * @isInt Must be a positive integer
     * @minimum 1 Must be a positive integer
     * @example 1
     */
    networkId: number;
    /**
     * The settlement type determines how payments will be settled. If not specified, the settlement type will default to `crypto` settlement where payments are settled in the original payment token.
     *
     * For `fiat` settlements, payments will be automatically converted to fiat currency and deposited into a bank account.
     *
     * **Note:** If the settlement type is `fiat` and this is the first time you're creating a fiat payout destination, the `settlementConfig` is required.
     *
     * Valid values:
     * - `crypto` - The payment type will be settled in crypto currency
     * - `fiat` - The payment type will be settled in fiat currency
     * @example "crypto"
     */
    settlementType?: SettlementType;
    /**
     * The configuration settings specifically for fiat settlement. This includes settings like the customer type (individual or business) and contact email address.
     *
     * **Note:** Only required if the settlement type is `fiat` and no other payout destinations for this merchant have previously been created with a fiat settlement type.
     */
    fiatSettlementSettings?: FiatSettlementSettingsRequest;
    /**
     * The blockchain wallet address where payments will be sent. Must be a valid address for the specified network.
     *
     * Note: Only required if the settlement type is `crypto`. If the settlement type is `fiat` all addresses entered here will be ignored as a wallet will automatically be created for you with the settlement provider
     * @example "0x1B3181390bfCb83A98369f660d11c6d73345f60d"
     */
    walletAddress?: string;
    /**
     * Whether the payout destination is the default for the network and merchant. If no default payout destination exists for the network, this will be set to true regardless of the value provided.
     *
     * Defaults to true.
     * @example true
     */
    isDefault: boolean;
}

export interface UpdatePayoutDestinationRequest {
    /**
     * Allows a non default payout destination to be promoted to the default payout destination. The existing default payout destination will be demoted to second place.
     *
     * **Note:** There always has to be at least 1 default payout destination so you cannot demote the current default - this is why `true` is the only valid value here.
     *
     * @example true
     */
    isDefault?: true;
}

/**
 * Payout Destination Response
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

export interface PayoutDestinationResponse {
    /**
     * The unique identifier for the payout destination
     * @example "1234567890abcdef"
     */
    payoutDestinationId: string;
    /**
     * The merchant ID associated with this payout destination
     * @example "1234567890abcdef"
     */
    merchantId: string;
    /**
     * The blockchain network ID the payout destination is associated with
     * @example 1
     */
    networkId: number;
    /**
     * The settlement type of the payout destination
     * @example "Crypto"
     */
    settlementType: SettlementType;
    /**
     * The fiat settlement settings for the payout destination if the settlement type is fiat
     */
    fiatSettlementAccount: FiatSettlementAccountResponse | null;
    /**
     * The blockchain wallet address where payments will be sent. Must be a valid address for the specified network.
     * @example "0x1234567890abcdef"
     */
    walletAddress: string;
    /**
     * Whether the payout destination is the default payout destination for the merchant.
     * @example true
     */
    isDefault: boolean;
    /**
     * Whether the payout destination is archived or not. Archived payout destination cannot be used for payments.
     * @example true
     */
    isArchived: boolean;
    /**
     * The date the payout destination record was created, represented as a Unix timestamp in seconds.
     * @example 1716211200
     */
    dateCreated: number;
}

export interface PayoutDestinationsResponse {
    totalResults: number; // The total count of payment types matching the search criteria
    paymentTypes: PayoutDestinationResponse[]; // The list of payment types grouped by merchant and network
}
