import { HttpClient } from '../../shared/http';
import { NewsResponse } from './NewsArticle';

export class NewsService {
  constructor(private httpClient: HttpClient) {}

  async getTopHeadlines(
    country: string = 'us',
    pageSize: number = 20,
    page: number = 1
  ): Promise<NewsResponse> {
    return await this.httpClient.get<NewsResponse>('/top-headlines', {
      country,
      pageSize,
      page,
    });
  }

  async getNewsByCategory(category: string, pageSize: number = 20): Promise<NewsResponse> {
    return await this.httpClient.get<NewsResponse>('/top-headlines', {
      category,
      country: 'us',
      pageSize,
    });
  }
}
