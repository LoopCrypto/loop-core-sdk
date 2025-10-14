import { Base } from "src/resources/base";
import {
    CheckoutSessionsResponse,
    CheckoutSessionResponse,
    CreateCheckoutSessionRequest,
    UpdateCheckoutSessionRequest,
    CheckoutSessionQueryParams,
} from "src/resources/stripe/checkoutSession/types";

const singleCheckoutSessionURI = "/v1/checkout-session";
const multipleCheckoutSessionsURI = "/v1/checkout-sessions";

export class CheckoutSession extends Base {
    search(
        queryParams?: CheckoutSessionQueryParams,
    ): Promise<CheckoutSessionsResponse> {
        const queryString = queryParams
            ? `?${new URLSearchParams(
                  queryParams as Record<string, string>,
              ).toString()}`
            : "";
        return this.request(`${multipleCheckoutSessionsURI}${queryString}`, {
            method: "GET",
        });
    }

    create(
        payload: CreateCheckoutSessionRequest,
    ): Promise<CheckoutSessionResponse> {
        return this.request(`${singleCheckoutSessionURI}`, {
            data: payload,
            method: "POST",
        });
    }

    retrieve(checkoutSessionId: string): Promise<CheckoutSessionResponse> {
        return this.request(
            `${singleCheckoutSessionURI}/${checkoutSessionId}`,
            {
                method: "GET",
            },
        );
    }

    update(
        checkoutSessionId: string,
        payload: UpdateCheckoutSessionRequest,
    ): Promise<CheckoutSessionResponse> {
        return this.request(
            `${singleCheckoutSessionURI}/${checkoutSessionId}`,
            {
                data: payload,
                method: "PATCH",
            },
        );
    }
}
