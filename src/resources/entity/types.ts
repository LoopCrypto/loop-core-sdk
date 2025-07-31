import { NetworkIds, SettlementType } from "../common-types";
import {
    FiatSettlementAccountResponse,
    FiatSettlementSettingsRequest,
} from "../payoutDestination/types";

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
