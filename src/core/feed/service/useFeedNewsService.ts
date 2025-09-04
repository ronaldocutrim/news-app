import { useQuery } from '@tanstack/react-query';
import { AxiosHttpClient } from '@/contracts/http';
import { FeedNewsService } from '@core/feed';

export interface FeedFilters {
  country?: string;
  pageSize?: number;
}

export const useFeedNewsService = (filters: FeedFilters = {}) => {
  const { country = 'us', pageSize = 20 } = filters;
  const httpClient = new AxiosHttpClient();
  const newsService = new FeedNewsService(httpClient);

  return useQuery({
    queryKey: ['topHeadlines', country, pageSize],
    queryFn: () => newsService.getTopHeadlines(country, pageSize, 1),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};
