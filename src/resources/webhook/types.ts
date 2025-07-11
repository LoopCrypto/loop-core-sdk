export interface SDKOptions {
    apiKey: string;
    entityId: string;
}

export type WebhookEvent =
    | "payment.processed"
    | "payin.created"
    | "payin.canceled";

export type WebhookSortBy = "postUrl" | "dateCreated";

export type WebhookSortDir = "asc" | "desc";

export interface WebHooksQueryParams {
    webhookId?: string;
    networkId?: number;
    event?: WebhookEvent;
    page?: number;
    limit?: number;
    sortBy?: WebhookSortBy;
    sortDir?: WebhookSortDir;
}

export interface Webhook {
    webhookId: string;
    networkId: number;
    event: string;
    postUrl: string;
    dateCreated: number; // Unix timestamp in seconds
}

export interface WebHooksResponse {
    totalResults: number;
    webhooks: Webhook[];
}

export interface WebHookSecretResponse {
    secret: string;
}

export interface WebHooksUpdateQueryParams {
    networkIds?: string;
    events?: string;
}

export type BlockchainNetworkId =
    | 1 // Ethereum
    | 10 // Optimism
    | 56 // BNB
    | 137 // Polygon
    | 8453 // Base
    | 42161 // Arbitrum
    | 900 // Solana (Demo environment only)
    | 11155111 // Sepolia (Demo environment only)
    | 901; // Solana Devnet (Demo environment only)

export type WebhookCreateEvent = "payin.created" | "payment.processed";

export interface WebHookPayload {
    postUrl: string; // Required webhook URL
    networkIds?: BlockchainNetworkId[]; // Optional strongly typed array of blockchain network IDs
    events?: WebhookCreateEvent[]; // Optional strongly typed array of event types
}

export interface UpdateWebHookPayload {
    postUrl: string;
}
