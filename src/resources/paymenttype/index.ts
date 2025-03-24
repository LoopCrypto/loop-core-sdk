import { Base } from "../base.ts";
import {
  PaymentTypeQueryParams,
  PaymentTypeRequest,
  PaymentTypResponse,
} from "./types.ts";

export class PaymentType extends Base {
  search(queryParams?: PaymentTypeQueryParams): Promise<PaymentTypResponse> {
    const queryString = queryParams
      ? `?${new URLSearchParams(
          queryParams as Record<string, string>
        ).toString()}`
      : "";
    return this.request(`payment-types${queryString}`, { method: "GET" });
  }

  create(payload: PaymentTypeRequest): Promise<PaymentType> {
    return this.request(`payment-type`, {
      data: payload,
      method: "POST",
    });
  }

  delete(merchantId: string, tokenId: string): Promise<PaymentTypResponse> {
    return this.request(`payment-type/${merchantId}/${tokenId}`, {
      method: "DELETE",
    });
  }
}
