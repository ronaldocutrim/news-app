import * as Sentry from '@sentry/react-native';
import { AxiosError } from 'axios';

export interface ErrorContext {
  service: string;
  method?: string;
  url?: string;
  params?: any;
  data?: any;
}

export class SentryLogger {
  static logError(error: Error | AxiosError, context: ErrorContext): void {
    // Add breadcrumb for debugging flow
    Sentry.addBreadcrumb({
      message: `${context.service}: ${context.method || 'Unknown'} ${context.url || 'Unknown'}`,
      level: 'error',
      data: {
        params: context.params,
        data: context.data,
      },
      category: 'api_call',
    });

    // Capture exception with context
    if (this.isAxiosError(error)) {
      Sentry.captureException(error, {
        tags: {
          service: context.service,
          method: context.method || 'Unknown',
          url: context.url || 'Unknown',
          status: error.response?.status,
          statusText: error.response?.statusText,
        },
        extra: {
          requestParams: context.params,
          requestData: context.data,
          responseData: error.response?.data,
          stack: error.stack,
        },
        level: 'error',
      });
    } else {
      Sentry.captureException(error, {
        tags: {
          service: context.service,
          method: context.method || 'Unknown',
          url: context.url || 'Unknown',
        },
        extra: {
          requestParams: context.params,
          requestData: context.data,
          stack: error.stack,
        },
        level: 'error',
      });
    }
  }

  private static isAxiosError(error: any): error is AxiosError {
    return error.isAxiosError === true;
  }
}
