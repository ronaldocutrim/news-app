import React from 'react';
import { useSearchNewsCard } from '@/hooks/useSearchNewsCard';
import { NewsCard } from '@/components';
import { NewsArticle } from '@core/feed/model/NewsArticle';

type SearchNewsCardItemProps = { article: NewsArticle };

export function SearchNewsCardItem({ article }: SearchNewsCardItemProps) {
  const newsCardProps = useSearchNewsCard(article);
  return <NewsCard {...newsCardProps} />;
}
