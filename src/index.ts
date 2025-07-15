import * as dotenv from "dotenv";
// src/index.ts

dotenv.config();

import { WebHook } from "./resources/webhook/index.ts";
import { Token } from "./resources/token/index.ts";
import { Payout } from "./resources/payout/index.ts";
import { PaymentType } from "./resources/paymenttype/index.ts";
import { PaymentMethod } from "./resources/paymentmethod/index.ts";
import { Payin } from "./resources/payin/index.ts";
import { Merchant } from "./resources/merchant/index.ts";
import { Entity } from "./resources/entity/index.ts";
import { Customer } from "./resources/customer/index.ts";
import { ApiKey } from "./resources/apikey/index.ts";
import { SDKOptions } from "./resources/common-types.ts";

export class LoopCrypto {
    webhooks: WebHook;
    tokens: Token;
    payouts: Payout;
    paymentTypes: PaymentType;
    paymentMethods: PaymentMethod;
    payins: Payin;
    merchants: Merchant;
    entities: Entity;
    customers: Customer;
    apiKeys: ApiKey;

    constructor(config: SDKOptions) {
        this.webhooks = new WebHook(config);
        this.tokens = new Token(config);
        this.payouts = new Payout(config);
        this.paymentTypes = new PaymentType(config);
        this.paymentMethods = new PaymentMethod(config);
        this.payins = new Payin(config);
        this.merchants = new Merchant(config);
        this.entities = new Entity(config);
        this.customers = new Customer(config);
        this.apiKeys = new ApiKey(config);
    }
}

export default LoopCrypto;

export type {
    WebHooksResponse,
    Webhook,
    WebhookEvent,
    WebhookSortBy,
    WebhooksQueryParams,
    CreateWebhookRequest,
    UpdateWebhookRequest,
    WebHooksUpdateQueryParams,
    WebHookSecretResponse,
} from "./resources/webhook/types.ts";

export type {
    TokenQueryParams,
    TokensResponse,
    TokenResponse,
} from "./resources/token/types.ts";

export type {
    PayoutDestinationResponse,
    CreatePayoutDestinationRequest,
    PayoutQueryParams,
    PayoutDestinationsResponse,
} from "./resources/payout/types.ts";

export type {
    PaymentTypeQueryParams,
    CreatePaymentTypeRequest,
    PaymentTypesResponse,
    PaymentTypeResponse,
    DefaultPaymentTypeRequest,
} from "./resources/paymenttype/types.ts";

export type {
    PaymentMethodQueryParams,
    PaymentMethodsResponse,
    PaymentMethodResponse,
    CreatePaymentMethodRequest,
    UpdatePaymentMethodRequest,
} from "./resources/paymentmethod/types.ts";

export type {
    PayinQueryParams,
    PayinsResponse,
    PayinResponse,
    CreatePayinRequest,
    UpdatePayinRequest,
} from "./resources/payin/types.ts";

export type {
    CreateMerchantRequest,
    MerchantResponse,
    MerchantQueryParams,
    MerchantsResponse,
    UpdateMerchantRequest,
} from "./resources/merchant/types.ts";

export type {
    EntityResponse,
    CreateEntityRequest,
    UpdateEntityRequest,
} from "./resources/entity/types.ts";

export type {
    CustomerQueryParams,
    MerchantCustomersResponse,
    MerchantCustomerResponse,
    CreateCustomerRequest,
} from "./resources/customer/types.ts";

export type {
    ApiKeyQueryParams,
    ApiKeysResponse,
    CreateApiKeyRequest,
    UpdateApiKeyRequest,
    ApiKeyType,
} from "./resources/apikey/types.ts";

export type { SDKOptions } from "./resources/common-types";
