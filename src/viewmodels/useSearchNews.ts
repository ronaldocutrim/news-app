import { useQuery } from '@tanstack/react-query';
import { SearchFilters } from '../types';
import { NewsApiService } from '../services/newsApi';

export const useSearchNews = (filters: SearchFilters, enabled: boolean = false) => {
  return useQuery({
    queryKey: ['searchNews', filters.q, filters.sortBy, filters.pageSize],
    queryFn: () => NewsApiService.searchNews(filters),
    enabled: enabled && !!filters.q,
    staleTime: 3 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};
