import { Base } from "src/resources/base";
import {
    PayAgreementInvoiceResponse,
    PayStripeAgreementInvoiceRequest,
} from "src/resources/stripe/invoice/types";

export class StripeInvoice extends Base {
    payInvoice(
        payload: PayStripeAgreementInvoiceRequest,
    ): Promise<PayAgreementInvoiceResponse> {
        return this.request(`/v1/invoice/pay`, {
            data: payload,
            method: "POST",
        });
    }
}
