// src/resources/base.ts
import axios, { AxiosRequestConfig } from "axios";
import { SDKOptions } from "./webhook/types";

export abstract class Base {
  private apiKey: string;
  private entityId: string;
  private baseUrl: string = process.env.BASE_URL || "";

  constructor(config: SDKOptions) {
    this.apiKey = config.apiKey;
    this.entityId = config.entityId;
  }

  protected async request<T>(
    endpoint: string,
    options?: AxiosRequestConfig
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const config: AxiosRequestConfig = {
      ...options,
      headers: {
        "Content-Type": "application/json",
        "api-key": this.apiKey,
        "entity-id": this.entityId,
        ...options?.headers, // Merge custom headers if provided
      },
    };

    console.log(url, config, 'configconfigconfig');
    

    try {
      const response = await axios(url, config);
      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        throw (
          error?.response?.data?.message ||
          error.response?.data ||
          error?.message ||
          error
        );
      } else {
        throw error;
      }
    }
  }
}
