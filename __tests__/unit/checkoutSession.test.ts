import { CheckoutSession } from "src/resources/stripe/checkoutSession";
import {
    CheckoutSessionQueryParams,
    CheckoutSessionResponse,
    CheckoutSessionsResponse,
    CreateCheckoutSessionRequest,
    UpdateCheckoutSessionRequest,
} from "src/resources/stripe/checkoutSession/types";

jest.mock("src/resources/base");

describe("CheckoutSession", () => {
    let checkoutSessionInstance: CheckoutSession;
    let mockRequest: jest.Mock;

    beforeEach(() => {
        checkoutSessionInstance = new CheckoutSession({
            apiKey: "apiKey",
            entityId: "entityId",
        });
        mockRequest = jest.fn() as jest.Mock; // Explicitly typed as jest.Mock
        (checkoutSessionInstance as unknown as { request: jest.Mock }).request =
            mockRequest;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test("should fetch checkout sessions without query params", async () => {
        const mockResponse: CheckoutSessionsResponse = {
            totalResults: 2,
            checkoutSessions: [
                {
                    id: "cs_12345",
                    active: true,
                    elements: [
                        {
                            itemId: "12334-55322-122-123314",
                            externalPriceId: "price_12345",
                        },
                    ],
                    externalSubscriptionId: "sub_12345",
                    externalCustomerId: "cus_12345",
                    externalInvoiceId: "in_12345",
                    referenceId: "ref_12345",
                    emailAddress: "info@loopcrypto.xyz",
                    freeTrialDays: 7,
                    couponCodeId: "12345",
                    payInvoiceImmediately: true,
                    cartEnabled: false,
                    billDate: 1746869711,
                    metadata: { customerId: "12345" },
                    expirationDate: 1746869711,
                    childTemplate: false,
                    suggestedAllowanceAmount: 1001,
                    minimumAllowanceAmount: 1001,
                    minimumBalanceAmount: 1001,
                    upgradeSubscription: false,
                    template: false,
                    successUrl: "https://www.loopcrypto.xyz/success",
                    tokens: [
                        {
                            networkId: 1,
                            tokenSymbol: "USDC",
                            tokenAddress:
                                "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
                        },
                    ],
                    resetBillingCycle: false,
                },
                {
                    id: "cs_67890",
                    active: false,
                    elements: null,
                    externalSubscriptionId: null,
                    externalCustomerId: null,
                    externalInvoiceId: null,
                    referenceId: null,
                    emailAddress: null,
                    freeTrialDays: null,
                    couponCodeId: null,
                    payInvoiceImmediately: false,
                    cartEnabled: true,
                    billDate: null,
                    metadata: null,
                    expirationDate: null,
                    childTemplate: false,
                    suggestedAllowanceAmount: 0,
                    minimumAllowanceAmount: 0,
                    minimumBalanceAmount: 0,
                    upgradeSubscription: false,
                    template: true,
                    successUrl: null,
                    tokens: null,
                    resetBillingCycle: false,
                },
            ],
        };

        mockRequest.mockResolvedValue(mockResponse);

        const response = await checkoutSessionInstance.search();
        expect(mockRequest).toHaveBeenCalledWith("/v1/checkout-sessions", {
            method: "GET",
        });
        expect(response).toEqual(mockResponse);
    });

    test("should fetch checkout sessions with query params", async () => {
        const queryParams: CheckoutSessionQueryParams = {
            active: true,
            email: "info@loopcrypto.xyz",
            externalCustomerId: "cus_12345",
            externalSubscriptionId: "sub_12345",
            externalInvoiceId: "in_12345",
            externalInvoiceNumber: "A1234-001",
            expiresBefore: 1749097136,
            page: 1,
            limit: 25,
            sortBy: "dateCreated",
            sortDir: "desc",
        };
        const mockResponse: CheckoutSessionsResponse = {
            totalResults: 1,
            checkoutSessions: [
                {
                    id: "cs_12345",
                    active: true,
                    elements: [
                        {
                            itemId: "12334-55322-122-123314",
                            externalPriceId: "price_12345",
                        },
                    ],
                    externalSubscriptionId: "sub_12345",
                    externalCustomerId: "cus_12345",
                    externalInvoiceId: "in_12345",
                    referenceId: "ref_12345",
                    emailAddress: "info@loopcrypto.xyz",
                    freeTrialDays: 7,
                    couponCodeId: "12345",
                    payInvoiceImmediately: true,
                    cartEnabled: false,
                    billDate: 1746869711,
                    metadata: { customerId: "12345" },
                    expirationDate: 1746869711,
                    childTemplate: false,
                    suggestedAllowanceAmount: 1001,
                    minimumAllowanceAmount: 1001,
                    minimumBalanceAmount: 1001,
                    upgradeSubscription: false,
                    template: false,
                    successUrl: "https://www.loopcrypto.xyz/success",
                    tokens: [
                        {
                            networkId: 1,
                            tokenSymbol: "USDC",
                            tokenAddress:
                                "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
                        },
                    ],
                    resetBillingCycle: false,
                },
            ],
        };

        mockRequest.mockResolvedValue(mockResponse);

        const response = await checkoutSessionInstance.search(queryParams);
        expect(mockRequest).toHaveBeenCalledWith(
            "/v1/checkout-sessions?active=true&email=info%40loopcrypto.xyz&externalCustomerId=cus_12345&externalSubscriptionId=sub_12345&externalInvoiceId=in_12345&externalInvoiceNumber=A1234-001&expiresBefore=1749097136&page=1&limit=25&sortBy=dateCreated&sortDir=desc",
            { method: "GET" },
        );
        expect(response).toEqual(mockResponse);
    });

    test("should create a checkout session", async () => {
        const payload: CreateCheckoutSessionRequest = {
            elements: [
                {
                    externalPriceId: "price_12345",
                    itemId: "12334-55322-122-123314",
                },
            ],
            externalSubscriptionId: "sub_12345",
            externalCustomerId: "cus_12345",
            externalInvoiceId: "in_12345",
            externalInvoiceNumber: "A1234-001",
            freeTrialDays: 7,
            couponCode: "SUMMER2025",
            email: "info@loopcrypto.xyz",
            referenceId: "ref_12345",
            payInvoiceImmediately: true,
            cartEnabled: false,
            metadata: { customerId: "12345" },
            template: false,
            suggestedAllowanceAmount: 1001,
            minimumAllowanceAmount: 1001,
            minimumBalanceAmount: 1001,
            upgradeSubscription: false,
            successUrl: "https://www.loopcrypto.xyz/success",
            paymentTokens: [
                {
                    networkId: 1,
                    tokenSymbols: ["USDC", "USDT"],
                    tokenAddresses: [
                        "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
                        "0x1234567890123456789012345678901234567890",
                    ],
                },
            ],
            resetBillingCycle: false,
        };
        const mockResponse: CheckoutSessionResponse = {
            id: "cs_12345",
            active: true,
            elements: [
                {
                    itemId: "12334-55322-122-123314",
                    externalPriceId: "price_12345",
                },
            ],
            externalSubscriptionId: "sub_12345",
            externalCustomerId: "cus_12345",
            externalInvoiceId: "in_12345",
            referenceId: "ref_12345",
            emailAddress: "info@loopcrypto.xyz",
            freeTrialDays: 7,
            couponCodeId: "12345",
            payInvoiceImmediately: true,
            cartEnabled: false,
            billDate: 1746869711,
            metadata: { customerId: "12345" },
            expirationDate: 1746869711,
            childTemplate: false,
            suggestedAllowanceAmount: 1001,
            minimumAllowanceAmount: 1001,
            minimumBalanceAmount: 1001,
            upgradeSubscription: false,
            template: false,
            successUrl: "https://www.loopcrypto.xyz/success",
            tokens: [
                {
                    networkId: 1,
                    tokenSymbol: "USDC",
                    tokenAddress: "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
                },
            ],
            resetBillingCycle: false,
        };

        mockRequest.mockResolvedValue(mockResponse);

        const response = await checkoutSessionInstance.create(payload);
        expect(mockRequest).toHaveBeenCalledWith("/v1/checkout-session", {
            data: payload,
            method: "POST",
        });
        expect(response).toEqual(mockResponse);
    });

    test("should retrieve a checkout session", async () => {
        const mockResponse: CheckoutSessionResponse = {
            id: "cs_12345",
            active: true,
            elements: [
                {
                    itemId: "12334-55322-122-123314",
                    externalPriceId: "price_12345",
                },
            ],
            externalSubscriptionId: "sub_12345",
            externalCustomerId: "cus_12345",
            externalInvoiceId: "in_12345",
            referenceId: "ref_12345",
            emailAddress: "info@loopcrypto.xyz",
            freeTrialDays: 7,
            couponCodeId: "12345",
            payInvoiceImmediately: true,
            cartEnabled: false,
            billDate: 1746869711,
            metadata: { customerId: "12345" },
            expirationDate: 1746869711,
            childTemplate: false,
            suggestedAllowanceAmount: 1001,
            minimumAllowanceAmount: 1001,
            minimumBalanceAmount: 1001,
            upgradeSubscription: false,
            template: false,
            successUrl: "https://www.loopcrypto.xyz/success",
            tokens: [
                {
                    networkId: 1,
                    tokenSymbol: "USDC",
                    tokenAddress: "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
                },
            ],
            resetBillingCycle: false,
        };

        mockRequest.mockResolvedValue(mockResponse);

        const checkoutSessionId = "cs_12345";
        const response =
            await checkoutSessionInstance.retrieve(checkoutSessionId);
        expect(mockRequest).toHaveBeenCalledWith(
            `/v1/checkout-session/${checkoutSessionId}`,
            {
                method: "GET",
            },
        );
        expect(response).toEqual(mockResponse);
    });

    test("should update a checkout session", async () => {
        const checkoutSessionId = "cs_12345";
        const payload: UpdateCheckoutSessionRequest = {
            active: false,
            addPaymentTokens: [
                {
                    networkId: 137,
                    tokenSymbols: ["MATIC"],
                },
            ],
            removePaymentTokens: [
                {
                    networkId: 1,
                    tokenAddresses: [
                        "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
                    ],
                },
            ],
        };
        const mockResponse: CheckoutSessionResponse = {
            id: "cs_12345",
            active: false,
            elements: [
                {
                    itemId: "12334-55322-122-123314",
                    externalPriceId: "price_12345",
                },
            ],
            externalSubscriptionId: "sub_12345",
            externalCustomerId: "cus_12345",
            externalInvoiceId: "in_12345",
            referenceId: "ref_12345",
            emailAddress: "info@loopcrypto.xyz",
            freeTrialDays: 7,
            couponCodeId: "12345",
            payInvoiceImmediately: true,
            cartEnabled: false,
            billDate: 1746869711,
            metadata: { customerId: "12345" },
            expirationDate: 1746869711,
            childTemplate: false,
            suggestedAllowanceAmount: 1001,
            minimumAllowanceAmount: 1001,
            minimumBalanceAmount: 1001,
            upgradeSubscription: false,
            template: false,
            successUrl: "https://www.loopcrypto.xyz/success",
            tokens: [
                {
                    networkId: 137,
                    tokenSymbol: "MATIC",
                    tokenAddress: "0x0000000000000000000000000000000000000000",
                },
            ],
            resetBillingCycle: false,
        };

        mockRequest.mockResolvedValue(mockResponse);

        const response = await checkoutSessionInstance.update(
            checkoutSessionId,
            payload,
        );
        expect(mockRequest).toHaveBeenCalledWith(
            `/v1/checkout-session/${checkoutSessionId}`,
            {
                data: payload,
                method: "PATCH",
            },
        );
        expect(response).toEqual(mockResponse);
    });

    test("should handle API errors gracefully", async () => {
        const errorMessage = "API Error: Invalid checkout session ID";
        mockRequest.mockRejectedValue(new Error(errorMessage));

        await expect(
            checkoutSessionInstance.retrieve("invalid-id"),
        ).rejects.toThrow(errorMessage);
        expect(mockRequest).toHaveBeenCalledWith(
            "/v1/checkout-session/invalid-id",
            {
                method: "GET",
            },
        );
    });
});
