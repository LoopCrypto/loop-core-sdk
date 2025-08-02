import { Base } from "src/resources/base";
import {
    CustomerQueryParams,
    MerchantCustomerResponse,
    CreateCustomerRequest,
    CustomersResponse,
    CustomerResponse,
} from "src/resources/customer/types";

export class Customer extends Base {
    search(
        queryParams?: CustomerQueryParams,
    ): Promise<CustomersResponse> {
        const queryString = queryParams
            ? `?${new URLSearchParams(
                queryParams as Record<string, string>,
            ).toString()}`
            : "";
        return this.request(`/v2/customers${queryString}`, { method: "GET" });
    }

    create(payload: CreateCustomerRequest): Promise<MerchantCustomerResponse> {
        return this.request(`/v2/customer`, {
            data: payload,
            method: "POST",
        });
    }

    retrieve(customerId: string): Promise<CustomerResponse> {
        return this.request(`/v2/customer/${customerId}`, {
            method: "GET",
        });
    }
}
