import { WebHook } from "src/resources/webhook";
import {
    CreateWebhookRequest,
    UpdateWebhookRequest,
    Webhook,
    WebHookSecretResponse,
    WebhooksQueryParams,
    WebHooksResponse,
} from "src/resources/webhook/types";

describe("WebHook", () => {
    let webhookInstance: WebHook;
    const createdWebhookIds: string[] = [];
    let testWebhookUrl: string;

    const parentApiKey = process.env.PARENT_API_KEY || "";
    const parentEntityId = process.env.PARENT_ENTITY_ID || "";

    beforeAll(async () => {
        webhookInstance = new WebHook({
            apiKey: parentApiKey,
            entityId: parentEntityId,
        });

        // Create a test webhook URL with random number to avoid conflicts
        const randomSuffix = Math.floor(Math.random() * 10000);
        testWebhookUrl = `https://example.com/webhook-test-${randomSuffix}`;
    });

    afterAll(async () => {
        // Clean up created webhooks
        for (const webhookId of createdWebhookIds) {
            try {
                await webhookInstance.delete(webhookId);
            } catch (error) {
                console.log(`Failed to delete webhook ${webhookId}:`, error);
            }
        }
    });

    test("should create a new webhook", async () => {
        const createPayload: CreateWebhookRequest = {
            postUrl: testWebhookUrl,
            networkIds: [137], // Polygon network
            events: ["payment.processed"],
        };

        const expectedResponse: WebHooksResponse = {
            totalResults: expect.any(Number),
            webhooks: expect.arrayContaining([
                expect.objectContaining({
                    webhookId: expect.any(String),
                    networkId: 137,
                    event: "payment.processed",
                    postUrl: testWebhookUrl,
                    dateCreated: expect.any(Number),
                }),
            ]),
        };

        const response = await webhookInstance.create(createPayload);

        expect(response).toEqual(expectedResponse);

        // Store the created webhook ID for cleanup
        if (response.webhooks.length > 0) {
            createdWebhookIds.push(response.webhooks[0].webhookId);
        }
    });

    test("should fetch webhooks with query params", async () => {
        const expectedResponse: WebHooksResponse = {
            totalResults: expect.any(Number),
            webhooks: expect.arrayContaining([
                expect.objectContaining({
                    webhookId: expect.any(String),
                    networkId: 137,
                    event: "payment.processed",
                    postUrl: testWebhookUrl,
                    dateCreated: expect.any(Number),
                }),
            ]),
        };

        const response = await webhookInstance.search({
            event: "payment.processed",
            networkId: 137,
        });

        expect(response).toEqual(expectedResponse);
    });

    test("should create another webhook for testing updates", async () => {
        const createPayload: CreateWebhookRequest = {
            postUrl: `${testWebhookUrl}-update`,
            networkIds: [1], // Ethereum mainnet
            events: ["payin.created"],
        };

        const expectedResponse: WebHooksResponse = {
            totalResults: expect.any(Number),
            webhooks: expect.arrayContaining([
                expect.objectContaining({
                    webhookId: expect.any(String),
                    networkId: 1,
                    event: "payin.created",
                    postUrl: `${testWebhookUrl}-update`,
                    dateCreated: expect.any(Number),
                }),
            ]),
        };

        const response = await webhookInstance.create(createPayload);

        expect(response).toEqual(expectedResponse);

        // Store the created webhook ID for cleanup
        if (response.webhooks.length > 0) {
            createdWebhookIds.push(response.webhooks[0].webhookId);
        }
    });

    test("should update an existing webhook", async () => {
        // First, let's get the webhook ID by searching for it
        const searchResponse = await webhookInstance.search({
            event: "payin.created",
            networkId: 1,
        });

        // Assuming the webhook exists and we get at least one result
        expect(searchResponse.totalResults).toBeGreaterThan(0);
        expect(searchResponse.webhooks.length).toBeGreaterThan(0);

        const webhookId = searchResponse.webhooks[0].webhookId;
        const newWebhookUrl = `${testWebhookUrl}-updated`;

        // Update the webhook with a new URL
        const updatePayload: UpdateWebhookRequest = {
            postUrl: newWebhookUrl,
        };

        const queryParams = {
            networkIds: "1",
            events: "payin.created",
        };

        const expectedResponse: Webhook = {
            webhookId: webhookId,
            networkId: 1,
            event: "payin.created",
            postUrl: newWebhookUrl,
            dateCreated: expect.any(Number),
        };

        const response = await webhookInstance.update(
            updatePayload,
            queryParams,
        );

        expect(response).toEqual(expectedResponse);
    });

    test("should get webhook secret", async () => {
        const expectedResponse: WebHookSecretResponse = {
            secret: expect.any(String),
        };

        const response = await webhookInstance.getSecret();

        expect(response).toEqual(expectedResponse);
        expect(response.secret).toBeTruthy();
    });

    test("should generate a new webhook secret", async () => {
        const expectedResponse: WebHookSecretResponse = {
            secret: expect.any(String),
        };

        const response = await webhookInstance.generateSecret();

        expect(response).toEqual(expectedResponse);
        expect(response.secret).toBeTruthy();
    });

    test("should delete a webhook", async () => {
        // First, let's get the webhook ID by searching for it
        const searchResponse = await webhookInstance.search({
            event: "payin.created",
            networkId: 1,
        });

        // Assuming the webhook exists and we get at least one result
        expect(searchResponse.totalResults).toBeGreaterThan(0);
        expect(searchResponse.webhooks.length).toBeGreaterThan(0);

        const webhookId = searchResponse.webhooks[0].webhookId;

        const deleteResponse = await webhookInstance.delete(webhookId);

        expect(deleteResponse).toEqual({
            totalResults: expect.any(Number),
            webhooks: expect.any(Array),
        });

        // Remove from cleanup list since we already deleted it
        const index = createdWebhookIds.indexOf(webhookId);
        if (index > -1) {
            createdWebhookIds.splice(index, 1);
        }
    });

    test("should handle classic webhook operations", async () => {
        const createPayload = {
            postUrl: `${testWebhookUrl}-classic`,
            networkIds: [137],
            events: ["TransferProcessed"],
        };

        const expectedResponse: WebHooksResponse = {
            totalResults: expect.any(Number),
            webhooks: expect.arrayContaining([
                expect.objectContaining({
                    webhookId: expect.any(String),
                    networkId: 137,
                    event: "TransferProcessed",
                    postUrl: `${testWebhookUrl}-classic`,
                    dateCreated: expect.any(Number),
                }),
            ]),
        };

        const response = await webhookInstance.createClassic(createPayload);

        expect(response).toEqual(expectedResponse);

        // Store the created webhook ID for cleanup
        if (response.webhooks.length > 0) {
            createdWebhookIds.push(response.webhooks[0].webhookId);
        }

        // Test classic webhook search
        const searchResponse = await webhookInstance.searchClassic({
            event: "TransferProcessed",
            networkId: 137,
        });

        expect(searchResponse).toEqual(expectedResponse);
    });
});
