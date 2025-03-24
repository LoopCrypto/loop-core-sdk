import { Base } from "../base.ts";
import {
  PaymentMethodQueryParams,
  PaymentMethodResponse,
  CreatePaymentMethodRequest,
  PaymentMethodType,
} from "./types.ts";

export class PaymentMethod extends Base {
  search(queryParams?: PaymentMethodQueryParams): Promise<PaymentMethodResponse> {
    const queryString = queryParams
      ? `?${new URLSearchParams(
          queryParams as Record<string, string>
        ).toString()}`
      : "";
    return this.request(`payment-methods${queryString}`, { method: "GET" });
  }

  create(payload: CreatePaymentMethodRequest): Promise<PaymentMethodType> {
    return this.request(`payment-method`, {
      data: payload,
      method: "POST",
    });
  }

  retrieve(paymentMethodId: string): Promise<PaymentMethodType> {
    return this.request(`payment-method/${paymentMethodId}`, {
      method: "GET",
    });
  }

  delete(paymentMethodId: string): Promise<PaymentMethodResponse> {
    return this.request(`payment-method/${paymentMethodId}`, {
      method: "DELETE",
    });
  }
}
