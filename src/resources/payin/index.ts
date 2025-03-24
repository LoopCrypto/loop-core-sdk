import { Base } from "../base.ts";
import {
  PayinQueryParams,
  PayinResponse,
  PayinType,
  PayinBodyParams,
} from "./types.ts";

export class Payin extends Base {
  search(queryParams?: PayinQueryParams): Promise<PayinResponse> {
    const queryString = queryParams
      ? `?${new URLSearchParams(
          queryParams as Record<string, string>
        ).toString()}`
      : "";
    return this.request(`payins${queryString}`, { method: "GET" });
  }

  create(payload: PayinBodyParams): Promise<PayinType> {
    return this.request(`payin`, {
      data: payload,
      method: "POST",
    });
  }

  retrieve(payinId: string): Promise<PayinType> {
    return this.request(`payin/${payinId}`, {
      method: "GET",
    });
  }
}
