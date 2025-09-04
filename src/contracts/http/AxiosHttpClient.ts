import axios, { AxiosInstance } from 'axios';
import { HttpClient } from './HttpClient';
import { SentryLogger } from './SentryLogger';
import { API_CONFIG } from '@utils/config';

export class AxiosHttpClient implements HttpClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_CONFIG.BASE_URL,
      params: {
        apiKey: API_CONFIG.NEWS_API_KEY,
      },
      timeout: 10000,
    });
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
