import { Base } from "../base";
import {
    PayoutDestinationResponse,
    CreatePayoutDestinationRequest,
    PayoutQueryParams,
    PayoutDestinationsResponse,
    UpdatePayoutDestinationRequest,
} from "./types";

export class Payout extends Base {
    create(
        payload: CreatePayoutDestinationRequest,
    ): Promise<PayoutDestinationResponse> {
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

    delete(payoutId: string): Promise<PayoutDestinationsResponse> {
        return this.request(`payout-destination/${payoutId}`, {
            method: "DELETE",
        });
    }

    search(
        queryParams?: PayoutQueryParams,
    ): Promise<PayoutDestinationsResponse> {
        const queryString = queryParams
            ? `?${new URLSearchParams(
                  queryParams as Record<string, string>,
              ).toString()}`
            : "";
        return this.request(`payout-destinations${queryString}`, {
            method: "GET",
        });
    }

    update(
        payoutId: string,
        updateData: UpdatePayoutDestinationRequest,
    ): Promise<PayoutDestinationResponse> {
        return this.request(`payout-destinations/${payoutId}`, {
            method: "PATCH",
            data: updateData,
        });
    }
}
