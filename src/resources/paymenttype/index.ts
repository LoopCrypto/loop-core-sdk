import { Base } from "../base";
import {
    PaymentTypeQueryParams,
    CreatePaymentTypeRequest,
    PaymentTypesResponse,
    DefaultPaymentTypeRequest,
    PaymentTypeResponse,
} from "./types";

export class PaymentType extends Base {
    search(
        queryParams?: PaymentTypeQueryParams,
    ): Promise<PaymentTypesResponse> {
        const queryString = queryParams
            ? `?${new URLSearchParams(
                  queryParams as Record<string, string>,
              ).toString()}`
            : "";
        return this.request(`payment-types${queryString}`, { method: "GET" });
    }

    create(payload: CreatePaymentTypeRequest): Promise<PaymentTypeResponse> {
        return this.request(`payment-type`, {
            data: payload,
            method: "POST",
        });
    }

    delete(merchantId: string, tokenId: string): Promise<PaymentTypesResponse> {
        return this.request(`payment-type/${merchantId}/${tokenId}`, {
            method: "DELETE",
        });
    }

    setDefaults(
        defaultRequest: DefaultPaymentTypeRequest,
    ): Promise<PaymentTypeResponse> {
        return this.request(`payment-types/defaults`, {
            method: "PATCH",
            data: defaultRequest,
        });
    }
}
