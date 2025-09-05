import {
    WebhooksQueryParams,
    WebHooksResponse,
    CreateWebhookRequest,
    UpdateWebhookRequest,
    WebHooksUpdateQueryParams,
    Webhook,
    WebHookSecretResponse,
    CreateClassicWebhookRequest,
} from "src/resources/webhook/types";
import { Base } from "src/resources/base";

export class WebHook extends Base {
    search(queryParams?: WebhooksQueryParams): Promise<WebHooksResponse> {
        const queryString = queryParams
            ? `?${new URLSearchParams(
                  queryParams as Record<string, string>,
              ).toString()}`
            : "";
        return this.request(`/v2/webhooks${queryString}`, { method: "GET" });
    }

    searchClassic(
        queryParams?: WebhooksQueryParams,
    ): Promise<WebHooksResponse> {
        const queryString = queryParams
            ? `?${new URLSearchParams(
                  queryParams as Record<string, string>,
              ).toString()}`
            : "";
        return this.request(`/v2/webhooks/classic${queryString}`, {
            method: "GET",
        });
    }

    create(payLoad: CreateWebhookRequest): Promise<WebHooksResponse> {
        return this.request(`/v2/webhook`, { data: payLoad, method: "POST" });
    }

    createClassic(
        payLoad: CreateClassicWebhookRequest,
    ): Promise<WebHooksResponse> {
        return this.request(`/v2/webhooks/classic`, {
            data: payLoad,
            method: "POST",
        });
    }

    update(
        payLoad: UpdateWebhookRequest,
        queryParams?: WebHooksUpdateQueryParams,
    ): Promise<Webhook> {
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

    delete(webhookId: string): Promise<WebHooksResponse> {
        return this.request(`/v2/webhook/${webhookId}`, { method: "DELETE" });
    }

    generateSecret(): Promise<WebHookSecretResponse> {
        return this.request(`/v2/webhook/secret`, { method: "PUT" });
    }

    getSecret(): Promise<WebHookSecretResponse> {
        return this.request(`/v2/webhook/secret`, { method: "GET" });
    }
}
