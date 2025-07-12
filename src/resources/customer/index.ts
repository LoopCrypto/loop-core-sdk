import { Base } from "../base.ts";
import {
    CustomerQueryParams,
    MerchantCustomersResponse,
    MerchantCustomerResponse,
    CreateCustomerRequest,
} from "./types.ts";

export class Customer extends Base {
    search(
        queryParams?: CustomerQueryParams,
    ): Promise<MerchantCustomersResponse> {
        const queryString = queryParams
            ? `?${new URLSearchParams(
                  queryParams as Record<string, string>,
              ).toString()}`
            : "";
        return this.request(`customers${queryString}`, { method: "GET" });
    }

    create(payload: CreateCustomerRequest): Promise<MerchantCustomerResponse> {
        return this.request(`customer`, {
            data: payload,
            method: "POST",
        });
    }

    retrieve(customerId: string): Promise<MerchantCustomerResponse> {
        return this.request(`customer/${customerId}`, {
            method: "GET",
        });
    }
}
