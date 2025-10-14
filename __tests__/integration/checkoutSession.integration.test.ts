import { CheckoutSession } from "src/resources/stripe/checkoutSession";
import {
    CheckoutSessionQueryParams,
    CreateCheckoutSessionRequest,
    UpdateCheckoutSessionRequest,
} from "src/resources/stripe/checkoutSession/types";

describe("CheckoutSession Integration", () => {
    let checkoutSessionInstance: CheckoutSession;
    const createdCheckoutSessionIds: string[] = [];
    let testSessionData: {
        testEmail: string;
        testReferenceId: string;
    };

    const parentApiKey = process.env.PARENT_API_KEY || "";
    const parentEntityId = process.env.PARENT_ENTITY_ID || "";
    const itemId = process.env.LOOP_ITEM_ID || "";

    beforeAll(async () => {
        checkoutSessionInstance = new CheckoutSession({
            apiKey: parentApiKey,
            entityId: parentEntityId,
        });

        // Create test data with random numbers to avoid conflicts
        const randomSuffix = Math.floor(Math.random() * 10000);
        testSessionData = {
            testEmail: `test-integration-${randomSuffix}@loopcrypto.xyz`,
            testReferenceId: `test-ref-${randomSuffix}`,
        };

        // Create test checkout sessions for integration testing
        const testSessions: CreateCheckoutSessionRequest[] = [
            {
                elements: [
                    {
                        itemId,
                    },
                ],
                email: testSessionData.testEmail,
                referenceId: testSessionData.testReferenceId,
                cartEnabled: true,
                payInvoiceImmediately: false,
                metadata: { testType: "integration", randomSuffix },
                successUrl: "https://www.loopcrypto.xyz/success",
                paymentTokens: [
                    {
                        networkId: 1,
                        tokenSymbols: ["USDC"],
                        tokenAddresses: [
                            "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
                        ],
                    },
                ],
            },
        ];

        for (const testSession of testSessions) {
            try {
                const response =
                    await checkoutSessionInstance.create(testSession);
                createdCheckoutSessionIds.push(response.id);
            } catch (error) {
                console.log(
                    `Test checkout session might already exist, continuing...`,
                    error,
                );
            }
        }
    });

    afterAll(async () => {
        // Clean up created checkout sessions
        for (const checkoutSessionId of createdCheckoutSessionIds) {
            try {
                // Deactivate the checkout session instead of deleting
                await checkoutSessionInstance.update(checkoutSessionId, {
                    active: false,
                });
            } catch (error) {
                console.log(
                    `Failed to deactivate checkout session ${checkoutSessionId}:`,
                    error,
                );
            }
        }
    });

    test("should create a new checkout session with a Loop item", async () => {
        const randomSuffix = Math.floor(Math.random() * 10000);
        const createPayload: CreateCheckoutSessionRequest = {
            elements: [
                {
                    itemId,
                },
            ],
            email: `test-create-${randomSuffix}@loopcrypto.xyz`,
            referenceId: `test-create-ref-${randomSuffix}`,
            cartEnabled: true,
            payInvoiceImmediately: false,
            metadata: { testType: "create", randomSuffix },
            successUrl: "https://www.loopcrypto.xyz/success",
            paymentTokens: [
                {
                    networkId: 1,
                    tokenSymbols: ["USDC"],
                    tokenAddresses: [
                        "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
                    ],
                },
            ],
        };

        const response = await checkoutSessionInstance.create(createPayload);
        createdCheckoutSessionIds.push(response.id);

        expect(response).toMatchObject({
            id: expect.any(String),
            active: expect.any(Boolean),
            elements: expect.any(Array),
            cartEnabled: true,
            payInvoiceImmediately: false,
            template: false,
            childTemplate: false,
            upgradeSubscription: 0,
            resetBillingCycle: 0,
            suggestedAllowanceAmount: expect.any(Number),
            minimumAllowanceAmount: expect.any(Number),
            minimumBalanceAmount: expect.any(Number),
        });

        expect(response.id).toBeTruthy();
        expect(response.elements).toHaveLength(1);
        expect(response.elements![0]).toMatchObject({
            itemId,
        });
        expect(response.emailAddress).toBe(
            `test-create-${randomSuffix}@loopcrypto.xyz`,
        );
        expect(response.referenceId).toBe(`test-create-ref-${randomSuffix}`);
        expect(response.metadata).toMatchObject({
            testType: "create",
            randomSuffix,
        });
        expect(response.successUrl).toBe("https://www.loopcrypto.xyz/success");
    });

    test("should fetch checkout sessions without query params", async () => {
        const response = await checkoutSessionInstance.search();

        expect(response).toMatchObject({
            totalResults: expect.any(Number),
            checkoutSessions: expect.any(Array),
        });

        expect(Array.isArray(response.checkoutSessions)).toBe(true);
        expect(response.totalResults).toBeGreaterThanOrEqual(0);
    });

    test("should fetch checkout sessions with query params", async () => {
        const queryParams: CheckoutSessionQueryParams = {
            active: true,
            email: testSessionData.testEmail,
            page: 1,
            limit: 10,
            sortBy: "dateCreated",
            sortDir: "desc",
        };

        const response = await checkoutSessionInstance.search(queryParams);

        expect(response).toMatchObject({
            totalResults: expect.any(Number),
            checkoutSessions: expect.any(Array),
        });

        expect(Array.isArray(response.checkoutSessions)).toBe(true);
        expect(response.totalResults).toBeGreaterThanOrEqual(0);

        // If we have results, verify they match our query criteria
        if (response.checkoutSessions.length > 0) {
            response.checkoutSessions.forEach((session) => {
                expect(session.active).toBe(true);
                expect(session.emailAddress).toBe(testSessionData.testEmail);
            });
        }
    });

    test("should fetch checkout sessions with email filter", async () => {
        const queryParams: CheckoutSessionQueryParams = {
            email: testSessionData.testEmail,
            page: 1,
            limit: 10,
        };

        const response = await checkoutSessionInstance.search(queryParams);

        expect(response).toMatchObject({
            totalResults: expect.any(Number),
            checkoutSessions: expect.any(Array),
        });

        // If we have results, verify they match our query criteria
        if (response.checkoutSessions.length > 0) {
            response.checkoutSessions.forEach((session) => {
                expect(session.emailAddress).toBe(testSessionData.testEmail);
                expect(session.referenceId).toBe(
                    testSessionData.testReferenceId,
                );
            });
        }
    });

    test("should retrieve a specific checkout session", async () => {
        if (createdCheckoutSessionIds.length === 0) {
            // Create a test session if none exist
            const createPayload: CreateCheckoutSessionRequest = {
                elements: [
                    {
                        itemId,
                    },
                ],
                metadata: { testType: "retrieve" },
            };

            const createResponse =
                await checkoutSessionInstance.create(createPayload);
            createdCheckoutSessionIds.push(createResponse.id);

            const response = await checkoutSessionInstance.retrieve(
                createResponse.id,
            );

            expect(response).toMatchObject({
                id: createResponse.id,
                active: expect.any(Boolean),
                elements: expect.any(Array),
                template: expect.any(Boolean),
                childTemplate: expect.any(Boolean),
                upgradeSubscription: expect.any(Boolean),
                resetBillingCycle: expect.any(Boolean),
                suggestedAllowanceAmount: expect.any(Number),
                minimumAllowanceAmount: expect.any(Number),
                minimumBalanceAmount: expect.any(Number),
            });

            expect(response.id).toBe(createResponse.id);
            expect(response.metadata).toMatchObject({ testType: "retrieve" });
        } else {
            const checkoutSessionId = createdCheckoutSessionIds[0];
            const response =
                await checkoutSessionInstance.retrieve(checkoutSessionId);

            expect(response).toMatchObject({
                id: checkoutSessionId,
                active: expect.any(Boolean),
                elements: expect.any(Array),
                template: expect.any(Boolean),
                childTemplate: expect.any(Boolean),
                upgradeSubscription: 0,
                resetBillingCycle: 0,
                suggestedAllowanceAmount: expect.any(Number),
                minimumAllowanceAmount: expect.any(Number),
                minimumBalanceAmount: expect.any(Number),
            });

            expect(response.id).toBe(checkoutSessionId);
        }
    });

    test("should update a checkout session", async () => {
        if (createdCheckoutSessionIds.length === 0) {
            // Create a test session if none exist
            const createPayload: CreateCheckoutSessionRequest = {
                elements: [
                    {
                        externalPriceId: "price_test_update",
                    },
                ],
                metadata: { testType: "update" },
            };

            const createResponse =
                await checkoutSessionInstance.create(createPayload);
            createdCheckoutSessionIds.push(createResponse.id);

            const updatePayload: UpdateCheckoutSessionRequest = {
                active: false,
                addPaymentTokens: [
                    {
                        networkId: 137,
                        tokenSymbols: ["MATIC"],
                    },
                ],
            };

            const response = await checkoutSessionInstance.update(
                createResponse.id,
                updatePayload,
            );

            expect(response).toMatchObject({
                id: createResponse.id,
                active: false,
                elements: expect.any(Array),
                template: expect.any(Boolean),
                childTemplate: expect.any(Boolean),
                upgradeSubscription: expect.any(Boolean),
                resetBillingCycle: expect.any(Boolean),
                suggestedAllowanceAmount: expect.any(Number),
                minimumAllowanceAmount: expect.any(Number),
                minimumBalanceAmount: expect.any(Number),
            });

            expect(response.active).toBe(false);
            expect(response.id).toBe(createResponse.id);
        } else {
            const checkoutSessionId = createdCheckoutSessionIds[0];
            const updatePayload: UpdateCheckoutSessionRequest = {
                active: false,
            };

            const response = await checkoutSessionInstance.update(
                checkoutSessionId,
                updatePayload,
            );

            expect(response).toMatchObject({
                id: checkoutSessionId,
                active: false,
                elements: expect.any(Array),
                template: expect.any(Boolean),
                childTemplate: expect.any(Boolean),
                upgradeSubscription: 0,
                resetBillingCycle: 0,
                suggestedAllowanceAmount: expect.any(Number),
                minimumAllowanceAmount: expect.any(Number),
                minimumBalanceAmount: expect.any(Number),
            });

            expect(response.active).toBe(false);
            expect(response.id).toBe(checkoutSessionId);
        }
    });

    test("should handle pagination correctly", async () => {
        const queryParams: CheckoutSessionQueryParams = {
            page: 1,
            limit: 5,
            sortBy: "dateCreated",
            sortDir: "desc",
        };

        const response = await checkoutSessionInstance.search(queryParams);

        expect(response).toMatchObject({
            totalResults: expect.any(Number),
            checkoutSessions: expect.any(Array),
        });

        expect(response.checkoutSessions.length).toBeLessThanOrEqual(5);
        expect(response.totalResults).toBeGreaterThanOrEqual(0);
    });
});
