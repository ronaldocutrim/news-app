import { NewsArticle } from '../../feed/model/NewsArticle';

export interface NewsDetailModel {
  article: NewsArticle;
  formattedDate: string;
}

export const createNewsDetailModel = (article: NewsArticle): NewsDetailModel => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  return {
    article,
    formattedDate: formatDate(article.publishedAt),
  };
};
