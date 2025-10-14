# LoopCrypto SDK

This Typescript SDK provides easy integration with various payment and payout functionalities, including webhooks, token management, merchants, entities, and customers. 

## Installation

Install the SDK via npm or yarn:

```sh
npm install @loop-crypto/loop-core-sdk
```

or

```sh
yarn add @loop-crypto/loop-core-sdk
```

## Usage

Import and initialize the SDK:

```typescript
import LoopCrypto from "@loop-crypto/loopcrypto-core-sdk";

const sdk = new LoopCrypto({
    apiKey: "your-api-key",
    entityId: "entity-id",
});
```

## Features

LoopCrypto provides the following functionalities:

### Webhooks

Manage webhooks for event notifications.

```typescript
// Search webhooks
const webhooks = await sdk.webhooks.search({ event: "payin.created" });

// Create a webhook
const newWebhook = await sdk.webhooks.create({
    postUrl: "https://your-url.com/webhook",
    networkIds: [1, 137],
    events: ["payin.created", "payment.processed"],
});

// Update a webhook
const updatedWebhook = await sdk.webhooks.update({
    postUrl: "https://your-updated-url.com/webhook",
});

// Delete a webhook
await sdk.webhooks.delete("webhook-id");

// Generate a new webhook secret
const secret = await sdk.webhooks.generateSecret();

// Retrieve the current webhook secret
const currentSecret = await sdk.webhooks.getSecret();
```

### Tokens

Handle token-based authentication.

```typescript
const tokens = await sdk.tokens.search({
    networkId: "1",
    tokenSymbol: "ETH",
    page: 1,
    limit: 10,
    sortBy: "symbol",
    sortDir: "asc",
});
```

### Payout Destinations

Manage payout destinations securely.

```typescript
// Create a Payout Destination
const payoutDestination = await sdk.payouts.create({
    isDefault: true,
    merchantId: "merchant-123",
    networkId: 1,
    walletAddress: "0x1234567890abcdef",
});

// Retrieve a Payout Destination
const payoutDestination = await sdk.payouts.retrieve("payout-destination-id");

// Delete a Payout Destination
await sdk.payouts.delete("payout-destination-id");

// Search for Payout Destinations
const payoutDestinations = await sdk.payouts.search({
    merchantId: "merchant-123",
    networkId: "1",
    page: 1,
    limit: 10,
    sortBy: "dateCreated",
    sortDir: "desc",
});
```

### Payment Types

Manage different payment types.

```typescript
// List/Search Payment Types
const paymentTypes = await sdk.paymentTypes.search({
    merchantId: "merchant-123",
    networkId: 1,
    page: 1,
    limit: 10,
    sortBy: "dateCreated",
    sortDir: "desc",
});

// Create a Payment Type
const newPaymentType = await sdk.paymentTypes.create({
    merchantId: "merchant-123",
    networkId: 1,
    tokenAddress: "0x1234567890abcdef",
});

// Delete a Payment Type
await sdk.paymentTypes.delete("merchant-123", "token-xyz");
```

### Payment Methods

Manage payment methods for transactions.

```typescript
// List/Search Payment Methods
const paymentMethods = await sdk.paymentMethods.search({
    merchantId: "merchant-123",
    networkId: 1,
    page: 1,
    limit: 10,
    sortBy: "dateCreated",
    sortDir: "desc",
});

// Create a Payment Method
const newPaymentMethod = await sdk.paymentMethods.create({
    name: "My Crypto Wallet",
    customerId: "customer-456",
    networkId: 1,
    walletAddress: "0x1234567890abcdef",
    tokenAddress: "0xabcdef1234567890",
    authorizationSignature: "base64_encoded_jwt_token",
    isDefault: true,
});

// Retrieve a Payment Method
const paymentMethod = await sdk.paymentMethods.retrieve("paymentMethod-789");

// Delete a Payment Method
await sdk.paymentMethods.delete("paymentMethod-789");
```

### Payins

Handle incoming payments.

```typescript
// List/Search Payins
const payins = await sdk.payins.search({
    merchantId: "merchant-123",
    customerId: "customer-456",
    fromWallet: "0x1234567890abcdef",
    page: 1,
    limit: 10,
    sortBy: "dateCreated",
    sortDir: "desc",
});

// Create a Payin
const newPayin = await sdk.payins.create({
    merchantId: "merchant-123",
    amount: "5000", // Amount in cents for fiat or token value
    amountType: "fiat",
    billDate: 1712345678, // Unix timestamp
    paymentMethodId: "paymentMethod-789",
    description: "Monthly subscription payment",
});

// Retrieve a Payin
const payin = await sdk.payins.retrieve("payin-12345");
```

