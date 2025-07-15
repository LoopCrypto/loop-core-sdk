import { Base } from "../base";
import { TokenQueryParams, TokensResponse } from "./types";

export class Token extends Base {
    search(queryParams?: TokenQueryParams): Promise<TokensResponse> {
        const queryString = queryParams
            ? `?${new URLSearchParams(
                  queryParams as Record<string, string>,
              ).toString()}`
            : "";
        return this.request(`tokens${queryString}`, { method: "GET" });
    }
}
