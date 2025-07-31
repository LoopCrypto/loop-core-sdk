import { WebHook } from "src/resources/webhook";
import {
    CreateWebhookRequest,
    UpdateWebhookRequest,
    Webhook,
    WebHookSecretResponse,
    WebhooksQueryParams,
    WebHooksResponse,
    WebHooksUpdateQueryParams,
} from "src/resources/webhook/types";

describe("WebHook API", () => {
    let webhookApi: WebHook;
    let requestMock: jest.Mock;

    beforeEach(() => {
        webhookApi = new WebHook({ entityId: "test", apiKey: "secret" });
        requestMock = jest.fn() as jest.Mock;
        (webhookApi as unknown as { request: jest.Mock }).request = requestMock;
    });

    test("should fetch webhooks without query parameters", async () => {
        const mockResponse: WebHooksResponse = {
            totalResults: 1,
            webhooks: [
                {
                    webhookId: "webhook-123",
                    networkId: 137,
                    event: "payment.processed",
                    postUrl: "https://example.com/webhook",
                    dateCreated: 1700000000,
                },
            ],
        };

        requestMock.mockResolvedValue(mockResponse);

        const result = await webhookApi.search();
        expect(requestMock).toHaveBeenCalledWith("webhooks", { method: "GET" });
        expect(result).toEqual(mockResponse);
    });

    test("should fetch webhooks with query parameters", async () => {
        const queryParams: WebhooksQueryParams = { page: 1, limit: 10 };
        const mockResponse: WebHooksResponse = {
            totalResults: 1,
            webhooks: [
                {
                    webhookId: "webhook-123",
                    networkId: 137,
                    event: "payment.processed",
                    postUrl: "https://example.com/webhook",
                    dateCreated: 1700000000,
                },
            ],
        };

        requestMock.mockResolvedValue(mockResponse);

        const result = await webhookApi.search(queryParams);
        expect(requestMock).toHaveBeenCalledWith("webhooks?page=1&limit=10", {
            method: "GET",
        });
        expect(result).toEqual(mockResponse);
    });

    test("should create a new webhook", async () => {
        const requestBody: CreateWebhookRequest = {
            postUrl: "https://example.com/webhook",
            networkIds: [137],
            events: ["payment.processed"],
        };

        const mockResponse: WebHooksResponse = {
            totalResults: 1,
            webhooks: [
                {
                    webhookId: "webhook-456",
                    networkId: 137,
                    event: "payment.processed",
                    postUrl: "https://example.com/webhook",
                    dateCreated: 1700000000,
                },
            ],
        };

        requestMock.mockResolvedValue(mockResponse);

        const result = await webhookApi.create(requestBody);
        expect(requestMock).toHaveBeenCalledWith("webhook", {
            data: requestBody,
            method: "POST",
        });
        expect(result).toEqual(mockResponse);
    });

    test("should update an existing webhook", async () => {
        const requestBody: UpdateWebhookRequest = {
            postUrl: "https://new-webhook-url.com",
        };

        const queryParams: WebHooksUpdateQueryParams = {
            networkIds: "137",
            events: "payment.processed",
        };

        const mockResponse: Webhook = {
            webhookId: "webhook-123",
            networkId: 137,
            event: "payment.processed",
            postUrl: "https://new-webhook-url.com",
            dateCreated: 1700000000,
        };

        requestMock.mockResolvedValue(mockResponse);

        const result = await webhookApi.update(requestBody, queryParams);
        expect(requestMock).toHaveBeenCalledWith(
            "webhooks?networkIds=137&events=payment.processed",
            {
                data: requestBody,
                method: "PATCH",
            },
        );
        expect(result).toEqual(mockResponse);
    });

    test("should delete a webhook", async () => {
        const webhookId = "webhook-123";
        const mockResponse: WebHooksResponse = {
            totalResults: 0,
            webhooks: [],
        };

        requestMock.mockResolvedValue(mockResponse);

        const result = await webhookApi.delete(webhookId);
        expect(requestMock).toHaveBeenCalledWith(`webhook/${webhookId}`, {
            method: "DELETE",
        });
        expect(result).toEqual(mockResponse);
    });

    test("should generate a new webhook secret", async () => {
        const mockResponse: WebHookSecretResponse = {
            secret: "new-secret-key",
        };

        requestMock.mockResolvedValue(mockResponse);

        const result = await webhookApi.generateSecret();
        expect(requestMock).toHaveBeenCalledWith("webhook/secret", {
            method: "PUT",
        });
        expect(result).toEqual(mockResponse);
    });

    test("should retrieve the webhook secret", async () => {
        const mockResponse: WebHookSecretResponse = {
            secret: "current-secret-key",
        };

        requestMock.mockResolvedValue(mockResponse);

        const result = await webhookApi.getSecret();
        expect(requestMock).toHaveBeenCalledWith("webhook/secret", {
            method: "GET",
        });
        expect(result).toEqual(mockResponse);
    });

    test("should handle errors from request method", async () => {
        const errorMessage = "Request failed";
        requestMock.mockRejectedValue(new Error(errorMessage));

        await expect(webhookApi.search()).rejects.toThrow(errorMessage);
        expect(requestMock).toHaveBeenCalledWith("webhooks", { method: "GET" });
    });
});
