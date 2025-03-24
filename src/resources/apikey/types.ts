export interface ApiKeyQueryParams {
  apiKeyId?: string;
  apiKeyName?: string;
  page?: number; // Using number instead of double in TypeScript
  limit?: number; // Using number instead of double in TypeScript
  sortBy?: "id" | "name" | "dateCreated";
  sortDir?: "asc" | "desc";
}

export interface ApiKeyResponse {
  totalResults: number; // Using number instead of double in TypeScript
  apiKeys: ApiKeyType[];
}

export interface ApiKeyType {
  dateCreated: number; // Unix timestamp in seconds
  name: string;
  id: string;
  permissions: string[];
  apiKey: string;
}

export interface ApiKeyRequestBody {
  name: string;
  grantPermissions: (
    | "CreateEntities"
    | "UpdateEntities"
    | "CreateApiKeys"
    | "UpdateApiKey"
    | "GetApiKeys"
    | "DeactivateApiKey"
    | "CreateMerchants"
    | "UpdateMerchants"
    | "GetMerchants"
    | "CreatePaymentTypes"
    | "GetPaymentTypes"
    | "DeletePaymentTypes"
    | "CreatePayoutDestinations"
    | "GetPayoutDestinations"
    | "DeletePayoutDestinations"
    | "CreatePaymentMethods"
    | "GetPaymentMethods"
    | "DeletePaymentMethods"
    | "CreatePayins"
    | "GetPayins"
    | "CreateCustomers"
    | "GetCustomers"
    | "CreateWebhooks"
    | "GetWebhooks"
    | "DeleteWebhooks"
    | "UpdateWebhooks"
    | "CreateWebhookSecret"
    | "GetWebhookSecret"
    | "GetTokens"
  )[];
}

export interface ApiKeyUpdateRequestBody {
  name?: string;
  grantPermissions?: (
    | "CreateEntities"
    | "UpdateEntities"
    | "CreateApiKeys"
    | "UpdateApiKey"
    | "GetApiKeys"
    | "DeactivateApiKey"
    | "CreateMerchants"
    | "UpdateMerchants"
    | "GetMerchants"
    | "CreatePaymentTypes"
    | "GetPaymentTypes"
    | "DeletePaymentTypes"
    | "CreatePayoutDestinations"
    | "GetPayoutDestinations"
    | "DeletePayoutDestinations"
    | "CreatePaymentMethods"
    | "GetPaymentMethods"
    | "DeletePaymentMethods"
    | "CreatePayins"
    | "GetPayins"
    | "CreateCustomers"
    | "GetCustomers"
    | "CreateWebhooks"
    | "GetWebhooks"
    | "DeleteWebhooks"
    | "UpdateWebhooks"
    | "CreateWebhookSecret"
    | "GetWebhookSecret"
    | "GetTokens"
  )[];
  revokePermissions?: (
    | "CreateEntities"
    | "UpdateEntities"
    | "CreateApiKeys"
    | "UpdateApiKey"
    | "GetApiKeys"
    | "DeactivateApiKey"
    | "CreateMerchants"
    | "UpdateMerchants"
    | "GetMerchants"
    | "CreatePaymentTypes"
    | "GetPaymentTypes"
    | "DeletePaymentTypes"
    | "CreatePayoutDestinations"
    | "GetPayoutDestinations"
    | "DeletePayoutDestinations"
    | "CreatePaymentMethods"
    | "GetPaymentMethods"
    | "DeletePaymentMethods"
    | "CreatePayins"
    | "GetPayins"
    | "CreateCustomers"
    | "GetCustomers"
    | "CreateWebhooks"
    | "GetWebhooks"
    | "DeleteWebhooks"
    | "UpdateWebhooks"
    | "CreateWebhookSecret"
    | "GetWebhookSecret"
    | "GetTokens"
  )[];
}
