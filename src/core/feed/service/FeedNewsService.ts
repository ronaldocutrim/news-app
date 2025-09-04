import { HttpClient } from '../../../contracts/http';
import { NewsArticle } from '../model/NewsArticle';

export interface NewsResponse {
  status: string;
  totalResults: number;
  articles: NewsArticle[];
}

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
}
