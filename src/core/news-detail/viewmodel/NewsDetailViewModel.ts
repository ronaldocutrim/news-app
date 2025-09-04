import { Share, Linking } from 'react-native';
import { useInfiniteQuery } from '@tanstack/react-query';
import { FeedNewsService } from '@core/feed';
import { AxiosHttpClient } from '@/contracts/http';
import { NewsArticle } from '../../feed/model/NewsArticle';

export const useNewsDetailViewModel = (article: NewsArticle) => {
  const httpClient = new AxiosHttpClient();
  const newsService = new FeedNewsService(httpClient);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, error } =
    useInfiniteQuery({
      queryKey: ['relatedNews', article.source.name],
      queryFn: ({ pageParam = 1 }) => newsService.getTopHeadlines('us', 10, pageParam),
      getNextPageParam: (lastPage, allPages) => {
        const totalLoaded = allPages.reduce((acc, page) => acc + page.articles.length, 0);
        return totalLoaded < lastPage.totalResults ? allPages.length + 1 : undefined;
      },
      initialPageParam: 1,
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${article.title}\n\n${article.url}`,
        title: article.title,
        url: article.url,
      });
    } catch (error) {
      console.error('Error sharing article:', error);
    }
  };

  const handleOpenOriginal = () => {
    if (article.url) {
      Linking.openURL(article.url);
    }
  };

  const loadMoreRelated = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const allArticles = data?.pages.flatMap(page => page.articles) || [];
  const filteredArticles = allArticles.filter(
    item => item.url !== article.url && item.title !== article.title
  );

  const getReadingTime = () => {
    const content = article.content || article.description || '';
    const wordsPerMinute = 200;
    const wordCount = content.split(' ').length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return readingTime > 0 ? `${readingTime} min de leitura` : '1 min de leitura';
  };

  const getArticleMetadata = () => {
    return {
      publishedAt: formatDate(article.publishedAt),
      source: article.source.name,
      author: article.author || 'Autor não informado',
      readingTime: getReadingTime(),
    };
  };

  const hasFullContent = () => {
    return article.content && article.content.length > 100;
  };

  return {
    article,
    filteredArticles,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    error,
    handleShare,
    handleOpenOriginal,
    loadMoreRelated,
    formatDate,
    getArticleMetadata,
    getReadingTime,
    hasFullContent,
  };
};
