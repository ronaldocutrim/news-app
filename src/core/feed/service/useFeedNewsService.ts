import { useQuery } from '@tanstack/react-query';
import { NewsService } from '../model/NewsService';

export interface FeedFilters {
  country?: string;
  pageSize?: number;
}

export const useFeedNewsService = (filters: FeedFilters = {}) => {
  const { country = 'us', pageSize = 20 } = filters;

  return useQuery({
    queryKey: ['topHeadlines', country, pageSize],
    queryFn: () => NewsService.getTopHeadlines(country, pageSize, 1),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};
