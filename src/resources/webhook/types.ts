import { NetworkIds, SortDirection } from "../common-types";

/**
 * Common Webhook Request
 */

export type WebhookSortBy = "postUrl" | "dateCreated";

export interface WebHooksUpdateQueryParams {
    networkIds?: string;
    events?: string;
}

export interface UpdateWebhookRequest {
    postUrl: string;
}

export interface BaseWebhooksQueryParams {
    webhookId?: string;
    networkId?: number;
    page?: number;
    limit?: number;
    sortBy?: WebhookSortBy;
    sortDir?: SortDirection;
}

export interface BaseCreateWebhookRequest {
    postUrl: string; // Required webhook URL
    networkIds?: NetworkIds[];
}

/**
 * Core Webhook Requests
 */

export type WebhookEvent =
    | "payin.created"
    | "payment.processed"
    | "payment.missed";

export interface WebhooksQueryParams extends BaseWebhooksQueryParams {
    event?: WebhookEvent;
}

export interface CreateWebhookRequest extends BaseCreateWebhookRequest {
    events?: WebhookEvent[]; // Optional strongly typed array of event types
}

/**
 * Classic Webhook Request
 */

export type ClassicWebhookEvent =
    | "AgreementSignedUp"
    | "AgreementCancelled"
    | "ScheduledAgreementCancel"
    | "TransferProcessed"
    | "TransferCreated"
    | "TransferFinalized"
    | "LatePayment";

export interface WebhooksClassicQueryParams extends BaseWebhooksQueryParams {
    event?: ClassicWebhookEvent;
}

export interface CreateClassicWebhookRequest extends BaseCreateWebhookRequest {
    /**
     * (Optional) The events to subscribe to. If not provided, all events will be subscribed to and be sent to the `postUrl`.
     *
     * Valid webhook events:
     * - `AgreementSignedUp`
     * - `AgreementCancelled`
     * - `ScheduledAgreementCancel`
     * - `TransferProcessed`
     * - `TransferCreated`
     * - `TransferFinalized`
     * - `LatePayment`
     * @example ["AgreementSignedUp"]
     */
    events?: ClassicWebhookEvent[];
}

/**
 * Webhook Response
 */

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
