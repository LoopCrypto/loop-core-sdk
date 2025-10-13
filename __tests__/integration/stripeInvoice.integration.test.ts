import { StripeInvoice } from "src/resources/stripe/invoice";
import { PayStripeAgreementInvoiceRequest } from "src/resources/stripe/invoice/types";

describe("StripeInvoice Integration", () => {
    let stripeInvoiceInstance: StripeInvoice;

    const parentApiKey = process.env.PARENT_API_KEY || "";
    const parentEntityId = process.env.PARENT_ENTITY_ID || "";
    const invoiceIdToPay = process.env.LOOP_INVOICE_ID_TO_PAY || "";

    beforeAll(async () => {
        stripeInvoiceInstance = new StripeInvoice({
            apiKey: parentApiKey,
            entityId: parentEntityId,
        });

        if (!parentApiKey || !parentEntityId || !invoiceIdToPay) {
            console.warn(
                "Skipping Stripe Invoice integration tests: Missing required environment variables (PARENT_API_KEY, PARENT_ENTITY_ID, or LOOP_INVOICE_ID_TO_PAY)",
            );
        }
    });

    test("should pay an invoice with Loop invoice ID", async () => {
        if (!parentApiKey || !parentEntityId || !invoiceIdToPay) {
            console.log(
                "Skipping test: Missing required environment variables",
            );
            return;
        }
        const payload: PayStripeAgreementInvoiceRequest = {
            invoiceId: invoiceIdToPay,
        };

        const response = await stripeInvoiceInstance.payInvoice(payload);

        expect(response).toMatchObject({
            id: invoiceIdToPay,
            status: 1,
        });
    });
});
