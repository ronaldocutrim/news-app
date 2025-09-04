import { NewsArticle } from '../../feed/model/NewsArticle';

export interface NewsDetailViewProps {
  article: NewsArticle;
  isLoading: boolean;
  formattedDate: string;
  onShare: () => void;
  onOpenOriginal: () => void;
}

export interface NewsDetailState {
  article: NewsArticle;
  isLoading: boolean;
  error?: string;
}

export interface NewsDetailScreenProps {
  route: {
    params: {
      article: NewsArticle;
    };
  };
}
