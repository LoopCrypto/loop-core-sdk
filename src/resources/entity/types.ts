import { NetworkIds, SettlementType } from "src/resources/commonTypes";
import {
    FiatSettlementAccountResponse,
    FiatSettlementSettingsRequest,
} from "src/resources/payoutDestination/types";

/**
 * Entity Request
 */

export interface PaymentToken {
    tokenAddress?: string; // Contract address for the token
    tokenSymbol?: string; // Token symbol (e.g., 'USDC', 'ETH')
    isDefault?: boolean; // Whether this token should be set as default
}

export interface PaymentTypeRequest {
    networkId: NetworkIds;
    settlementType?: SettlementType;
    payoutDestinations: string[]; // Array of wallet addresses for payments
    tokens: PaymentToken[]; // List of supported tokens
}

export interface CreateEntityRequest {
    code?: number; // One-time authentication code (number)
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

export interface Contract {
    networkId: number;
    contractAddress: string;
}

export interface PayoutDestination {
    payoutDestinationId: string;
    networkId: number;
    settlementType: SettlementType;
    walletAddress: string;
    isDefault: boolean;
}

export interface PaymentType {
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
