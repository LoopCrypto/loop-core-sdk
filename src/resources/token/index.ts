import { Base } from "src/resources/base";
import { TokenQueryParams, TokensResponse } from "src/resources/token/types";

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