### Payouts

Process payouts securely.

```typescript
// List/Search Payouts
const payouts = await sdk.payouts.search({
    merchantId: "merchant-123",
    networkId: 1,
    walletAddress: "0x1234567890abcdef",
    isDefault: true,
    page: 1,
    limit: 10,
    sortBy: "dateCreated",
    sortDir: "desc",
});

// Create a Payout Destination
const newPayout = await sdk.payouts.create({
    merchantId: "merchant-123",
    networkId: 1,
    walletAddress: "0xabcdef1234567890",
    isDefault: true,
});

// Retrieve a Payout Destination
const payout = await sdk.payouts.retrieve("payoutDestination-789");

// Delete a Payout Destination
await sdk.payouts.delete("payoutDestination-789");
```

### Merchants

Manage merchant accounts.

```typescript
// List/Search Merchants
const merchants = await sdk.merchants.search({
    merchantName: "My Business",
    merchantRefId: "ref-123",
    page: 1,
    limit: 10,
    sortBy: "dateCreated",
    sortDir: "desc",
});

// Create a Merchant
const newMerchant = await sdk.merchants.create({
    merchantName: "My Business",
    merchantRefId: "ref-123",
    paymentTypes: [
        {
            networkId: 1,
            payoutDestinations: ["0xabcdef1234567890"],
            tokens: [
                {
                    tokenAddress: "0x1234567890abcdef",
                    tokenSymbol: "ETH",
                },
            ],
        },
    ],
});

// Retrieve a Merchant
const merchant = await sdk.merchants.retrieve("merchant-456");

// Update a Merchant
const updatedMerchant = await sdk.merchants.update("merchant-456", {
    merchantName: "Updated Business Name",
    merchantRefId: "new-ref-789",
});
```

### Entities

Create and manage business entities.

```typescript
// Retrieve Entity Details
const entity = await sdk.entities.retrieve();

// Create an Entity
const newEntity = await sdk.entities.create({
    code: "auth-code-123",
    entityName: "My Organization",
    email: "contact@myorg.com",
    logoUrl: "https://myorg.com/logo.png",
    paymentTypes: [
        {
            networkId: 1,
            payoutDestinations: ["0xabcdef1234567890"],
            tokens: [
                {
                    tokenAddress: "0x1234567890abcdef",
                    tokenSymbol: "ETH",
                },
            ],
        },
    ],
});

// Update an Entity
const updatedEntity = await sdk.entities.update({
    entityName: "Updated Organization Name",
    email: "newemail@myorg.com",
    logoUrl: "https://myorg.com/new-logo.png",
});
```

### Customers

Manage customer details.

```typescript
// Search for Customers with Query Parameters
const customers = await sdk.customers.search({
    merchantId: "merchant-123",
    sortBy: "dateCreated",
    sortDir: "desc",
    page: 1,
    limit: 10,
});

// Retrieve Customer Details
const customer = await sdk.customers.retrieve("customer-456");

// Create a Customer
const newCustomer = await sdk.customers.create({
    merchantId: "merchant-123",
    customerRefId: "ref-789",
    subscriptionRefId: "sub-001",
    paymentMethod: {
        networkId: 1,
        walletAddress: "0xabcdef1234567890",
        name: "My Wallet",
        tokenAddress: "0x1234567890abcdef",
        tokenSymbol: "ETH",
        authorizationSignature: "signed-data-here",
    },
});
```

### API Keys

Handle API keys for authentication.

```typescript
// Search for API Keys with Query Parameters
const apiKeys = await sdk.apiKeys.search({
    sortBy: "dateCreated",
    sortDir: "desc",
    page: 1,
    limit: 10,
});

// Create an API Key
const newApiKey = await sdk.apiKeys.create({
    name: "My API Key",
    grantPermissions: ["CreateEntities", "GetApiKeys", "CreateCustomers"],
});

// Update an API Key
const updatedApiKey = await sdk.apiKeys.update("api-key-123", {
    name: "Updated API Key",
    grantPermissions: ["UpdateEntities"],
    revokePermissions: ["CreateEntities"],
});

// Delete an API Key
await sdk.apiKeys.delete("api-key-456");
```

## Configuration

The SDK requires an API key for authentication and base url to target environment. You can set it via environment variables:

```sh
API_KEY="your-api-key"
BASE_URL="https://loopcrypto.com/"
```

## License

This SDK is licensed under the MIT License.

