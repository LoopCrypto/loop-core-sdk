import { Base } from "../base.ts";
import {
  MerchantRequest,
  MerchantResponse,
  MerchantQueryParams,
  MerchantResponseList,
  UpdateMerchantRequest,
} from "./types.ts";

export class Merchant extends Base {
  search(queryParams?: MerchantQueryParams): Promise<MerchantResponseList> {
    const queryString = queryParams
      ? `?${new URLSearchParams(
          queryParams as Record<string, string>
        ).toString()}`
      : "";
    return this.request(`merchants${queryString}`, { method: "GET" });
  }

  create(payload: MerchantRequest): Promise<MerchantResponse> {
    return this.request(`merchant`, {
      data: payload,
      method: "POST",
    });
  }

  retrieve(merchantId: string): Promise<MerchantResponse> {
    return this.request(`merchant/${merchantId}`, {
      method: "GET",
    });
  }

  update(
    merchantId: string,
    updateData: UpdateMerchantRequest
  ): Promise<MerchantResponse> {
    return this.request(`merchant/${merchantId}`, {
      method: "PATCH",
      data: updateData,
    });
  }
}