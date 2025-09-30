import { Base } from "src/resources/base";
import {
    PaymentMethodQueryParams,
    PaymentMethodsResponse,
    CreatePaymentMethodRequest,
    PaymentMethodResponse,
    UpdatePaymentMethodRequest,
} from "src/resources/paymentMethod/types";

export class PaymentMethod extends Base {
    search(
        queryParams?: PaymentMethodQueryParams,
    ): Promise<PaymentMethodsResponse> {
        const queryString = queryParams
            ? `?${new URLSearchParams(
                  queryParams as Record<string, string>,
              ).toString()}`
            : "";
        return this.request(`/v2/payment-methods${queryString}`, {
            method: "GET",
        });
    }

    create(
        payload: CreatePaymentMethodRequest,
    ): Promise<PaymentMethodResponse> {
        return this.request(`/v2/payment-method`, {
            data: payload,
            method: "POST",
        });
    }

    update(
        paymentMethodId: string,
        updateData: UpdatePaymentMethodRequest,
    ): Promise<PaymentMethodResponse> {
        return this.request(`/v2/payment-method/${paymentMethodId}`, {
            method: "PATCH",
            data: updateData,
        });
    }

    retrieve(paymentMethodId: string): Promise<PaymentMethodResponse> {
        return this.request(`/v2/payment-method/${paymentMethodId}`, {
            method: "GET",
        });
    }

    delete(paymentMethodId: string): Promise<PaymentMethodsResponse> {
        return this.request(`/v2/payment-method/${paymentMethodId}`, {
            method: "DELETE",
        });
    }
}
