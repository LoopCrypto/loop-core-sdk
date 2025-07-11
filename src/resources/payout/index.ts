import { Base } from "../base.ts";
import {
    PayoutDestinationResponse,
    PayoutPayload,
    PayoutQueryParams,
    PayoutDestinationListResponse,
} from "./types.ts";

export class Payout extends Base {
    create(payload: PayoutPayload): Promise<PayoutDestinationResponse> {
        return this.request(`payout-destination`, {
            data: payload,
            method: "POST",
        });
    }

    retrieve(payoutId: string): Promise<PayoutDestinationResponse> {
        return this.request(`payout-destination/${payoutId}`, {
            method: "GET",
        });
    }

    delete(payoutId: string): Promise<PayoutDestinationListResponse> {
        return this.request(`payout-destination/${payoutId}`, {
            method: "DELETE",
        });
    }

    search(
        queryParams?: PayoutQueryParams,
    ): Promise<PayoutDestinationListResponse> {
        const queryString = queryParams
            ? `?${new URLSearchParams(
                  queryParams as Record<string, string>,
              ).toString()}`
            : "";
        return this.request(`payout-destinations${queryString}`, {
            method: "GET",
        });
    }
}
