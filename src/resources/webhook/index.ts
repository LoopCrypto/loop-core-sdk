import {
    WebHooksQueryParams,
    WebHooksResponse,
    WebHookPayload,
    UpdateWebHookPayload,
    WebHooksUpdateQueryParams,
    Webhook,
    WebHookSecretResponse,
} from "./types.ts";
import { Base } from "../base.ts";

export class WebHook extends Base {
    search(queryParams?: WebHooksQueryParams): Promise<WebHooksResponse> {
        const queryString = queryParams
            ? `?${new URLSearchParams(
                  queryParams as Record<string, string>,
              ).toString()}`
            : "";
        return this.request(`webhooks${queryString}`, { method: "GET" });
    }

    create(payLoad: WebHookPayload): Promise<WebHooksResponse> {
        return this.request(`webhook`, { data: payLoad, method: "POST" });
    }

    update(
        payLoad: UpdateWebHookPayload,
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
