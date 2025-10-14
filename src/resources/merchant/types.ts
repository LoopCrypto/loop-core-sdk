import { SortDirection } from "src/resources/commonTypes";
import {
    PaymentTypeRequest,
    PaymentTypeResponse,
} from "src/resources/paymentType/types";
import {
    FiatSettlementAccountResponse,
    FiatSettlementSettingsRequest,
    PayoutDestinationResponse,
} from "src/resources/payoutDestination/types";

/**
 * Merchant Request
 */

export interface CreateMerchantRequest {
    merchantName: string; // The name that identifies the merchant
    merchantEmail?: string;
    merchantRefId?: string; // A unique reference ID used to identify the merchant in external systems
    paymentTypes?: PaymentTypeRequest[]; // Configuration specifying payment networks and tokens the merchant will accept
    fiatSettlementSettings?: FiatSettlementSettingsRequest;
}

export interface MerchantQueryParams {
    merchantId?: string;
    merchantName?: string;
    merchantRefId?: string;
    page?: number; // Using number instead of double since TypeScript uses number for all numeric values
    limit?: number;
    sortBy?: "dateCreated" | "merchantId" | "merchantName" | "merchantRefId";
    sortDir?: SortDirection;
}

export interface UpdateMerchantRequest {
    merchantName?: string; // Optional: The new name for the merchant. If not provided, the existing name remains unchanged.
    merchantRefId?: string; // Optional: The new reference ID for the merchant. If not provided, the existing reference ID remains unchanged.
}

/**
 * Merchant Response
 */

export interface MerchantResponse {
    merchantId: string; // The unique identifier for the merchant
    merchantName: string; // The name that identifies the merchant
    merchantRefId: string | null; // The unique reference ID used to identify the merchant in external systems
    payoutDestinations: PayoutDestinationResponse[]; // The payout destinations supported by the organization
    fiatSettlementAccount: FiatSettlementAccountResponse | null;
    paymentTypes: PaymentTypeResponse[]; // The payment types supported by the merchant
}

export interface MerchantsResponse {
    totalResults: number; // Total count of payment methods matching the search criteria
    merchants: MerchantResponse[]; // List of payment methods grouped by merchant and network
}
