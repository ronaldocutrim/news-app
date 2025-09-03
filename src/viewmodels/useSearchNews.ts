import { useQuery } from '@tanstack/react-query';
import { SearchFilters } from '../types';
import { NewsApiService } from '../services/newsApi';

export const useSearchNews = (filters: SearchFilters, enabled: boolean = false) => {
  return useQuery({
    queryKey: ['searchNews', filters],
    queryFn: () => NewsApiService.searchNews(filters),
    enabled: enabled && !!filters.q,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};