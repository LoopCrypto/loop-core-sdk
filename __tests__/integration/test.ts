import LoopCrypto from "../../src/index";

const sdk = new LoopCrypto({
    apiKey: "9abee520-2140-4bb6-8b3c-316810920e5b",
    entityId: "098435ec-aaed-46a4-bc81-5ad1ecebfaaa",
});

sdk.webhooks
    .create({
        postUrl: "https://staging.api.loopcrypto.xyz/",
        networkIds: [1],
        events: ["payin.created"],
    })
    .then((response) => {
        console.log("Data create:", response);
        return response;
    })
    .catch((error) => {
        console.error("Error create:", error);
        return error;
    });
