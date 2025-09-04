import { useInfiniteQuery } from '@tanstack/react-query';
import { SearchFilters, SearchService } from '@core/search';
import { AxiosHttpClient } from '@/contracts/http';

export const useSearchNewsService = (
  filters: Omit<SearchFilters, 'page'>,
  enabled: boolean = false
) => {
  const httpClient = new AxiosHttpClient();
  const searchService = new SearchService(httpClient);

  return useInfiniteQuery({
    queryKey: ['searchNewsInfinite', filters.q, filters.sortBy, filters.pageSize],
    queryFn: ({ pageParam = 1 }) => searchService.searchNews({ ...filters, page: pageParam }),
    enabled: enabled && !!filters.q,
    getNextPageParam: (lastPage, allPages) => {
      const pageSize = filters.pageSize;
      const totalResults = lastPage.totalResults;
      const currentPage = allPages.length;
      const nextPage = currentPage + 1;
      const totalPages = Math.ceil(totalResults / pageSize);
      const articlesLoaded = allPages.reduce((total, page) => total + page.articles.length, 0);
      const hasMoreArticles = articlesLoaded < totalResults;
      const hasMorePages = nextPage <= totalPages;
      const lastPageHasResults = lastPage.articles.length > 0;
      return hasMoreArticles && hasMorePages && lastPageHasResults ? nextPage : undefined;
    },
    staleTime: 3 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    initialPageParam: 1,
  });
};
