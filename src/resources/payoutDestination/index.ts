import { Base } from "src/resources/base";
import {
    PayoutDestinationResponse,
    CreatePayoutDestinationRequest,
    PayoutDestinationQueryParams,
    PayoutDestinationsResponse,
    UpdatePayoutDestinationRequest,
} from "src/resources/payoutDestination/types";

export class PayoutDestinations extends Base {
    create(
        payload: CreatePayoutDestinationRequest,
    ): Promise<PayoutDestinationResponse> {
        return this.request(`payout-destination`, {
            data: payload,
            method: "POST",
        });
    }

    retrieve(payoutDestinationId: string): Promise<PayoutDestinationResponse> {
        return this.request(`payout-destination/${payoutDestinationId}`, {
            method: "GET",
        });
    }

    delete(payoutDestinationId: string): Promise<PayoutDestinationsResponse> {
        return this.request(`payout-destination/${payoutDestinationId}`, {
            method: "DELETE",
        });
    }

    search(
        queryParams?: PayoutDestinationQueryParams,
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
        payoutDestinationId: string,
        updateData: UpdatePayoutDestinationRequest,
    ): Promise<PayoutDestinationResponse> {
        return this.request(`payout-destinations/${payoutDestinationId}`, {
            method: "PATCH",
            data: updateData,
        });
    }
}
