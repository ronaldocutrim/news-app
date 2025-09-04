import { useQuery } from '@tanstack/react-query';
import { NewsService } from '@core/feed';
import { AxiosHttpClient } from '@core/shared';

export interface FeedFilters {
  country?: string;
  pageSize?: number;
}

export const useFeedNewsService = (filters: FeedFilters = {}) => {
  const { country = 'us', pageSize = 20 } = filters;
  const httpClient = new AxiosHttpClient();
  const newsService = new NewsService(httpClient);

  return useQuery({
    queryKey: ['topHeadlines', country, pageSize],
    queryFn: () => newsService.getTopHeadlines(country, pageSize, 1),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};
