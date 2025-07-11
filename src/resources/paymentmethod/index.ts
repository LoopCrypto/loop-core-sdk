import { Base } from "../base.ts";
import {
    PaymentMethodQueryParams,
    PaymentMethodsResponse,
    CreatePaymentMethodRequest,
    PaymentMethodResponse,
} from "./types.ts";

export class PaymentMethod extends Base {
    search(
        queryParams?: PaymentMethodQueryParams,
    ): Promise<PaymentMethodsResponse> {
        const queryString = queryParams
            ? `?${new URLSearchParams(
                  queryParams as Record<string, string>,
              ).toString()}`
            : "";
        return this.request(`payment-methods${queryString}`, { method: "GET" });
    }

    create(
        payload: CreatePaymentMethodRequest,
    ): Promise<PaymentMethodResponse> {
        return this.request(`payment-method`, {
            data: payload,
            method: "POST",
        });
    }

    retrieve(paymentMethodId: string): Promise<PaymentMethodResponse> {
        return this.request(`payment-method/${paymentMethodId}`, {
            method: "GET",
        });
    }

    delete(paymentMethodId: string): Promise<PaymentMethodsResponse> {
        return this.request(`payment-method/${paymentMethodId}`, {
            method: "DELETE",
        });
    }
}
