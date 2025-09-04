import { HttpClient } from '../../shared/http';
import { NewsArticle } from '../../feed/model/NewsArticle';

export interface SearchFilters {
  q?: string;
  sources?: string;
  domains?: string;
  from?: string;
  to?: string;
  language?: string;
  sortBy?: 'relevancy' | 'popularity' | 'publishedAt';
  pageSize: number;
  page: number;
}

export interface NewsResponse {
  status: string;
  totalResults: number;
  articles: NewsArticle[];
}

export class SearchService {
  constructor(private httpClient: HttpClient) {}

  async searchNews(filters: SearchFilters): Promise<NewsResponse> {
    const params: Record<string, string | number> = {};
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined) {
        params[key] = typeof value === 'number' ? value : value.toString();
      }
    });

    return await this.httpClient.get<NewsResponse>('/everything', params);
  }
}
