import { NewsArticle } from '@/core/feed/model/NewsArticle';

export interface NewsCardProps {
  article: NewsArticle;
  menuVisible: boolean;
  handlePress: () => void;
  handleShare: () => Promise<void>;
  handleOpenOriginal: () => void;
  showMenu: () => void;
  hideMenu: () => void;
  formatDate: (dateString: string) => string;
}
