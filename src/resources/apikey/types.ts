import { SortDir } from "../common-types";

/**
 * Api Key Common
 */

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

/**
 * Api Key Request
 */

export interface ApiKeyQueryParams {
    apiKeyId?: string;
    apiKeyName?: string;
    page?: number;
    limit?: number;
    sortBy?: "id" | "name" | "dateCreated";
    sortDir?: SortDir;
}

export interface CreateApiKeyRequest {
    name: string;
    grantPermissions: Permissions[];
}

export interface UpdateApiKeyRequest {
    name?: string;
    grantPermissions?: Permissions[];
    revokePermissions?: Permissions[];
}

/**
 * Api Key Response
 */

export interface ApiKeyType {
    dateCreated: number; // Unix timestamp in seconds
    name: string;
    id: string;
    permissions: string[];
    apiKey: string;
}

export interface ApiKeyResponse {
    /**
     * The unique identifier for the API key
     * @example "1234567890abcdef"
     */
    id: string;
    /**
     * The name that identifies the API key
     * @example "Loop API key"
     */
    name: string;
    /**
     * The list of permissions that define what operations this API key can perform
     * @example ["CreateEntity", "GetPaymentTypes"]
     */
    permissions: string[];
    /**
     * The date the API key was created, represented as a Unix timestamp in seconds.
     * @example 1716211200
     */
    dateCreated: number;
}

export interface ApiKeysResponse {
    /**
     * The total count of API keys matching the search criteria, regardless of page size or number.
     * @example 100
     */
    totalResults: number;
    /**
     * The list of API keys associated with the entity
     */
    apiKeys: ApiKeyResponse[];
}
