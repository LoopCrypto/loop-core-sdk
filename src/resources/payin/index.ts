import { Base } from "../base.ts";
import {
    PayinQueryParams,
    PayinsResponse,
    PayinResponse,
    CreatePayinRequest,
    UpdatePayinRequest,
} from "./types.ts";

export class Payin extends Base {
    search(queryParams?: PayinQueryParams): Promise<PayinsResponse> {
        const queryString = queryParams
            ? `?${new URLSearchParams(
                  queryParams as Record<string, string>,
              ).toString()}`
            : "";
        return this.request(`payins${queryString}`, { method: "GET" });
    }

    create(payload: CreatePayinRequest): Promise<PayinResponse> {
        return this.request(`payin`, {
            data: payload,
            method: "POST",
        });
    }

    retrieve(payinId: string): Promise<PayinResponse> {
        return this.request(`payin/${payinId}`, {
            method: "GET",
        });
    }

    update(
        payinId: string,
        updateData: UpdatePayinRequest,
    ): Promise<PayinsResponse> {
        return this.request(`payin/${payinId}`, {
            method: "PATCH",
            data: updateData,
        });
    }
}
