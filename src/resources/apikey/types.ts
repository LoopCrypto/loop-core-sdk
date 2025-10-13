import { SortDirection } from "src/resources/commonTypes";

/**
 * Api Key Common
 */

export type EntityPermissions =
    | "CreateEntities"
    | "UpdateEntities"
    | "GetEntities"
    | "CreateChildEntities";

export type ApiKeyPermissions =
    | "CreateApiKeys"
    | "UpdateApiKey"
    | "GetApiKeys"
    | "DeactivateApiKey";

export type MerchantPermissions =
    | "CreateMerchants"
    | "UpdateMerchants"
    | "GetMerchants";

export type PaymentTypePermissions =
    | "CreatePaymentTypes"
    | "UpdatePaymentTypes"
    | "GetPaymentTypes"
    | "DeletePaymentTypes";

export type PayoutDestinationPermissions =
    | "CreatePayoutDestinations"
    | "UpdatePayoutDestinations"
    | "GetPayoutDestinations"
    | "DeletePayoutDestinations";

export type PaymentMethodPermissions =
    | "CreatePaymentMethods"
    | "UpdatePaymentMethods"
    | "GetPaymentMethods"
    | "DeletePaymentMethods";

export type PayinPermissions = "CreatePayins" | "UpdatePayins" | "GetPayins";

export type CustomerPermissions = "CreateCustomers" | "GetCustomers";

export type WebhookPermissions =
    | "CreateWebhooks"
    | "GetWebhooks"
    | "DeleteWebhooks"
    | "UpdateWebhooks"
    | "CreateWebhookSecret"
    | "GetWebhookSecret";

export type TokenPermissions = "GetTokens";

export type AuthTokenPermissions = "CreateAuthTokens";

export type CheckoutSessionPermissions =
    | "CreateCheckoutSessions"
    | "UpdateCheckoutSessions"
    | "GetCheckoutSessions"
    | "DeleteCheckoutSessions"
    | "ListCheckoutSessions";

export type UserPermissions = "CreateUsers" | "GetUsers" | "DeleteUsers";

export type Permissions =
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
    sortDir?: SortDirection;
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
     * The created API key
     * @example "550e8400-e29b-41d4-a716-446655440000"
     */
    apiKey?: string;
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
