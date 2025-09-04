import axios from 'axios';
import { NewsResponse } from './NewsArticle';
import { API_CONFIG } from '../../../utils/config';

const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  params: {
    apiKey: API_CONFIG.NEWS_API_KEY,
  },
});

export class NewsService {
  static async getTopHeadlines(
    country: string = 'us',
    pageSize: number = 20,
    page: number = 1
  ): Promise<NewsResponse> {
    try {
      const response = await api.get('/top-headlines', {
        params: {
          country,
          pageSize,
          page,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching top headlines:', error);
      throw error;
    }
  }

  static async getNewsByCategory(category: string, pageSize: number = 20): Promise<NewsResponse> {
    try {
      const response = await api.get('/top-headlines', {
        params: {
          category,
          country: 'us',
          pageSize,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching news by category:', error);
      throw error;
    }
  }
}
