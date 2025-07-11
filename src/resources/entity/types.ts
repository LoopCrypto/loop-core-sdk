import { NetworkIds, SettlementType } from "../common-types";

/**
 * Entity Request
 */

interface PaymentToken {
    tokenAddress?: string; // Example: 'USDC', 'ETH'
    tokenSymbol?: string; // Optional contract address for the token
}

interface PaymentTypeRequest {
    networkId: NetworkIds;
    settlementType?: SettlementType;
    payoutDestinations: string[]; // Array of wallet addresses for payments
    tokens: PaymentToken[]; // List of supported tokens
}
interface FiatSettlementSettingsRequest {
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

export interface CreateEntityRequest {
    code?: string; // One-time authentication code
    entityName: string; // Organization name
    email: string; // Primary contact email
    logoUrl?: string; // Optional logo URL
    paymentTypes: PaymentTypeRequest[]; // Supported payment configurations
    fiatSettlementSettings?: FiatSettlementSettingsRequest;
}

export interface UpdateEntityRequest {
    entityName?: string; // Optional: New organization name
    email?: string; // Optional: New email for entity communications
    logoUrl?: string; // Optional: New logo URL
}

/**
 * Entity Response
 */

interface Contract {
    networkId: number;
    contractAddress: string;
}

interface PayoutDestination {
    payoutDestinationId: string;
    networkId: number;
    settlementType: SettlementType;
    walletAddress: string;
    isDefault: boolean;
}

interface FiatSettlementAccountResponse {
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

interface PaymentType {
    symbol: string;
    networkId: NetworkIds;
    tokenId: string;
    address: string;
    decimals: number;
}

export interface EntityResponse {
    entityId: string;
    entityName: string;
    email: string;
    contracts: Contract[];
    payoutDestinations: PayoutDestination[];
    fiatSettlementAccount: FiatSettlementAccountResponse | null;
    paymentTypes: PaymentType[];
}
