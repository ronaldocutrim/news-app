import { useQuery } from '@tanstack/react-query';
import { NewsService } from '../model/NewsService';

export const useTopNewsViewModel = (country: string = 'us', pageSize: number = 20) => {
  return useQuery({
    queryKey: ['topNews', country, pageSize],
    queryFn: () => NewsService.getTopHeadlines(country, pageSize),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
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
