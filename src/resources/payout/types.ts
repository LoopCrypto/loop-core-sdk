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
