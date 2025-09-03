import { useInfiniteQuery } from '@tanstack/react-query';
import { NewsApiService } from '../services/newsApi';

export const useInfiniteTopNews = (country: string = 'us', pageSize: number = 10) => {
  return useInfiniteQuery({
    queryKey: ['infiniteTopNews', country, pageSize],
    queryFn: ({ pageParam = 1 }) => NewsApiService.getTopHeadlines(country, pageSize, pageParam),
    getNextPageParam: (lastPage, allPages) => {
      const totalLoaded = allPages.reduce((acc, page) => acc + page.articles.length, 0);
      if (totalLoaded < lastPage.totalResults) {
        return allPages.length + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};
