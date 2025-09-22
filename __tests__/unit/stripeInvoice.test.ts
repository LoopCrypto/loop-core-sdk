import { StripeInvoice } from "src/resources/stripe/invoice";
import {
    PayStripeAgreementInvoiceRequest,
    PayAgreementInvoiceResponse,
} from "src/resources/stripe/invoice/types";

describe("StripeInvoice API", () => {
    let stripeInvoiceApi: StripeInvoice;
    let requestMock: jest.Mock;

    beforeEach(() => {
        stripeInvoiceApi = new StripeInvoice({
            entityId: "test",
            apiKey: "secret",
        });
        requestMock = jest.fn() as jest.Mock;
        (stripeInvoiceApi as unknown as { request: jest.Mock }).request =
            requestMock;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test("should pay invoice with Loop invoice ID", async () => {
        const payload: PayStripeAgreementInvoiceRequest = {
            invoiceId: "d5f55138-881f-406d-bfa0-a574be64cf49",
        };
        const mockResponse: PayAgreementInvoiceResponse = {
            id: "1234-5678-9012",
            invoiceId: "INV-1234567890",
            elements: {
                elements: [
                    {
                        id: "1234-5678-9012",
                        agreementInvoiceID: "12234-533678-92012",
                        quantity: 1,
                        name: "Starter Plan",
                        amount: "1999",
                        discountAmount: 199,
                        createdDate: 1664096943,
                    },
                    {
                        id: "1234-5678-9013",
                        agreementInvoiceID: "12234-533678-92013",
                        quantity: 2,
                        name: "Premium Feature",
                        amount: "999",
                        discountAmount: null,
                        createdDate: 1664096943,
                    },
                ],
            },
            agreementId: "12234-533678-92012",
            amount: "1212",
            token: "0x1234567890",
            usd: true,
            status: 2, // Paid
            networkId: 1,
            source: 3, // Stripe
            tags: ["Monthly", "Subscription"],
            notes: "Monthly subscription payment",
            entityId: "1234-5678-9012",
            toAddress: "0xabcdef1234567890abcdef1234567890abcdef12",
            fromAddress: "0x1234567890abcdef1234567890abcdef12345678",
            billDate: 1701974672,
            billDateTime:
                "Mon Oct 16 2023 21:41:59 GMT+0000 (Coordinated Universal Time)",
            paidDate: 1701974672,
            paidDateTime:
                "Mon Oct 16 2023 21:41:59 GMT+0000 (Coordinated Universal Time)",
            createdDate: 1664096943,
            decodedSignature: {
                v: 27,
                r: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
                s: "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
            },
            attemptCount: 1,
            firstAttemptDate: 1701974672,
            lastAttemptDate: 1701974672,
            transactionHash:
                "0x123098656178abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
        };

        requestMock.mockResolvedValue(mockResponse);

        const result = await stripeInvoiceApi.payInvoice(payload);
        expect(requestMock).toHaveBeenCalledWith("/v1/invoice/pay", {
            data: payload,
            method: "POST",
        });
        expect(result).toEqual(mockResponse);
    });

    test("should pay invoice with Stripe external invoice ID", async () => {
        const payload: PayStripeAgreementInvoiceRequest = {
            externalInvoiceId: "in_123490aa",
        };
        const mockResponse: PayAgreementInvoiceResponse = {
            id: "5678-9012-3456",
            invoiceId: "INV-9876543210",
            elements: {
                elements: [
                    {
                        id: "5678-9012-3456",
                        agreementInvoiceID: "98765-432109-87654",
                        quantity: 1,
                        name: "Enterprise Plan",
                        amount: "4999",
                        discountAmount: null,
                        createdDate: 1664096943,
                    },
                ],
            },
            agreementId: "98765-432109-87654",
            amount: "4999",
            token: "0xabcdef1234567890",
            usd: false,
            status: 6, // Pending
            networkId: 137, // Polygon
            source: 3, // Stripe
            tags: ["Enterprise", "Annual"],
            notes: null,
            entityId: "5678-9012-3456",
            toAddress: "0x9876543210abcdef9876543210abcdef98765432",
            fromAddress: "0xfedcba0987654321fedcba0987654321fedcba09",
            billDate: 1701974672,
            billDateTime:
                "Mon Oct 16 2023 21:41:59 GMT+0000 (Coordinated Universal Time)",
            paidDate: null,
            paidDateTime: null,
            createdDate: 1664096943,
            decodedSignature: null,
            attemptCount: 0,
            firstAttemptDate: null,
            lastAttemptDate: null,
            transactionHash: null,
        };

        requestMock.mockResolvedValue(mockResponse);

        const result = await stripeInvoiceApi.payInvoice(payload);
        expect(requestMock).toHaveBeenCalledWith("/v1/invoice/pay", {
            data: payload,
            method: "POST",
        });
        expect(result).toEqual(mockResponse);
    });

    test("should pay invoice with both Loop invoice ID and external invoice ID", async () => {
        const payload: PayStripeAgreementInvoiceRequest = {
            invoiceId: "d5f55138-881f-406d-bfa0-a574be64cf49",
            externalInvoiceId: "in_123490aa",
        };
        const mockResponse: PayAgreementInvoiceResponse = {
            id: "1111-2222-3333",
            invoiceId: "INV-1111111111",
            elements: {
                elements: [
                    {
                        id: "1111-2222-3333",
                        agreementInvoiceID: "11111-222222-33333",
                        quantity: 1,
                        name: "Pro Plan",
                        amount: "2999",
                        discountAmount: 300,
                        createdDate: 1664096943,
                    },
                ],
            },
            agreementId: "11111-222222-33333",
            amount: "2699",
            token: "0x1111111111111111111111111111111111111111",
            usd: true,
            status: 1, // Scheduled
            networkId: 56, // BSC
            source: 3, // Stripe
            tags: ["Pro", "Quarterly"],
            notes: "Quarterly subscription with discount",
            entityId: "1111-2222-3333",
            toAddress: "0x2222222222222222222222222222222222222222",
            fromAddress: "0x3333333333333333333333333333333333333333",
            billDate: 1701974672,
            billDateTime:
                "Mon Oct 16 2023 21:41:59 GMT+0000 (Coordinated Universal Time)",
            paidDate: null,
            paidDateTime: null,
            createdDate: 1664096943,
            decodedSignature: {
                v: 28,
                r: "0x4444444444444444444444444444444444444444444444444444444444444444",
                s: "0x5555555555555555555555555555555555555555555555555555555555555555",
            },
            attemptCount: 2,
            firstAttemptDate: 1701974000,
            lastAttemptDate: 1701974500,
            transactionHash:
                "0x6666666666666666666666666666666666666666666666666666666666666666",
        };

        requestMock.mockResolvedValue(mockResponse);

        const result = await stripeInvoiceApi.payInvoice(payload);
        expect(requestMock).toHaveBeenCalledWith("/v1/invoice/pay", {
            data: payload,
            method: "POST",
        });
        expect(result).toEqual(mockResponse);
    });

    test("should pay invoice with minimal payload (only invoice ID)", async () => {
        const payload: PayStripeAgreementInvoiceRequest = {
            invoiceId: "minimal-test-id-12345",
        };
        const mockResponse: PayAgreementInvoiceResponse = {
            id: "minimal-1234",
            invoiceId: "INV-MINIMAL",
            elements: {
                elements: [],
            },
            agreementId: "minimal-agreement-123",
            amount: "100",
            token: "0x0000000000000000000000000000000000000000",
            usd: true,
            status: 7, // Draft
            networkId: 1,
            source: 3, // Stripe
            tags: null,
            notes: null,
            entityId: "minimal-entity-123",
            toAddress: "0x0000000000000000000000000000000000000000",
            fromAddress: "0x0000000000000000000000000000000000000000",
            billDate: 1701974672,
            billDateTime:
                "Mon Oct 16 2023 21:41:59 GMT+0000 (Coordinated Universal Time)",
            paidDate: null,
            paidDateTime: null,
            createdDate: 1664096943,
            decodedSignature: null,
            attemptCount: 0,
            firstAttemptDate: null,
            lastAttemptDate: null,
            transactionHash: null,
        };

        requestMock.mockResolvedValue(mockResponse);

        const result = await stripeInvoiceApi.payInvoice(payload);
        expect(requestMock).toHaveBeenCalledWith("/v1/invoice/pay", {
            data: payload,
            method: "POST",
        });
        expect(result).toEqual(mockResponse);
    });

    test("should handle invoice with failed status", async () => {
        const payload: PayStripeAgreementInvoiceRequest = {
            externalInvoiceId: "in_failed_invoice_123",
        };
        const mockResponse: PayAgreementInvoiceResponse = {
            id: "failed-1234",
            invoiceId: "INV-FAILED",
            elements: {
                elements: [
                    {
                        id: "failed-element-123",
                        agreementInvoiceID: "failed-agreement-123",
                        quantity: 1,
                        name: "Failed Payment Item",
                        amount: "5000",
                        discountAmount: null,
                        createdDate: 1664096943,
                    },
                ],
            },
            agreementId: "failed-agreement-123",
            amount: "5000",
            token: "0xfailed000000000000000000000000000000000000",
            usd: true,
            status: 3, // Failed
            networkId: 1,
            source: 3, // Stripe
            tags: ["Failed", "Retry"],
            notes: "Payment failed due to insufficient funds",
            entityId: "failed-entity-123",
            toAddress: "0xfailed000000000000000000000000000000000000",
            fromAddress: "0xfailed000000000000000000000000000000000000",
            billDate: 1701974672,
            billDateTime:
                "Mon Oct 16 2023 21:41:59 GMT+0000 (Coordinated Universal Time)",
            paidDate: null,
            paidDateTime: null,
            createdDate: 1664096943,
            decodedSignature: {
                v: 27,
                r: "0xfailed000000000000000000000000000000000000000000000000000000000000",
                s: "0xfailed000000000000000000000000000000000000000000000000000000000000",
            },
            attemptCount: 3,
            firstAttemptDate: 1701974000,
            lastAttemptDate: 1701974600,
            transactionHash: null,
        };

        requestMock.mockResolvedValue(mockResponse);

        const result = await stripeInvoiceApi.payInvoice(payload);
        expect(requestMock).toHaveBeenCalledWith("/v1/invoice/pay", {
            data: payload,
            method: "POST",
        });
        expect(result).toEqual(mockResponse);
    });

    test("should handle invoice with cancelled status", async () => {
        const payload: PayStripeAgreementInvoiceRequest = {
            invoiceId: "cancelled-invoice-12345",
        };
        const mockResponse: PayAgreementInvoiceResponse = {
            id: "cancelled-1234",
            invoiceId: "INV-CANCELLED",
            elements: {
                elements: [
                    {
                        id: "cancelled-element-123",
                        agreementInvoiceID: "cancelled-agreement-123",
                        quantity: 1,
                        name: "Cancelled Service",
                        amount: "0",
                        discountAmount: 1000,
                        createdDate: 1664096943,
                    },
                ],
            },
            agreementId: "cancelled-agreement-123",
            amount: "0",
            token: "0xcancelled0000000000000000000000000000000000",
            usd: true,
            status: 4, // Cancelled
            networkId: 1,
            source: 3, // Stripe
            tags: ["Cancelled", "Refund"],
            notes: "Invoice cancelled by customer request",
            entityId: "cancelled-entity-123",
            toAddress: "0xcancelled0000000000000000000000000000000000",
            fromAddress: "0xcancelled0000000000000000000000000000000000",
            billDate: 1701974672,
            billDateTime:
                "Mon Oct 16 2023 21:41:59 GMT+0000 (Coordinated Universal Time)",
            paidDate: null,
            paidDateTime: null,
            createdDate: 1664096943,
            decodedSignature: null,
            attemptCount: 0,
            firstAttemptDate: null,
            lastAttemptDate: null,
            transactionHash: null,
        };

        requestMock.mockResolvedValue(mockResponse);

        const result = await stripeInvoiceApi.payInvoice(payload);
        expect(requestMock).toHaveBeenCalledWith("/v1/invoice/pay", {
            data: payload,
            method: "POST",
        });
        expect(result).toEqual(mockResponse);
    });

    test("should handle invoice with uncollectible status", async () => {
        const payload: PayStripeAgreementInvoiceRequest = {
            externalInvoiceId: "in_uncollectible_123",
        };
        const mockResponse: PayAgreementInvoiceResponse = {
            id: "uncollectible-1234",
            invoiceId: "INV-UNCOLLECTIBLE",
            elements: {
                elements: [
                    {
                        id: "uncollectible-element-123",
                        agreementInvoiceID: "uncollectible-agreement-123",
                        quantity: 1,
                        name: "Uncollectible Debt",
                        amount: "10000",
                        discountAmount: null,
                        createdDate: 1664096943,
                    },
                ],
            },
            agreementId: "uncollectible-agreement-123",
            amount: "10000",
            token: "0xuncollectible000000000000000000000000000000",
            usd: true,
            status: 5, // Uncollectible
            networkId: 1,
            source: 3, // Stripe
            tags: ["Uncollectible", "Bad Debt"],
            notes: "Invoice marked as uncollectible after multiple failed attempts",
            entityId: "uncollectible-entity-123",
            toAddress: "0xuncollectible000000000000000000000000000000",
            fromAddress: "0xuncollectible000000000000000000000000000000",
            billDate: 1701974672,
            billDateTime:
                "Mon Oct 16 2023 21:41:59 GMT+0000 (Coordinated Universal Time)",
            paidDate: null,
            paidDateTime: null,
            createdDate: 1664096943,
            decodedSignature: {
                v: 27,
                r: "0xuncollectible0000000000000000000000000000000000000000000000000000000000",
                s: "0xuncollectible0000000000000000000000000000000000000000000000000000000000",
            },
            attemptCount: 5,
            firstAttemptDate: 1701974000,
            lastAttemptDate: 1701975000,
            transactionHash: null,
        };

        requestMock.mockResolvedValue(mockResponse);

        const result = await stripeInvoiceApi.payInvoice(payload);
        expect(requestMock).toHaveBeenCalledWith("/v1/invoice/pay", {
            data: payload,
            method: "POST",
        });
        expect(result).toEqual(mockResponse);
    });
});
