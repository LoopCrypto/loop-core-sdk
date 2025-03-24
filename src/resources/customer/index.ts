import { Base } from "../base.ts";
import {
  CustomerQueryParams,
  CustomerResponse,
  CustomerType,
  CustomerRequestBody,
} from "./types.ts";

export class Customer extends Base {
  search(queryParams?: CustomerQueryParams): Promise<CustomerResponse> {
    const queryString = queryParams
      ? `?${new URLSearchParams(
          queryParams as Record<string, string>
        ).toString()}`
      : "";
    return this.request(`customers${queryString}`, { method: "GET" });
  }

  create(payload: CustomerRequestBody): Promise<CustomerType> {
    return this.request(`customer`, {
      data: payload,
      method: "POST",
    });
  }

  retrieve(customerId: string): Promise<CustomerType> {
    return this.request(`customer/${customerId}`, {
      method: "GET",
    });
  }
}
