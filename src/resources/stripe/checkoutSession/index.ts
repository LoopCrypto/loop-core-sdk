import { Base } from "src/resources/base";
import {
    CheckoutSessionsResponse,
    CheckoutSessionResponse,
    CreateCheckoutSessionRequest,
    UpdateCheckoutSessionRequest,
    CheckoutSessionQueryParams,
} from "src/resources/stripe/checkoutSession/types";

const checkoutSessionURI = "/v1/checkout-session";

export class CheckoutSession extends Base {
    search(
        queryParams?: CheckoutSessionQueryParams,
    ): Promise<CheckoutSessionsResponse> {
        const queryString = queryParams
            ? `?${new URLSearchParams(
                  queryParams as Record<string, string>,
              ).toString()}`
            : "";
        return this.request(`${checkoutSessionURI}${queryString}`, {
            method: "GET",
        });
    }

    create(
        payload: CreateCheckoutSessionRequest,
    ): Promise<CheckoutSessionResponse> {
        return this.request(`${checkoutSessionURI}`, {
            data: payload,
            method: "POST",
        });
    }

    retrieve(checkoutSessionId: string): Promise<CheckoutSessionResponse> {
        return this.request(`${checkoutSessionURI}/${checkoutSessionId}`, {
            method: "GET",
        });
    }

    update(
        checkoutSessionId: string,
        payload: UpdateCheckoutSessionRequest,
    ): Promise<CheckoutSessionResponse> {
        return this.request(`${checkoutSessionURI}/${checkoutSessionId}`, {
            data: payload,
            method: "PATCH",
        });
    }
}
