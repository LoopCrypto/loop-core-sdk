interface Contract {
  networkId: number;
  contractAddress: string;
}

interface PayoutDestination {
  networkId: number;
  walletAddress: string;
  isDefault: boolean;
  payoutDestinationId: string;
}

interface PaymentType {
  symbol: string;
  networkId: number;
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
  paymentTypes: PaymentType[];
}

interface PaymentToken {
  tokenAddress?: string; // Example: 'USDC', 'ETH'
  tokenSymbol?: string; // Optional contract address for the token
}

interface PaymentTypeA {
  networkId: 1 | 10 | 56 | 137 | 8453 | 42161 | 900 | 11155111 | 901; // Blockchain network ID
  payoutDestinations: string[]; // Array of wallet addresses for payments
  tokens: PaymentToken[]; // List of supported tokens
}

export interface EntityCreationRequest {
  code: string; // One-time authentication code
  entityName: string; // Organization name
  email: string; // Primary contact email
  logoUrl?: string; // Optional logo URL
  paymentTypes: PaymentTypeA[]; // Supported payment configurations
}

export interface EntityUpdateRequest {
  entityName?: string; // Optional: New organization name
  email?: string; // Optional: New email for entity communications
  logoUrl?: string; // Optional: New logo URL
}

