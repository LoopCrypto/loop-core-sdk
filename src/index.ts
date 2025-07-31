import * as dotenv from "dotenv";
// src/index.ts

dotenv.config();

import { WebHook } from "./resources/webhook/index";
import { Token } from "./resources/token/index";
import { PayoutDestinations } from "./resources/payoutDestination/index";
import { PaymentType } from "./resources/paymentType/index";
import { PaymentMethod } from "./resources/paymentMethod/index";
import { Payin } from "./resources/payin/index";
import { Merchant } from "./resources/merchant/index";
import { Entity } from "./resources/entity/index";
import { Customer } from "./resources/customer/index";
import { ApiKey } from "./resources/apiKey/index";
import { SDKOptions } from "./resources/common-types";

export class LoopCrypto {
    webhooks: WebHook;
    tokens: Token;
    payoutDestinations: PayoutDestinations;
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
        this.payoutDestinations = new PayoutDestinations(config);
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
    PayoutDestinationQueryParams,
    PayoutDestinationsResponse,
} from "./resources/payoutDestination/types";

export type {
    PaymentTypeQueryParams,
    CreatePaymentTypeRequest,
    PaymentTypesResponse,
    PaymentTypeResponse,
    DefaultPaymentTypeRequest,
} from "./resources/paymentType/types";

export type {
    PaymentMethodQueryParams,
    PaymentMethodsResponse,
    PaymentMethodResponse,
    CreatePaymentMethodRequest,
    UpdatePaymentMethodRequest,
} from "./resources/paymentMethod/types";

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
} from "./resources/apiKey/types";

export type { SDKOptions } from "./resources/common-types";
