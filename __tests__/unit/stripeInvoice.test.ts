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
});
