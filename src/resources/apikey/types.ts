import { SortDir } from "../common-types";

export interface ApiKeyQueryParams {
    apiKeyId?: string;
    apiKeyName?: string;
    page?: number;
    limit?: number;
    sortBy?: "id" | "name" | "dateCreated";
    sortDir?: SortDir;
}

export interface ApiKeyResponse {
    totalResults: number;
    apiKeys: ApiKeyType[];
}

export interface ApiKeyType {
    dateCreated: number; // Unix timestamp in seconds
    name: string;
    id: string;
    permissions: string[];
    apiKey: string;
}

type EntityPermissions =
    | "CreateEntities"
    | "UpdateEntities"
    | "GetEntities"
    | "CreateChildEntities";

type ApiKeyPermissions =
    | "CreateApiKeys"
    | "UpdateApiKey"
    | "GetApiKeys"
    | "DeactivateApiKey";

type MerchantPermissions =
    | "CreateMerchants"
    | "UpdateMerchants"
    | "GetMerchants";

type PaymentTypePermissions =
    | "CreatePaymentTypes"
    | "UpdatePaymentTypes"
    | "GetPaymentTypes"
    | "DeletePaymentTypes";

type PayoutDestinationPermissions =
    | "CreatePayoutDestinations"
    | "UpdatePayoutDestinations"
    | "GetPayoutDestinations"
    | "DeletePayoutDestinations";

type PaymentMethodPermissions =
    | "CreatePaymentMethods"
    | "UpdatePaymentMethods"
    | "GetPaymentMethods"
    | "DeletePaymentMethods";

type PayinPermissions = "CreatePayins" | "UpdatePayins" | "GetPayins";

type CustomerPermissions = "CreateCustomers" | "GetCustomers";

type WebhookPermissions =
    | "CreateWebhooks"
    | "GetWebhooks"
    | "DeleteWebhooks"
    | "UpdateWebhooks"
    | "CreateWebhookSecret"
    | "GetWebhookSecret";

type TokenPermissions = "GetTokens";

type AuthTokenPermissions = "CreateAuthTokens";

type CheckoutSessionPermissions =
    | "CreateCheckoutSessions"
    | "UpdateCheckoutSessions"
    | "GetCheckoutSessions"
    | "DeleteCheckoutSessions"
    | "ListCheckoutSessions";

type UserPermissions = "CreateUsers" | "GetUsers" | "DeleteUsers";

type Permissions =
    | EntityPermissions
    | MerchantPermissions
    | PaymentTypePermissions
    | PayoutDestinationPermissions
    | PaymentMethodPermissions
    | PayinPermissions
    | CustomerPermissions
    | WebhookPermissions
    | TokenPermissions
    | AuthTokenPermissions
    | CheckoutSessionPermissions
    | UserPermissions
    | ApiKeyPermissions
    | UserPermissions;

export interface ApiKeyRequestBody {
    name: string;
    grantPermissions: Permissions[];
}

export interface ApiKeyUpdateRequestBody {
    name?: string;
    grantPermissions?: Permissions[];
    revokePermissions?: Permissions[];
}
