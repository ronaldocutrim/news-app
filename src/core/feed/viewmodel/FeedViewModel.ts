import { useFeedNewsService, FeedFilters } from '../service';

export const useTopNewsViewModel = (filters: FeedFilters = {}) => {
  return useFeedNewsService(filters);
};

export const useNewsListViewModel = () => {
  const { data, isLoading, error, refetch, isRefetching } = useTopNewsViewModel();

  const articles = data?.articles || [];

  return {
    articles,
    isLoading,
    error,
    isRefetching,
    onRefresh: refetch,
  };
};
