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
