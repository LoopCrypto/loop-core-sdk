import {
    WebhooksQueryParams,
    WebHooksResponse,
    CreateWebhookRequest,
    UpdateWebhookRequest,
    WebHooksUpdateQueryParams,
    Webhook,
    WebHookSecretResponse,
    CreateClassicWebhookRequest,
} from "./types";
import { Base } from "../base";

export class WebHook extends Base {
    search(queryParams?: WebhooksQueryParams): Promise<WebHooksResponse> {
        const queryString = queryParams
            ? `?${new URLSearchParams(
                  queryParams as Record<string, string>,
              ).toString()}`
            : "";
        return this.request(`webhooks${queryString}`, { method: "GET" });
    }

    searchClassic(
        queryParams?: WebhooksQueryParams,
    ): Promise<WebHooksResponse> {
        const queryString = queryParams
            ? `?${new URLSearchParams(
                  queryParams as Record<string, string>,
              ).toString()}`
            : "";
        return this.request(`webhooks/classic${queryString}`, {
            method: "GET",
        });
    }

    create(payLoad: CreateWebhookRequest): Promise<WebHooksResponse> {
        return this.request(`webhook`, { data: payLoad, method: "POST" });
    }

    createClassic(
        payLoad: CreateClassicWebhookRequest,
    ): Promise<WebHooksResponse> {
        return this.request(`webhooks/classic`, {
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
        return this.request(`webhooks${queryString}`, {
            data: payLoad,
            method: "PATCH",
        });
    }

    delete(webhookId: string): Promise<WebHooksResponse> {
        return this.request(`webhook/${webhookId}`, { method: "DELETE" });
    }

    generateSecret(): Promise<WebHookSecretResponse> {
        return this.request(`webhook/secret`, { method: "PUT" });
    }

    getSecret(): Promise<WebHookSecretResponse> {
        return this.request(`webhook/secret`, { method: "GET" });
    }
}
