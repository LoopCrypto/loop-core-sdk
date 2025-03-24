export type TokenSortBy =
  | "tokenId"
  | "networkId"
  | "symbol"
  | "address"
  | "decimals";

export type TokenDir = "asc" | "desc";

export interface TokenQueryParams {
  networkId?: string;
  tokenAddress?: string;
  tokenSymbol?: string;
  page?: number;
  limit?: number;
  sortBy?: TokenSortBy;
  sortDir?: TokenDir;
}

export interface Token {
  tokenId: string; // The unique identifier for the token used by the payment type
  networkId: number; // The blockchain network ID the token is associated with
  symbol: string; // The token symbol that identifies the token on the blockchain network
  address: string; // The token contract address for the payment type
  decimals: number; // The number of decimal places used to represent token amounts
}

export interface TokenResponse {
  totalResults: number;
  tokens: Token[];
}
