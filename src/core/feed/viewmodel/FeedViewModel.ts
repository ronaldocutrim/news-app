import { useFeedNewsService } from '../service';

export const useNewsListViewModel = () => {
  const { data, isLoading, error, refetch, isRefetching } = useFeedNewsService();

  const articles = data?.articles || [];

  return {
    articles,
    isLoading,
    error,
    isRefetching,
    onRefresh: refetch,
  };
};
