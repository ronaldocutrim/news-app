import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { HttpClient } from './HttpClient';
import { SentryLogger } from './SentryLogger';

export class AxiosHttpClient implements HttpClient {
  private client: AxiosInstance;

  constructor(config: AxiosRequestConfig = {}) {
    this.client = axios.create(config);
  }

  async get<T>(url: string, params?: Record<string, string | number>): Promise<T> {
    try {
      const response = await this.client.get<T>(url, { params });
      return response.data;
    } catch (error) {
      SentryLogger.logError(error as Error, {
        service: 'HttpClient',
        method: 'GET',
        url,
        params,
      });
      throw error;
    }
  }
}