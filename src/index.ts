import * as dotenv from "dotenv";
// src/index.ts

dotenv.config();

import { WebHook } from "src/resources/webhook/index";
import { Token } from "src/resources/token/index";
import { PayoutDestinations } from "src/resources/payoutDestination/index";
import { PaymentType } from "src/resources/paymentType/index";
import { PaymentMethod } from "src/resources/paymentMethod/index";
import { Payin } from "src/resources/payin/index";
import { Merchant } from "src/resources/merchant/index";
import { Entity } from "src/resources/entity/index";
import { Customer } from "src/resources/customer/index";
import { ApiKey } from "src/resources/apiKey/index";
import { SDKOptions } from "src/resources/commonTypes";
import { CheckoutSession } from "src/resources/stripe/checkoutSession/index";
import { StripeInvoice } from "src/resources/stripe/invoice/index";

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
    checkoutSessions: CheckoutSession;
    stripeInvoice: StripeInvoice;

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
        this.checkoutSessions = new CheckoutSession(config);
        this.stripeInvoice = new StripeInvoice(config);
    }
}

export default LoopCrypto;

export type {
    WebhooksResponse,
    WebhookResponse,
    WebhookEvent,
    WebhookSortBy,
    WebhooksQueryParams,
    CreateWebhookRequest,
    UpdateWebhookRequest,
    WebHooksUpdateQueryParams,
    WebhookSecretResponse,
    ClassicWebhookEvent,
    WebhooksClassicQueryParams,
    CreateClassicWebhookRequest,
} from "src/resources/webhook/types.ts";

export type {
    TokenQueryParams,
    TokensResponse,
    TokenResponse,
    TokenExchangeRateResponse,
    TokenSortBy,
} from "src/resources/token/types.ts";

export type {
    PayoutDestinationResponse,
    CreatePayoutDestinationRequest,
    PayoutDestinationQueryParams,
    PayoutDestinationsResponse,
    FiatSettlementSettingsRequest,
    UpdatePayoutDestinationRequest,
    FiatSettlementAccountResponse,
} from "src/resources/payoutDestination/types";

export type {
    PaymentTypeQueryParams,
    CreatePaymentTypeRequest,
    PaymentTypesResponse,
    PaymentTypeResponse,
    DefaultPaymentTypeRequest,
    PaymentTypeSortByFields,
    PaymentTypeTokenRequest,
} from "src/resources/paymentType/types";

export type {
    PaymentMethodQueryParams,
    PaymentMethodsResponse,
    PaymentMethodResponse,
    CreatePaymentMethodRequest,
    UpdatePaymentMethodRequest,
    ExchangeRate,
    PaymentMethodPreAuthorization,
    Token,
    PaymentMethodSortByFields,
} from "src/resources/paymentMethod/types";

export type {
    PayinQueryParams,
    PayinsResponse,
    PayinResponse,
    CreatePayinRequest,
    UpdatePayinRequest,
    PayinPaymentMethodResponse,
    PreAuthorization,
    PayinTransactionResponse,
} from "src/resources/payin/types.ts";

export type {
    CreateMerchantRequest,
    MerchantResponse,
    MerchantQueryParams,
    MerchantsResponse,
    UpdateMerchantRequest,
} from "src/resources/merchant/types.ts";

export type {
    EntityResponse,
    CreateEntityRequest,
    UpdateEntityRequest,
    PaymentToken,
    PaymentTypeRequest,
    Contract,
    PayoutDestination,
    PaymentType,
} from "src/resources/entity/types.ts";

export type {
    CustomerQueryParams,
    MerchantCustomersResponse,
    MerchantCustomerResponse,
    CreateCustomerRequest,
    MerchantCustomerRef,
    CustomerResponse,
    CustomersResponse,
} from "src/resources/customer/types.ts";

export type {
    ApiKeyQueryParams,
    ApiKeysResponse,
    CreateApiKeyRequest,
    UpdateApiKeyRequest,
    ApiKeyType,
    ApiKeyResponse,
    Permissions,
} from "src/resources/apiKey/types";

export type {
    CheckoutSessionQueryParams,
    CreateCheckoutSessionRequest,
    UpdateCheckoutSessionRequest,
    CheckoutSessionResponse,
    CheckoutSessionsResponse,
} from "src/resources/stripe/checkoutSession/types";

export type {
    PayStripeAgreementInvoiceRequest,
    PayAgreementInvoiceResponse,
} from "src/resources/stripe/invoice/types";

export type {
    EmptyResponse,
    NetworkIds,
    SortDirection,
    SettlementType,
    SDKOptions,
} from "src/resources/commonTypes";
