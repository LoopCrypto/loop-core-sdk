export type NetworkIds =
    | 1 // Ethereum
    | 10 // Optimism
    | 56 // BNB
    | 137 // Polygon
    | 8453 // Base
    | 42161 // Arbitrum
    | 900 // Solana (Demo environment only)
    | 11155111 // Sepolia (Demo environment only)
    | 901; // Solana Devnet (Demo environment only)

export type SortDirection = "asc" | "desc";

export type SettlementType = "Crypto" | "Fiat";
