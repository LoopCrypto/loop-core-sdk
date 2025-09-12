import {
    WebhooksQueryParams,
    WebhooksResponse,
    CreateWebhookRequest,
    UpdateWebhookRequest,
    WebHooksUpdateQueryParams,
    WebhookResponse,
    WebhookSecretResponse,
    CreateClassicWebhookRequest,
} from "src/resources/webhook/types";
import { Base } from "src/resources/base";

export class WebHook extends Base {
    search(queryParams?: WebhooksQueryParams): Promise<WebhooksResponse> {
        const queryString = queryParams
            ? `?${new URLSearchParams(
                  queryParams as Record<string, string>,
              ).toString()}`
            : "";
        return this.request(`/v2/webhooks${queryString}`, { method: "GET" });
    }

    searchClassic(
        queryParams?: WebhooksQueryParams,
    ): Promise<WebhooksResponse> {
        const queryString = queryParams
            ? `?${new URLSearchParams(
                  queryParams as Record<string, string>,
              ).toString()}`
            : "";
        return this.request(`/v2/webhooks/classic${queryString}`, {
            method: "GET",
        });
    }

    create(payLoad: CreateWebhookRequest): Promise<WebhooksResponse> {
        return this.request(`/v2/webhook`, { data: payLoad, method: "POST" });
    }

    createClassic(
        payLoad: CreateClassicWebhookRequest,
    ): Promise<WebhooksResponse> {
        return this.request(`/v2/webhooks/classic`, {
            data: payLoad,
            method: "POST",
        });
    }

    update(
        payLoad: UpdateWebhookRequest,
        queryParams?: WebHooksUpdateQueryParams,
    ): Promise<WebhookResponse> {
        const queryString = queryParams
            ? `?${new URLSearchParams(
                  queryParams as Record<string, string>,
              ).toString()}`
            : "";
        return this.request(`/v2/webhooks${queryString}`, {
            data: payLoad,
            method: "PATCH",
        });
    }

    delete(webhookId: string): Promise<WebhooksResponse> {
        return this.request(`/v2/webhook/${webhookId}`, { method: "DELETE" });
    }

    generateSecret(): Promise<WebhookSecretResponse> {
        return this.request(`/v2/webhook/secret`, { method: "PUT" });
    }

    getSecret(): Promise<WebhookSecretResponse> {
        return this.request(`/v2/webhook/secret`, { method: "GET" });
    }
}
