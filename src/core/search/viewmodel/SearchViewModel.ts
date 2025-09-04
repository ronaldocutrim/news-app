import { useState, useCallback, useMemo } from 'react';
import { useDebounce } from '@uidotdev/usehooks';
import { useSearchNewsService } from '../service';

export const useSearchScreenViewModel = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSort, setSelectedSort] = useState<'publishedAt' | 'relevancy' | 'popularity'>(
    'publishedAt'
  );

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const sortOptions = [
    { key: 'publishedAt', label: 'Mais Recentes' },
    { key: 'relevancy', label: 'Relevância' },
    { key: 'popularity', label: 'Popularidade' },
  ] as const;

  const filters = {
    q: debouncedSearchQuery || 'news',
    sortBy: selectedSort,
    pageSize: 20,
  };

  const {
    data: infiniteData,
    isLoading,
    error,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useSearchNewsService(filters, true);

  // Flatten all pages into a single array of articles
  const data = useMemo(() => {
    if (!infiniteData?.pages?.length) return null;

    const allArticles = infiniteData.pages.flatMap(page => page.articles);
    const firstPage = infiniteData.pages[0];

    return {
      articles: allArticles,
      totalResults: firstPage.totalResults,
      status: firstPage.status,
    };
  }, [infiniteData]);

  const handleSortChange = useCallback((sortBy: 'publishedAt' | 'relevancy' | 'popularity') => {
    setSelectedSort(sortBy);
  }, []);

  const loadMore = useCallback(async () => {
    if (hasNextPage && !isFetchingNextPage) {
      await fetchNextPage();
    }
  }, [
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    data?.articles?.length,
    data?.totalResults,
    infiniteData?.pages?.length,
  ]);

  const getHeaderText = () => {
    if (!data?.articles?.length) return '';

    return debouncedSearchQuery
      ? `${data.totalResults} resultados encontrados para "${debouncedSearchQuery}"`
      : `${data.totalResults} notícias encontradas`;
  };

  const getEmptyText = () => {
    return debouncedSearchQuery
      ? `Nenhuma notícia encontrada para "${debouncedSearchQuery}".\nTente usar outros termos de busca.`
      : 'Nenhuma notícia disponível no momento.';
  };

  return {
    searchQuery,
    selectedSort,
    debouncedSearchQuery,
    sortOptions,
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    error,
    setSearchQuery,
    handleSortChange,
    refetch,
    loadMore,
    getHeaderText,
    getEmptyText,
  };
};
