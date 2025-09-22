import { CheckoutSession } from "src/resources/stripe/checkoutSession";
import {
    CheckoutSessionQueryParams,
    CheckoutSessionResponse,
    CheckoutSessionsResponse,
    CreateCheckoutSessionRequest,
    UpdateCheckoutSessionRequest,
} from "src/resources/stripe/checkoutSession/types";

describe("CheckoutSession API", () => {
    let checkoutSessionApi: CheckoutSession;
    let requestMock: jest.Mock;

    beforeEach(() => {
        checkoutSessionApi = new CheckoutSession({
            entityId: "test",
            apiKey: "secret",
        });
        requestMock = jest.fn() as jest.Mock;
        (checkoutSessionApi as unknown as { request: jest.Mock }).request =
            requestMock;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test("should fetch checkout sessions without query parameters", async () => {
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

        requestMock.mockResolvedValue(mockResponse);

        const result = await checkoutSessionApi.search();
        expect(requestMock).toHaveBeenCalledWith("/v1/checkout-session", {
            method: "GET",
        });
        expect(result).toEqual(mockResponse);
    });

    test("should fetch checkout sessions with query parameters", async () => {
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

        requestMock.mockResolvedValue(mockResponse);

        const result = await checkoutSessionApi.search(queryParams);
        expect(requestMock).toHaveBeenCalledWith(
            "/v1/checkout-session?active=true&email=info%40loopcrypto.xyz&externalCustomerId=cus_12345&externalSubscriptionId=sub_12345&externalInvoiceId=in_12345&externalInvoiceNumber=A1234-001&expiresBefore=1749097136&page=1&limit=25&sortBy=dateCreated&sortDir=desc",
            { method: "GET" },
        );
        expect(result).toEqual(mockResponse);
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

        requestMock.mockResolvedValue(mockResponse);

        const result = await checkoutSessionApi.create(payload);
        expect(requestMock).toHaveBeenCalledWith("/v1/checkout-session", {
            data: payload,
            method: "POST",
        });
        expect(result).toEqual(mockResponse);
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

        requestMock.mockResolvedValue(mockResponse);

        const checkoutSessionId = "cs_12345";
        const result = await checkoutSessionApi.retrieve(checkoutSessionId);
        expect(requestMock).toHaveBeenCalledWith(
            `/v1/checkout-session/${checkoutSessionId}`,
            {
                method: "GET",
            },
        );
        expect(result).toEqual(mockResponse);
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

        requestMock.mockResolvedValue(mockResponse);

        const result = await checkoutSessionApi.update(
            checkoutSessionId,
            payload,
        );
        expect(requestMock).toHaveBeenCalledWith(
            `/v1/checkout-session/${checkoutSessionId}`,
            {
                data: payload,
                method: "PATCH",
            },
        );
        expect(result).toEqual(mockResponse);
    });

    test("should handle query parameters with special characters", async () => {
        const queryParams: CheckoutSessionQueryParams = {
            email: "test+user@example.com",
            externalInvoiceNumber: "INV-123/456",
            sortBy: "id",
            sortDir: "asc",
        };
        const mockResponse: CheckoutSessionsResponse = {
            totalResults: 0,
            checkoutSessions: [],
        };

        requestMock.mockResolvedValue(mockResponse);

        const result = await checkoutSessionApi.search(queryParams);
        expect(requestMock).toHaveBeenCalledWith(
            "/v1/checkout-session?email=test%2Buser%40example.com&externalInvoiceNumber=INV-123%2F456&sortBy=id&sortDir=asc",
            { method: "GET" },
        );
        expect(result).toEqual(mockResponse);
    });

    test("should handle empty query parameters object", async () => {
        const queryParams: CheckoutSessionQueryParams = {};
        const mockResponse: CheckoutSessionsResponse = {
            totalResults: 0,
            checkoutSessions: [],
        };

        requestMock.mockResolvedValue(mockResponse);

        const result = await checkoutSessionApi.search(queryParams);
        expect(requestMock).toHaveBeenCalledWith("/v1/checkout-session?", {
            method: "GET",
        });
        expect(result).toEqual(mockResponse);
    });
});
