import { NewsArticle } from './NewsArticle';

export interface FeedState {
  articles: NewsArticle[];
  isLoading: boolean;
  error?: string;
}
