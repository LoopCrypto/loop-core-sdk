import { Base } from "src/resources/base";
import {
    CreateMerchantRequest,
    MerchantResponse,
    MerchantQueryParams,
    MerchantsResponse,
    UpdateMerchantRequest,
} from "src/resources/merchant/types";

export class Merchant extends Base {
    search(queryParams?: MerchantQueryParams): Promise<MerchantsResponse> {
        const queryString = queryParams
            ? `?${new URLSearchParams(
                queryParams as Record<string, string>,
            ).toString()}`
            : "";
        return this.request(`merchants${queryString}`, { method: "GET" });
    }

    create(payload: CreateMerchantRequest): Promise<MerchantResponse> {
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
        updateData: UpdateMerchantRequest,
    ): Promise<MerchantResponse> {
        return this.request(`merchant/${merchantId}`, {
            method: "PATCH",
            data: updateData,
        });
    }
}
