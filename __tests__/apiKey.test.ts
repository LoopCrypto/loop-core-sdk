import { ApiKey } from "../src/resources/apikey";
import {
  ApiKeyQueryParams,
  ApiKeyRequestBody,
  ApiKeyResponse,
  ApiKeyType,
  ApiKeyUpdateRequestBody,
} from "../src/resources/apikey/types";

jest.mock("../src/resources/base");

describe("ApiKey", () => {
  let apiKeyInstance: ApiKey;
  let mockRequest: jest.Mock;

  beforeEach(() => {
    apiKeyInstance = new ApiKey({ apiKey: "apiKey", entityId: "entityId" });
    mockRequest = jest.fn() as jest.Mock; // Explicitly typed as jest.Mock
    (apiKeyInstance as unknown as { request: jest.Mock }).request = mockRequest;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should fetch API keys with query params", async () => {
    const mockResponse: ApiKeyResponse = {
      totalResults: 2,
      apiKeys: [
        {
          dateCreated: 1708454400,
          name: "Admin Key",
          id: "apikey-123456",
          permissions: ["read", "write", "delete"],
          apiKey: "sk_test_abcdef123456",
        },
        {
          dateCreated: 1708458500,
          name: "Read-Only Key",
          id: "apikey-654321",
          permissions: ["read"],
          apiKey: "sk_test_ghijkl789012",
        },
      ],
    };

    mockRequest.mockResolvedValue(mockResponse);
    const queryParams: ApiKeyQueryParams = {
      apiKeyId: "apikey-123456",
      apiKeyName: "Admin Key",
      page: 1,
      limit: 10,
      sortBy: "dateCreated",
      sortDir: "desc",
    };
    const response = await apiKeyInstance.search(queryParams);

    expect(mockRequest).toHaveBeenCalledWith(
      "api-keys?apiKeyId=apikey-123456&apiKeyName=Admin+Key&page=1&limit=10&sortBy=dateCreated&sortDir=desc",
      {
        method: "GET",
      }
    );
    expect(response).toEqual(mockResponse);
  });

  test("should create an API key", async () => {
    const payload: ApiKeyRequestBody = {
      name: "Admin API Key",
      grantPermissions: [
        "CreateEntities",
        "UpdateEntities",
        "CreateApiKeys",
        "GetApiKeys",
        "CreateCustomers",
        "GetCustomers",
        "CreateWebhooks",
        "GetWebhooks",
      ],
    };
    const mockResponse: ApiKeyType = {
      dateCreated: 1708454400,
      name: "Admin Key",
      id: "apikey-123456",
      permissions: ["read", "write", "delete"],
      apiKey: "sk_test_abcdef123456",
    };

    mockRequest.mockResolvedValue(mockResponse);

    const response = await apiKeyInstance.create(payload);

    expect(mockRequest).toHaveBeenCalledWith("api-key", {
      data: payload,
      method: "POST",
    });
    expect(response).toEqual(mockResponse);
  });

  test("should delete an API key", async () => {
    const mockResponse: ApiKeyResponse = {
      totalResults: 2,
      apiKeys: [
        {
          dateCreated: 1708454400,
          name: "Admin Key",
          id: "apikey-123456",
          permissions: ["read", "write", "delete"],
          apiKey: "sk_test_abcdef123456",
        },
        {
          dateCreated: 1708458500,
          name: "Read-Only Key",
          id: "apikey-654321",
          permissions: ["read"],
          apiKey: "sk_test_ghijkl789012",
        },
      ],
    };
    mockRequest.mockResolvedValue(mockResponse);

    const apiKeyId = "123";
    const response = await apiKeyInstance.delete(apiKeyId);

    expect(mockRequest).toHaveBeenCalledWith(`api-key/${apiKeyId}`, {
      method: "DELETE",
    });
    expect(response).toEqual(mockResponse);
  });

  test("should update an API key", async () => {
    const apiKeyId = "123";
    const payload: ApiKeyUpdateRequestBody = { name: "Updated Key" };
    const mockResponse: ApiKeyType = {
      dateCreated: 1708454400,
      name: "Admin Key",
      id: "apikey-123456",
      permissions: ["read", "write", "delete"],
      apiKey: "sk_test_abcdef123456",
    };

    mockRequest.mockResolvedValue(mockResponse);

    const response = await apiKeyInstance.update(apiKeyId, payload);

    expect(mockRequest).toHaveBeenCalledWith(`api-key/${apiKeyId}`, {
      data: payload,
      method: "PATCH",
    });
    expect(response).toEqual(mockResponse);
  });
});
