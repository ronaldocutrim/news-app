import axios from 'axios';
import { NewsResponse } from '../../feed/model/NewsArticle';
import { API_CONFIG } from '../../../utils/config';

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

const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  params: {
    apiKey: API_CONFIG.NEWS_API_KEY,
  },
});

export class SearchService {
  static async searchNews(filters: SearchFilters): Promise<NewsResponse> {
    try {
      const response = await api.get('/everything', {
        params: {
          ...filters,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error searching news:', error);
      throw error;
    }
  }
}
