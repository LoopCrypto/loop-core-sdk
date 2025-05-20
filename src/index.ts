import * as dotenv from "dotenv";
// src/index.ts

dotenv.config();

import { WebHook } from "./resources/webhook/index.ts";
import { SDKOptions } from "./resources/webhook/types.ts";
import { Token } from "./resources/token/index.ts";
import { Payout } from "./resources/payout/index.ts";
import { PaymentType } from "./resources/paymenttype/index.ts";
import { PaymentMethod } from "./resources/paymentmethod/index.ts";
import { Payin } from "./resources/payin/index.ts";
import { Merchant } from "./resources/merchant/index.ts";
import { Entity } from "./resources/entity/index.ts";
import { Customer } from "./resources/customer/index.ts";
import { ApiKey } from "./resources/apikey/index.ts";

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
  SDKOptions,
  WebHooksResponse,
  Webhook,
  WebhookEvent,
  WebhookSortBy,
  WebhookSortDir,
  WebHooksQueryParams,
  WebHookPayload,
  UpdateWebHookPayload,
  WebHooksUpdateQueryParams,
  WebHookSecretResponse,
} from "./resources/webhook/types.ts";

export type {
  TokenQueryParams,
  TokenResponse,
} from "./resources/token/types.ts";

export type {
  PayoutDestinationResponse,
  PayoutPayload,
  PayoutQueryParams,
  PayoutDestinationListResponse,
} from "./resources/payout/types.ts";

export type {
  PaymentTypeQueryParams,
  PaymentTypeRequest,
  PaymentTypResponse,
} from "./resources/paymenttype/types.ts";

export type {
  PaymentMethodQueryParams,
  PaymentMethodResponse,
  CreatePaymentMethodRequest,
  PaymentMethodType,
} from "./resources/paymentmethod/types.ts";

export type {
    PayinQueryParams,
    PayinResponse,
    PayinType,
    PayinBodyParams,
    UpdatePayinBodyParams,
} from "./resources/payin/types.ts";

export type {
  MerchantRequest,
  MerchantResponse,
  MerchantQueryParams,
  MerchantResponseList,
  UpdateMerchantRequest,
} from "./resources/merchant/types.ts";

export type {
  EntityResponse,
  EntityCreationRequest,
  EntityUpdateRequest,
} from "./resources/entity/types.ts";

export type {
  CustomerQueryParams,
  CustomerResponse,
  CustomerType,
  CustomerRequestBody,
} from "./resources/customer/types.ts";

export type {
  ApiKeyQueryParams,
  ApiKeyResponse,
  ApiKeyRequestBody,
  ApiKeyUpdateRequestBody,
  ApiKeyType,
} from "./resources/apikey/types.ts";
