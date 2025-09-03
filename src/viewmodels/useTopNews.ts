import { useQuery } from '@tanstack/react-query';
import { NewsApiService } from '../services/newsApi';

export const useTopNews = (country: string = 'us', pageSize: number = 20) => {
  return useQuery({
    queryKey: ['topNews', country, pageSize],
    queryFn: () => NewsApiService.getTopHeadlines(country, pageSize),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};